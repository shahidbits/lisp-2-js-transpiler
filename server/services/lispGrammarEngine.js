const LISP_GRAMMAR = {
  __EXPRESSION: "EXP_BEGIN:::__ASSIGNMENT|__OPERATION:::EXP_END",
  __ASSIGNMENT: "OP_ASSIGNMENT:::WORD:::NUMBER|__EXPRESSION",
  __OPERATION: "OP_ADD|OP_SUB|OP_MUL|OP_DIV:::NUMBER|__EXPRESSION:::NUMBER|__EXPRESSION"
};

class LispGrammarEngine {

  constructor() {
  }

  validate(tokenArr, cb) {
    let result = {};
    result.currIndex = 0;
    result.lineNumber = 1;
    result.errorMessage = null;
    result.expectedToken = null;
    while (tokenArr[result.currIndex].name !== 'EOF' && result.errorMessage === null) {
      if (tokenArr[result.currIndex].name === 'EOL') {
        if (result.currIndex > 0 && tokenArr[result.currIndex - 1].name !== 'EOL') {
          result.lineNumber += 1;
        }
        result.currIndex += 1;
      } else {
        this.validateStatement(tokenArr, result, '__EXPRESSION');
      }
    }
    cb(null, result);
  }

  validateStatement(tokenArr, result, grammarElem) {

    if (tokenArr[result.currIndex].name == 'EOF') {
      return result;
    }

    let elemTokens = LISP_GRAMMAR[grammarElem].split(':::');
    for (let i = 0; i < elemTokens.length; i++) {
      this.validateToken(tokenArr, result, elemTokens[i]);
      if (result.errorMessage != null) {
        return result;
      }
    }
  }

  validateToken(tokenArr, result, expectedToken) {

    if (expectedToken.indexOf('|') !== -1) {
      // Multiple options
      let multiOptionTokens = expectedToken.split('|');
      let dataInput = {};
      for (let i = 0; i < multiOptionTokens.length; i++) {
        dataInput.prevIndex = result.currIndex;
        this.validateToken(tokenArr, result, multiOptionTokens[i]);
        if (result.errorMessage === null) {
          break;
        } else {
          result.errorMessage = null;
          result.expectedToken = null;
          result.currIndex = dataInput.prevIndex;
        }
      }
    } else if (expectedToken.startsWith('__')) {
      // Parent Option
      this.validateStatement(tokenArr, result, expectedToken);
    } else {
      // Single Option
      if (tokenArr[result.currIndex].name != expectedToken) {
        result.errorMessage = `Expected ${expectedToken} at the beginning of expression.`;
        result.expectedToken = expectedToken;
        result.currIndex = result.currIndex + 1;
        return result;
      } else {
        result.currIndex = result.currIndex + 1;
      }
    }
  }

}

module.exports = {LispGrammarEngine};
