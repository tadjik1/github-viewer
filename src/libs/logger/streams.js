const streams = (() => {
  if (process.env.LOG_LEVEL) {
    return [{
      level: process.env.LOG_LEVEL,
      stream: process.stdout
    }];
  }

  switch (process.env.NODE_ENV) {
  case 'development':
    return [{
      level: 'debug',
      stream: process.stdout
    }];
  case 'test':
    return []; // don't log anything
  case 'production':
    return [{
      level: 'info',
      stream: process.stdout
    }, {
      level: 'debug',
      type: 'raw',
      stream: process.stderr
    }];
  default:
    return []; // set LOG_LEVEL if want to see logs
  }
})();

module.exports = streams;
