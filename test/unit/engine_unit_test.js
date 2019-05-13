const {LispGrammarEngine} = require('../../server/services/lispGrammarEngine');

const chai = require('chai');
chai.should();
const expect = chai.expect;

describe('Grammar Engine - Unit Tests', function () {

  before(function () {
  });

  after(function () {
  });

  beforeEach(function () {
    this.timeout(100);
  });

  it('should test the LISP tokens with grammar engine. Eg 1: (setq x 100);', function (done) {
    let inputData = {
      data: [
        {name: 'EXP_BEGIN', value: '('},
        {name: 'OP_ASSIGNMENT', value: 'setq'},
        {name: 'WORD', value: 'x'},
        {name: 'NUMBER', value: '100'},
        {name: 'EXP_END', value: ')'},
        {name: 'EOL', value: ';'},
        {name: 'EOF', value: null}
      ]
    };

    const engine = new LispGrammarEngine();
    engine.validate((inputData.data), (err, result) => {
      expect(result.currIndex).to.equal(6);
      expect(result.errorMessage).to.be.null;
      done();
    });
  });

  it('should test the LISP tokens with grammar engine. Eg 1: (setq x (* 5 8));', function (done) {
    let inputData = {
      data: [
        {name: 'EXP_BEGIN', value: '('},
        {name: 'OP_ASSIGNMENT', value: 'setq'},
        {name: 'WORD', value: 'x'},
        {name: 'EXP_BEGIN', value: '('},
        {name: 'OP_MUL', value: '*'},
        {name: 'NUMBER', value: '5'},
        {name: 'NUMBER', value: '8'},
        {name: 'EXP_END', value: ')'},
        {name: 'EXP_END', value: ')'},
        {name: 'EOL', value: ';'},
        {name: 'EOF', value: null}
      ]
    };

    const engine = new LispGrammarEngine();
    engine.validate((inputData.data), (err, result) => {
      expect(result.currIndex).to.equal(10);
      expect(result.errorMessage).to.be.null;
      done();
    });
  });

  it('should test the LISP tokens with grammar engine. Eg 1: (setq x (- 5 8)));', function (done) {
    let inputData = {
      data: [
        {name: 'EXP_BEGIN', value: '('},
        {name: 'OP_ASSIGNMENT', value: 'setq'},
        {name: 'WORD', value: 'x'},
        {name: 'EXP_BEGIN', value: '('},
        {name: 'OP_SUB', value: '-'},
        {name: 'NUMBER', value: '5'},
        {name: 'NUMBER', value: '8'},
        {name: 'EXP_END', value: ')'},
        {name: 'EXP_END', value: ')'},
        {name: 'EXP_END', value: ')'}, // extra token, should give grammar error
        {name: 'EOL', value: ';'},
        {name: 'EOF', value: null}
      ]
    };

    const engine = new LispGrammarEngine();
    engine.validate((inputData.data), (err, result) => {
      expect(result.currIndex).to.equal(10);
      expect(result.errorMessage).to.equal('Expected EXP_BEGIN at the beginning of expression.');
      done();
    });
  });

});
