const { ERROR_STATUS } = require('../errorsConstantsName');

module.exports = class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_STATUS.CONFLICT;
  }
};
