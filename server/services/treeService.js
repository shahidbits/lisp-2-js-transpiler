const {AbstractSyntaxTree} = require('../models/abstractSyntaxTree');

class TreeService {

  constructor() {
  }

  generate(tokenArr, cb) {

    let result = {};
    result.currIndex = 0;
    result.ast = new AbstractSyntaxTree('(');
    result.currentNode = result.ast.root;
    result.currIndex += 1;
    while (tokenArr[result.currIndex].name !== 'EOF') {
      if (tokenArr[result.currIndex].name === 'EOL') {
        if (result.currIndex > 0 && tokenArr[result.currIndex - 1].name !== 'EOL') {
          result.lineNumber += 1;
        }
        result.currIndex += 1;
      } else {
        this._generateStatementTree(tokenArr, result);
      }
    }

    cb(null, result.ast);
  }

  _generateStatementTree(tokenArr, result) {

    switch (tokenArr[result.currIndex].name) {
      case 'EOF':
        return result;
      case 'EXP_BEGIN':
        result.currentNode = result.ast.insert(result.currentNode, '(');
        result.currIndex += 1;
        break;
      case 'OP_ASSIGNMENT':
        result.currentNode = result.ast.insert(result.currentNode, '=');
        result.currIndex += 1;
        this._generateStatementTree(tokenArr, result);
        break;
      case 'OP_ADD':
        result.currentNode = result.ast.insert(result.currentNode, '+');
        result.currIndex += 1;
        this._generateStatementTree(tokenArr, result);
        break;
      case 'OP_SUB':
        result.currentNode = result.ast.insert(result.currentNode, '-');
        result.currIndex += 1;
        this._generateStatementTree(tokenArr, result);
        break;
      case 'OP_MUL':
        result.currentNode = result.ast.insert(result.currentNode, '*');
        result.currIndex += 1;
        this._generateStatementTree(tokenArr, result);
        break;
      case 'OP_DIV':
        result.currentNode = result.ast.insert(result.currentNode, '/');
        result.currIndex += 1;
        this._generateStatementTree(tokenArr, result);
        break;
      case 'WORD':
      case 'NUMBER':
        result.ast.insert(result.currentNode, tokenArr[result.currIndex].value);
        result.currIndex += 1;
        this._generateStatementTree(tokenArr, result);
        break;
      default:
        result.currIndex += 1;
        break;
    }
  }
}

module.exports = {TreeService};
