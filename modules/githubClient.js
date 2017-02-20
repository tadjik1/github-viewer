const config = require('config');
const request = require('request-promise').defaults({
  json: true
});
const url = require('url');
const qs = require('qs');
const formatUser = require('../utils/formatUser');

exports.fetchUsersByLanguage = async ctx => {
  const query = Object.assign({},
    config.get('github.client.query'),
    {q: `language:${ctx.params.language}`}
  );

  const uri = url.format({
    protocol: config.get('github.client.protocol'),
    host: config.get('github.client.host'),
    pathname: '/search/users',
    search: qs.stringify(query, {encode: false})
  });

  const response = await request({
    uri,
    headers: config.get('github.client.headers')
  });

  ctx.body = {
    items: response.items.map(formatUser)
  };
};
