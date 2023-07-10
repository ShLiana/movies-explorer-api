const router = require('express').Router();
const {
  updateUserInfo,
  getCurrentUser,
} = require('../controllers/users');

const {
  userInfoValidation,
} = require('../middlewares/dataValidation');

router.get('/me', getCurrentUser); // вернуть данные текущего пользователя
router.patch('/me', userInfoValidation, updateUserInfo); // обновить данные профиля

module.exports = router;
