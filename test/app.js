const request = require('request-promise');
const app = require('app');
const assert = require('assert');
const nock = require('nock');
const config = require('config');

xdescribe('application test suite', () => {
  let server;
  before(done => {
    server = app.listen(config.get('server.port'), done);
  });

  after(done => server.close(done));

  describe('fetch users by language', () => {
    before(() => {
      nock('https://api.github.com')
        .get('/search/users')
        .query(true)
        .reply(200, {
          items: [{login: 1}]
        })
        .get('/users/1')
        .reply(200, {
          name: 'name'
        });
    });

    after(() => {
      nock.restore();
    });

    it('should returns users from github API', async () => {
      const response = await request('http://localhost:3000/api/users/ruby');

      assert.deepEqual(response, {
        pagination: {},
        items: [{name: 'name'}, {name: 'name'}]
      });
    });
  });
});
