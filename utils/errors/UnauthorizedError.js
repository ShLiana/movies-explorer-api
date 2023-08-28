const { ERROR_STATUS } = require('../errorsConstantsName');

module.exports = class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_STATUS.UNAUTHORIZED;
  }
};
