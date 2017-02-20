const config = require('config');
const app = require('./modules/app');

app.listen(config.get('server.port'));
