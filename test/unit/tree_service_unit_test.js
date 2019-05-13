const {TreeService} = require('../../server/services/treeService');

const chai = require('chai');
chai.should();
const expect = chai.expect;

describe('Tree Service - Unit Tests', function () {

  before(function () {
  });

  after(function () {
  });

  beforeEach(function () {
    this.timeout(100);
  });

  it('should generate the parse tree for the LISP tokens passed. Eg 1: (setq x 100);', function (done) {
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

    const treeService = new TreeService();
    treeService.generate((inputData.data), (err, ast) => {
      expect(ast.root).to.not.be.null;
      expect(ast.root.data).to.equal('(');
      expect(ast.root.left).to.not.be.null;
      expect(ast.root.left.data).to.equal('=');
      expect(ast.root.left.left).to.not.be.null;
      expect(ast.root.left.left.data).to.equal('x');
      expect(ast.root.left.right).to.not.be.null;
      expect(ast.root.left.right.data).to.equal('100');
      done();
    });
  });

  it('should generate the parse tree for the LISP tokens passed. Eg 1: (setq x (- 5 8));', function (done) {
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
        {name: 'EOL', value: ';'},
        {name: 'EOF', value: null}
      ]
    };

    const treeService = new TreeService();
    treeService.generate((inputData.data), (err, ast) => {
      expect(ast.root).to.not.be.null;
      expect(ast.root.data).to.equal('(');
      expect(ast.root.left).to.not.be.null;
      expect(ast.root.left.data).to.equal('=');
      expect(ast.root.left.left).to.not.be.null;
      expect(ast.root.left.left.data).to.equal('x');
      expect(ast.root.left.right).to.not.be.null;
      expect(ast.root.left.right.data).to.equal('(');
      expect(ast.root.left.right.left).to.not.be.null;
      expect(ast.root.left.right.left.data).to.equal('-');
      expect(ast.root.left.right.left.left).to.not.be.null;
      expect(ast.root.left.right.left.left.data).to.equal('5');
      expect(ast.root.left.right.left.right).to.not.be.null;
      expect(ast.root.left.right.left.right.data).to.equal('8');
      done();
    });
  });

});
