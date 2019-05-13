class Transpiler {

  // 1. Write Grammar Engine
  // 2. Generate Parse Tree

  constructor(lexer, grammarEngine, treeGenerator) {
    this.lexer = lexer;
    this.grammarEngine = grammarEngine;
    this.treeGenerator = treeGenerator;
  }

  validate({data}, cb) {
    this.lexer.operate((data), (err, tokenArr) => {
      this.grammarEngine.validate(tokenArr, (err, result) => {
        if (err) {
          cb(err);
        } else {
          if (result && result.errorMessage) {
            let errorResponse = {
              error: true,
              errorMessage: `Line ${result.lineNumber}: ${result.errorMessage}`
            };
            cb(null, errorResponse);
          } else {
            let sucResponse = {
              error: false,
            };
            cb(null, sucResponse);
          }
        }
      });
    });
  }

  convert({data}, cb) {

    this.lexer.operate((data), (err, tokenArr) => {
      this.grammarEngine.validate(tokenArr, (err, result) => {
        if (err) {
          cb(err);
        } else {
          if (result && result.errorMessage) {
            let errorResponse = {
              error: true,
              errorMessage: `Line ${result.lineNumber}: ${result.errorMessage}`
            };
            cb(null, errorResponse);
          } else {
            this.treeGenerator.generate(tokenArr, (err, resultAst) => {
              let resultCode = {};
              resultCode.data = '';
              resultAst.print(resultAst.root, resultCode);
              cb(null, resultCode);
            });
          }
        }
      });
    });
  }

}

module.exports = {Transpiler};
