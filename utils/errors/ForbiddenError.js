const { ERROR_STATUS } = require('../errorsConstantsName');

module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_STATUS.FORBIDDEN;
  }
};
