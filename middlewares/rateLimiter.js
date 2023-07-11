const rateLimit = require('express-rate-limit');
// За 15 минут можно совершить не более 100 запросов с одного IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: 'Лимит запросов превышен, попробуйте повторить позднее',
  },
});

module.exports = {
  limiter,
};
