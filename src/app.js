const Koa = require('koa');
const app = module.exports = new Koa();
const logger = require('libs/logger');

app.use(async (ctx, next) => {
  try {
    await next();
  } catch(err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = {
        error: err.message
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        error: 'Internal server error'
      };

      console.error(err);
    }
  }
});

const github = require('modules/github');
github.init(app);
