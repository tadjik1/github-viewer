const Router = require('koa-router');
const users = require('./users');

const router = new Router();

router
  .get('/users/:language', users.fetchUsersByLanguage);

module.exports = router.routes();
