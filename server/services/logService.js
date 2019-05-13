class Logger {
  morganFunction(tokens, req, res) {

    let reqMethod = tokens.method(req, res) || 'REQUEST_METHOD';
    let reqUrl = tokens.url(req, res) || 'REQUEST_URL';
    let reqIP = tokens['remote-addr'](req, res) || 'REQUEST_IP';
    let reqDate = new Date().toUTCString() || 'REQUEST_DATE';
    let resStatus = tokens.status(req, res) || 'RESPONSE_STATUS';
    let resStatusMessage = res.statusMessage || 'RESPONSE_STATUS_MESSAGE';
    let resContentLength = (tokens.res(req, res, 'content-length') || 'CONTENT_LENGTH') + ' b';
    let resTime = (tokens['response-time'](req, res) || 'RESPONSE_TIME') + ' ms';

    let consoleData = [
      reqIP,
      reqDate,
      reqMethod,
      reqUrl,
      resStatus,
      resStatusMessage,
      resContentLength,
      resTime
    ].join(' * ');

    return consoleData;
  }

}

module.exports = {Logger};
