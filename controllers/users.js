const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ERROR_STATUS } = require('../utils/errorsConstantsName');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFound = require('../utils/errors/NotFound');
const ConflictError = require('../utils/errors/ConflictError');

const { NODE_ENV, JWT_SECRET = 'JWT_SECRET' } = process.env;

// Получить текущего пользователя
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.status(ERROR_STATUS.OK).send({ email: user.email, name: user.name });
      } else {
        throw new NotFound('Пользователь с данным _id не найден');
      }
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new BadRequestError('Введены некорректные данные поиска'));
      }
      return next(err);
    });
};

// Добавить нового пользователя
const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(ERROR_STATUS.CREATED).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Введены некорректные данные'));
      }
      if (err.code === 11000) {
        return next(
          new ConflictError('Пользователь с данным email уже существует'),
        );
      }
      return next(err);
    });
};

// Обновить инфрмацию о пользователе
const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      res.status(ERROR_STATUS.OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError('Введены некорректные данные при обновлении данных профиля'),
        );
      }
      if (err.code === 11000) {
        return next(
          new ConflictError('Пользователь с такой почтой уже существует'),
        );
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
        expiresIn: '7d',
      });
      // вернём токен
      res.status(ERROR_STATUS.OK).send({ token });
    })
    .catch(next);
};

module.exports = {
  getCurrentUser,
  createUser,
  updateUserInfo,
  login,
};
