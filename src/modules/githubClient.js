const config = require('config');
const url = require('url');
const qs = require('qs');
const request = require('request-promise').defaults({
  json: true,
  resolveWithFullResponse: true
});
const extractPagination = require('utils/extractPagination');

exports.fetchUsersByLanguage = async (language, parameters = {}) => {
  const query = Object.assign({},
    config.get('github.client.query'),
    parameters,
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

exports.fetchUser = async (username, parameters = {}) => {
  const query = Object.assign({},
    config.get('github.client.query'),
    parameters
  );

  const uri = url.format({
    protocol: config.get('github.client.protocol'),
    host: config.get('github.client.host'),
    pathname: `/users/${username}`,
    search: qs.stringify(query, {encode: false})
  });

  const response = await request({
    uri,
    headers: config.get('github.client.headers'),
    // if request failed - just pass error as a result
    simple: false
  });

  // but we still want to log error response
  if (response.statusCode !== 200) {
    console.error(
      `Failed to load user ${username} with parameters ${JSON.stringify(query)}.
      Status code: ${JSON.stringify(response.statusCode)}, error: ${JSON.stringify(response.body)}`
    );
  }

  return {body: response.body};
};
