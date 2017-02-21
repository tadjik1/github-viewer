const bunyan = require('bunyan');
const config = require('config');
const streams = require('./streams');

module.exports = bunyan.createLogger({
  name: config.get('applicationName'),
  streams
});
