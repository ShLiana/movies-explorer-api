const router = require('express').Router();
const {
  getMovies,
  addNewMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  addMovieValidation, movieIdValidation,
} = require('../middlewares/dataValidation');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/', getMovies);
// создаёт фильм с переданными в теле country, director и т.д.
router.post('/', addMovieValidation, addNewMovie);
// удаляет сохранённый фильм по id
router.delete('/:_id', movieIdValidation, deleteMovie);

module.exports = router;
