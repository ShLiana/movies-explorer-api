const router = require('express').Router();
const {
  getMovies,
  addNewMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  createMovieValidation, movieIdValidation,
} = require('../middlewares/dataValidation');

router.get('/', getMovies); // вернуть все фильмы
router.post('/', addNewMovie, addNewMovie); // создать фильм
router.delete('/:_id', movieIdValidation, deleteMovie); // удалить фильм по идентификатору

module.exports = router;
