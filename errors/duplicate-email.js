const CustomApi = require("./custom-api");
const { StatusCodes } = require("http-status-codes");

class DuplicateEmailError extends CustomApi {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = DuplicateEmailError;
