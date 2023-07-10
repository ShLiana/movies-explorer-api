const Movie = require('../models/movie');
const { ERROR_STATUS } = require('../utils/errorsConstantsName');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFound = require('../utils/errors/NotFound');
const ForbiddenError = require('../utils/errors/ForbiddenError');

// Получить все фильмы
const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(ERROR_STATUS.OK).send({ data: movies }))
    .catch(next);
};

// Добавить новую карточку
const addNewMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner, })
    .then((movie) => {
      res.status(ERROR_STATUS.CREATED).send({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError(
            'Введены некорректные данные при создании фильма',
          ),
        );
      }
      return next(err);
    });
};

// Удалить карточку
const deleteMovie = (req, res, next) => {
  // Метод поиска по id и удаления фильма
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Фильм с этим _id не найден');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалять чужие фильмы');
      }
      return movie
      .deleteOne()
      .then(() => res.send({ message: 'Фильм удалён' }))
      .catch(next);
  })
  .catch((err) => {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return next(new BadRequestError('Введены некорректные данные'));
    }
    return next(err);
  });
};

module.exports = {
  getMovies,
  addNewMovie,
  deleteMovie,
};
