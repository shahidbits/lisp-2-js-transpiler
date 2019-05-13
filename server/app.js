const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const {ApiError} = require('./models/apiError');
const {Controller} = require('./controller');
const {Logger} = require('./services/logService');

class Application {

  constructor(controller) {
    this.controller = controller;
    this.server = null;
  }

  init(port) {

    const app = express();

    app.use(helmet());
    app.use(morgan((new Logger).morganFunction));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    // routes
    app.post('/api/v1/isValidLisp', (req, res) => this.controller.isValidLisp(req.body, (e, data) => this.serve(res, data)));
    app.post('/api/v1/convertToJS', (req, res) => this.controller.convertLisp2JS(req.body, (e, data) => this.serve(res, data)));

    // Error handling
    app.use((err, req, res, next) => {
      console.log(err);
      if (err instanceof ApiError) {
        this.serveError(res, Controller.handleError(err));
        return;
      }
      next(err);
    });

    this.server = app.listen(port, () => console.log(`server running on port ${port}`));
  }

  close() {
    this.server && this.server.close();
    this.server = null;
  }

  serve(res, data) {
    res.send(data);
  }

  serveError(res, {status, data}) {
    res.status(status).send(data);
  }

}

module.exports = {Application};
