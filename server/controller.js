const {API_ERROR_TYPE} = require('./models/apiError');

class Controller {

  constructor(transpiler) {
    this.transpiler = transpiler;
  }

  isValidLisp({data}, cb) {
    this.transpiler.validate({data}, (err, result) => {
      cb(err, result);
    });
  }

  convertLisp2JS({data}, cb) {
    this.transpiler.convert({data}, (err, result) => {
      cb(err, result);
    });
  }

  static handleError(err) {
    let status;
    switch (err.type) {
      case API_ERROR_TYPE.INVALID:
        status = 400;
        break;
      case API_ERROR_TYPE.SERVER:
        status = 500;
        break;
      case API_ERROR_TYPE.NOT_FOUND:
      default:
        status = 404;
        break;
    }
    return {
      status,
      data: {
        message: err.message,
        error: true
      }
    };
  }
}

module.exports = {Controller};
