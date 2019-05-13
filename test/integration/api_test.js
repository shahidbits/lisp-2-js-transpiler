const {TestServer} = require('./test_server');

const chai = require('chai');
const request = require('request');
chai.should();
const expect = chai.expect;

describe('API - Acceptance Tests', function () {
  let port;
  let testServer;

  before(function () {
    this.timeout(5000);
    port = 9876;
    testServer = new TestServer();
    testServer.init(port);
  });

  after(function () {
    this.timeout(1000);
    testServer.close();
  });

  beforeEach(function () {
    this.timeout(500);
  });

  it('should pass as correct LISP code is send. Eg 1: (setq x 100);', function (done) {
    this.timeout(5000);

    let formData = {
      "data": "(setq x 100);"
    };
    request.post({
      url: `http://localhost:${port}/api/v1/isValidLisp`,
      form: formData
    }, (err, httpResponse, body) => {
      let res = JSON.parse(body);
      expect(res.error).to.equal(false);
      expect(httpResponse.statusCode).to.equal(200);
      done();
    });
  });

  it('should pass as correct LISP code is send. Eg 1: (setq x (* 5 8));', function (done) {
    this.timeout(5000);

    let formData = {
      "data": "(setq x (* 5 8));"
    };
    request.post({
      url: `http://localhost:${port}/api/v1/isValidLisp`,
      form: formData
    }, (err, httpResponse, body) => {
      let res = JSON.parse(body);
      expect(res.error).to.equal(false);
      expect(httpResponse.statusCode).to.equal(200);
      done();
    });
  });

  it('should fail as incorrect LISP code is send. Eg 1: (setq x (* 5 8)));', function (done) {
    this.timeout(5000);

    let formData = {
      "data": "(setq x (* 5 8)));"
    };
    request.post({
      url: `http://localhost:${port}/api/v1/isValidLisp`,
      form: formData
    }, (err, httpResponse, body) => {
      let res = JSON.parse(body);
      expect(res.error).to.equal(true);
      expect(res.errorMessage).to.equal('Line 1: Expected EXP_BEGIN at the beginning of expression.');
      expect(httpResponse.statusCode).to.equal(200);
      done();
    });
  });
});
