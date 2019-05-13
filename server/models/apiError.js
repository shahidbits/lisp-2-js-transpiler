const API_ERROR_TYPE = {
  INVALID: 'INVALID',
  SERVER: 'SERVER',
  NOT_FOUND: 'NOT_FOUND'
};

const ERROR_MESSAGE = {
  INVALID: "Invalid Input",
  SERVER: "Server Error",
  NOT_FOUND: "Not Found"
};

class ApiError {
  constructor(type, message) {
    this.type = type;
    this.message = message;
  }
}

module.exports = {ApiError, API_ERROR_TYPE, ERROR_MESSAGE};
