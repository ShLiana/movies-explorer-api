const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { signinValidate, signupValidate } = require('../middlewares/dataValidation');
const NotFound = require('../utils/errors/NotFound');

router.post('/signin', signinValidate, login);
router.post('/signup', signupValidate, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => next(new NotFound('Запрашиваемая страница не найдена')));

module.exports = router;
