const {LexerService} = require('../../server/services/lexerService');

const chai = require('chai');
chai.should();
const expect = chai.expect;

describe('Lexer Service - Unit Tests', function () {

  before(function () {
  });

  after(function () {
  });

  beforeEach(function () {
    this.timeout(100);
  });

  it('should generate correct number of LISP tokens for given LISP code. Eg 1: (setq x 10);', function (done) {
    let inputData = {
      data :"(setq x 10);"
    };

    const lexerService = new LexerService();
    lexerService.operate((inputData.data), (err, tokenArr) => {
      expect(tokenArr.length).to.equal(7);
      done();
    });
  });

  it('should generate correct number of LISP tokens for given LISP code. Eg 1: setq x (+ 20 30));', function (done) {
    let inputData = {
      data :"(setq x (+ 20 30));"
    };

    const lexerService = new LexerService();
    lexerService.operate((inputData.data), (err, tokenArr) => {
      expect(tokenArr.length).to.equal(11);
      done();
    });
  });

  it('should generate LISP tokens for given LISP code in the correct sequence. Eg 1: (setq x 10);', function (done) {
    let inputData = {
      data :"(setq x 10);"
    };

    const lexerService = new LexerService();
    lexerService.operate((inputData.data), (err, tokenArr) => {
      expect(tokenArr[0].name).to.equal('EXP_BEGIN');
      expect(tokenArr[0].value).to.equal('(');
      expect(tokenArr[1].name).to.equal('OP_ASSIGNMENT');
      expect(tokenArr[1].value).to.equal('setq');
      expect(tokenArr[2].name).to.equal('WORD');
      expect(tokenArr[2].value).to.equal('x');
      expect(tokenArr[3].name).to.equal('NUMBER');
      expect(tokenArr[3].value).to.equal('10');
      expect(tokenArr[4].name).to.equal('EXP_END');
      expect(tokenArr[4].value).to.equal(')');
      expect(tokenArr[5].name).to.equal('EOL');
      expect(tokenArr[5].value).to.equal(';');
      expect(tokenArr[6].name).to.equal('EOF');
      done();
    });
  });

  it('should generate LISP tokens for given LISP code in the correct sequence. Eg 1: (setq x (+ 20 30));', function (done) {
    let inputData = {
      data :"(setq x (+ 20 30));"
    };

    const lexerService = new LexerService();
    lexerService.operate((inputData.data), (err, tokenArr) => {
      expect(tokenArr[0].name).to.equal('EXP_BEGIN');
      expect(tokenArr[0].value).to.equal('(');
      expect(tokenArr[1].name).to.equal('OP_ASSIGNMENT');
      expect(tokenArr[1].value).to.equal('setq');
      expect(tokenArr[2].name).to.equal('WORD');
      expect(tokenArr[2].value).to.equal('x');
      expect(tokenArr[3].name).to.equal('EXP_BEGIN');
      expect(tokenArr[3].value).to.equal('(');
      expect(tokenArr[4].name).to.equal('OP_ADD');
      expect(tokenArr[4].value).to.equal('+');
      expect(tokenArr[5].name).to.equal('NUMBER');
      expect(tokenArr[5].value).to.equal('20');
      expect(tokenArr[6].name).to.equal('NUMBER');
      expect(tokenArr[6].value).to.equal('30');
      expect(tokenArr[7].name).to.equal('EXP_END');
      expect(tokenArr[7].value).to.equal(')');
      expect(tokenArr[8].name).to.equal('EXP_END');
      expect(tokenArr[8].value).to.equal(')');
      expect(tokenArr[9].name).to.equal('EOL');
      expect(tokenArr[9].value).to.equal(';');
      expect(tokenArr[10].name).to.equal('EOF');
      done();
    });
  });

});
