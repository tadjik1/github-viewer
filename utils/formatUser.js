const config = require('config');
const {pick} = require('lodash');

module.exports = user => pick(user, config.get('github.fields'));
