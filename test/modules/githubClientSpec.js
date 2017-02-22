const assert = require('assert');
const nock = require('nock');
const {fetchUsersByLanguage, fetchUser} = require('modules/githubClient');

const users = require('./fixtures/users');
const rateLimitError = require('./fixtures/rate-limit-error');

describe('githubClient test suite', () => {
  describe('fetchUsersByLanguage test suite', () => {
    context('when github api returns 200', () => {
      it('should return users', async () => {
        nock('https://api.github.com/')
          .get('/search/users')
          .query(true)
          .reply(200, users);

        const {body} = await fetchUsersByLanguage('language');

        assert.deepEqual(body, users);
      });
    });

    context('otherwise', () => {
      it('should throw exception with error body', async () => {
        nock('https://api.github.com/')
          .get('/search/users')
          .query(true)
          .reply(403, rateLimitError);

        try {
          await fetchUsersByLanguage('language');
        } catch (err) {
          assert.equal(err.error.message, rateLimitError.message);
        }
      });
    });
  });

  describe('fetchUser test suite', () => {
    context('when github api returns 200', () => {
      it('should return user', async () => {
        nock('https://api.github.com/')
          .get('/users/userName')
          .query(true)
          .reply(200, users.items[0]);

        const {body} = await fetchUser('userName');

        assert.deepEqual(body, users.items[0]);
      });
    });

    context('otherwise', () => {
      it('should handle exception and return error as a body', async () => {
        nock('https://api.github.com/')
          .get('/users/userName')
          .query(true)
          .reply(403, rateLimitError);


          const {body} = await fetchUser('userName');

          assert.deepEqual(body, rateLimitError);
      });
    });
  });
});
