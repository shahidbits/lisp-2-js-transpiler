const lexing = require('lexing');

// It will use the first rule with a matching regex, so go from more specific
// to more catch-all. The ^ anchor before every regex is required!
const rules = [
  [/^$/, function (match) {
    return lexing.Token('EOF', null);
  }],
  [/^[+]/, function (match) {
    return lexing.Token('OP_ADD', match[0]);
  }],
  [/^[-]/, function (match) {
    return lexing.Token('OP_SUB', match[0]);
  }],
  [/^[*]/, function (match) {
    return lexing.Token('OP_MUL', match[0]);
  }],
  [/^[/]/, function (match) {
    return lexing.Token('OP_DIV', match[0]);
  }],
  [/^(setq)/, function (match) {
    return lexing.Token('OP_ASSIGNMENT', match[0]);
  }],
  [/^[<]/, function (match) {
    return lexing.Token('OP_REL_LESS', match[0]);
  }],
  [/^(<=)/, function (match) {
    return lexing.Token('OP_REL_LESSEQ', match[0]);
  }],
  [/^(>)/, function (match) {
    return lexing.Token('OP_REL_MORE', match[0]);
  }],
  [/^(>=)/, function (match) {
    return lexing.Token('OP_REL_MOREEQ', match[0]);
  }],
  [/^(==)/, function (match) {
    return lexing.Token('OP_REL_EQUAL', match[0]);
  }],
  [/^(=)/, function (match) {
    return lexing.Token('OP_EQUAL_TO', match[0]);
  }],
  [/^\d+/, function (match) {
    return lexing.Token('NUMBER', match[0]);
  }],
  [/^[(]/, function (match) {
    return lexing.Token('EXP_BEGIN', match[0]);
  }],
  [/^[)]/, function (match) {
    return lexing.Token('EXP_END', match[0]);
  }],
  [/^\s+/, function (match) {
    return null; // ignore whitespace
  }],
  [/^(IF)/, function (match) {
    return lexing.Token('KEYWORD_IF', match[0]);
  }],
  [/^[RETURN]/, function (match) {
    return lexing.Token('KEYWORD_RETURN', match[0]);
  }],
  [/^[^!"#$%&'()*+,\-./:;<=>?@[\\\]\^_`{|}~\s]+/, function (match) {
    return lexing.Token('WORD', match[0]);
  }],
  [/^[;]*/, function (match) {
    return lexing.Token('EOL', match[0]);
  }],
  [/^./, function (match) {
    return lexing.Token('PUNCTUATION', match[0]);
  }],
];

const tokenizer = new lexing.Tokenizer(rules);

class LexerService {

  operate(codeLine, cb) {
    // console.log('CodeLine');
    // console.log(codeLine);
    let input = new lexing.StringIterator(codeLine);
    let output = tokenizer.map(input);

    let token = null;
    let tokenArr = [];
    do {
      token = output.next();
      tokenArr.push(token);
      // console.log('token=%s => %j', token.name, token.value);
    } while (token.name !== 'EOF');

    cb(null, tokenArr);
  }
}

module.exports = {LexerService};
