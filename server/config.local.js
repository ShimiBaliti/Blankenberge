var p = require('../package.json');
var s = require('./config.json');
var version = p.version.split('.').shift();
module.exports = {
  restApiRoot: '/api' + (version > 0 ? '/v' + version : ''),
  host: process.env.HOST || s.host,
  port: process.env.PORT || s.port
};