const CustomApi = require("./custom-api");
const { StatusCodes } = require("http-status-codes");

class UnauthenticatedError extends CustomApi {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
