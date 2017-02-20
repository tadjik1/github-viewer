const assert = require('assert');
const formatUser = require('utils/formatUser');
const {users} = require('./fixtures/users');

describe('formatUser test suite', () => {
  context('when user object has all required fields', () => {
    it('should ignore fields that is not listed in config', () => {
      const res = users.map(formatUser);
      assert.deepEqual(
        res,
        [{id: 1, name: 'name1'}, {id: 2, name: 'name2'}]
      );
    });
  });

  context('otherwise', () => {
    it('should returns object with rest fields', () => {
      const res = [{}, {}].map(formatUser);
      assert.deepEqual(res, [{}, {}]);
    });
  });
});
