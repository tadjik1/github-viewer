const Koa = require('koa');
const Router = require('koa-router');
const {fetchUsersByLanguage} = require('./githubClient');

const app = module.exports = new Koa();
const router = new Router({
  prefix: '/api'
});

router.get('/users/:language', fetchUsersByLanguage);

app.use(router.routes());
