const { ERROR_STATUS } = require('../errorsConstantsName');

module.exports = class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_STATUS.NOT_FOUND;
  }
};
