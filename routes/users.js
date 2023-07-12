const router = require('express').Router();
const {
  updateUserInfo,
  getCurrentUser,
} = require('../controllers/users');

const {
  userInfoValidation,
} = require('../middlewares/dataValidation');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getCurrentUser);
// обновляет информацию о пользователе (email и имя)
router.patch('/me', userInfoValidation, updateUserInfo);

module.exports = router;
