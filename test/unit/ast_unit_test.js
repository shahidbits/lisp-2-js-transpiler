const {AbstractSyntaxTree} = require('../../server/models/abstractSyntaxTree');

const chai = require('chai');
chai.should();
const expect = chai.expect;

describe('Abstract Syntax Tree - Unit Tests', function () {

  before(function () {
  });

  after(function () {
  });

  beforeEach(function () {
    this.timeout(100);
  });

  it('should create the root of the AST.', function (done) {
    const ast = new AbstractSyntaxTree('=');
    expect(ast.root).to.not.be.null;
    expect(ast.root.data).to.equal('=');
    done();
  });

  it('should set the left child of the passed node.', function (done) {
    const ast = new AbstractSyntaxTree('=');
    ast.insert(ast.root, 'x');
    expect(ast.root.left).to.not.be.null;
    expect(ast.root.left.data).to.equal('x');
    done();
  });

  it('should set the right child of the passed node.', function (done) {
    const ast = new AbstractSyntaxTree('=');
    ast.insert(ast.root, 'x');
    ast.insert(ast.root, '5');
    expect(ast.root.right).to.not.be.null;
    expect(ast.root.right.data).to.equal('5');
    done();
  });
});
