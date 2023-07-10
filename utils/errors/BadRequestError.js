const { ERROR_STATUS } = require('../errorsConstantsName');

module.exports = class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_STATUS.BAD_REQUEST;
  }
};
