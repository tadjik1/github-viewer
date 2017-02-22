const assert = require('assert');
const extractPagination = require('utils/extractPagination');
const headers = require('./fixtures/headers');

describe('extractPagination test suite', () => {
  context('when link header presents', () => {
    it('should returns number of pages', () => {
      const result = extractPagination(headers);

      assert.deepEqual(result, {
        total: 34,
        page: 1
      });
    });
  });

  context('otherwise', () => {
    it('should pass empty object', () => {
      assert.deepEqual(extractPagination({}), {});
    });
  });
});
