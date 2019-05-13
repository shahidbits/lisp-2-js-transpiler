const {LexerService} = require('../../server/services/lexerService');
const {LispGrammarEngine} = require('../../server/services/lispGrammarEngine');
const {TreeService} = require('../../server/services/treeService');
const {Controller} = require('../../server/controller');
const {Transpiler} = require('../../server/transpiler');
const {Application} = require('../../server/app');

class TestServer {
  constructor() {
    this.server = null;
  }

  init(port) {
    const getDelay = () => 0;
    const lexerService = new LexerService();
    const grammarEngine = new LispGrammarEngine();
    const treeGenerator = new TreeService();
    const transpiler = new Transpiler(lexerService, grammarEngine, treeGenerator);
    const controller = new Controller(transpiler);
    this.server = new Application(controller);
    this.server.init(port);
  }

  close() {
    this.server.close();
  }
}

module.exports = {TestServer};
