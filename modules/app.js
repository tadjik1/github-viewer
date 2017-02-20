const Koa = require('koa');
const Router = require('koa-router');
const {fetchUsersByLanguage} = require('./githubClient');
const formatUser = require('../utils/formatUser');

const app = module.exports = new Koa();
const router = new Router({
  prefix: '/api'
});

router.get('/users/:language', async ctx => {
  const response = await fetchUsersByLanguage(ctx.params.language);

  ctx.body = {
    items: response.items.map(formatUser)
  };
});

app.use(router.routes());
