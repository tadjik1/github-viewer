const config = require('config');
const url = require('url');
const qs = require('qs');
const request = require('request-promise').defaults({
  json: true,
  resolveWithFullResponse: true,
  simple: false
});
const extractPagination = require('utils/extractPagination');

exports.fetchUsersByLanguage = async language => {
  const query = Object.assign({},
    config.get('github.client.query'),
    {q: `language:${language}`}
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

  const pagination = extractPagination(response.headers);

  return {body: response.body, pagination};
};

exports.fetchUser = async username => {
  const query = Object.assign({},
    config.get('github.client.query')
  );

  const uri = url.format({
    protocol: config.get('github.client.protocol'),
    host: config.get('github.client.host'),
    pathname: `/users/${username}`,
    search: qs.stringify(query, {encode: false})
  });

  const response = await request({
    uri,
    headers: config.get('github.client.headers')
  });

  return response.body;
};
