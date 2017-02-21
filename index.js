const config = require('config');
const app = require('app');

app.listen(config.get('server.port'));
