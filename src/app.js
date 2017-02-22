const Koa = require('koa');
const mount = require('koa-mount');
const v1 = require('v1');

const app = module.exports = new Koa();

// top-level error handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch(err) {
    // user error (such as ctx.throw(400))
    if (err.status) {
      ctx.status = err.status;
      ctx.body = {
        error: err.message
      };
    // github request error
    } else if (err.name === 'StatusCodeError') {
      ctx.status = err.statusCode;
      ctx.body = {
        error: err.error.message
      }
    } else {
      ctx.status = 500;
      ctx.body = {
        error: 'Internal server error'
      };

      console.error(err);
    }
  }
});

app.use(mount('/api/v1', v1));
