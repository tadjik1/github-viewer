const config = require('config');
const R = require('ramda');

module.exports = R.pick(config.get('github.fields'));
