const Router = require('koa-router');
const {fetchUsersByLanguage, fetchUser} = require('libs/githubClient');
const formatUser = require('utils/formatUser');

const router = new Router({
  prefix: '/api'
});

router.get('/users/:language', async ctx => {
  const {body, pagination} = await fetchUsersByLanguage(ctx.params.language);
  const response = await Promise.all(body.items.map(item => {
    return fetchUser(item.login);
  }));

  ctx.body = {
    items: response.map(formatUser),
    pagination
  };
});

exports.init = app => app.use(router.routes());
