const url = require('url');
const qs = require('qs');
const R = require('ramda');

// extract page from query of link that returns from github
// <https://api.github.com/search/users?q=language%3Ajavascript&page=2> => 2
const extractPageFromLink = link => {
  const urlObj = url.parse(link.replace('<', '').replace('>', ''));
  return Number(qs.parse(urlObj.query).page);
};

// extract label from rel string
// rel='next' => next
const extractLabelFromRel = rel => {
  const match = new RegExp(/rel=["|']([\w]+)["|']/).exec(rel);
  if (!match) return '';
  return match[1];
};

/*
 parse 'link' header that contains urls for pagination
 and extract parameters from that urls

 input: String
 "<https://api.github.com/search/users?page=2> rel='next',
 <https://api.github.com/search/users?page=34> rel='last'"
 output: Object contains pagination info
  {
    total: 34,
    page: 1
  }
*/
module.exports = R.when(
  R.has('link'),
  R.compose(
    ({next, last}) => ({total: last, page: next - 1}),
    R.fromPairs,
    R.map(R.compose(
      ([link, rel]) => [extractLabelFromRel(rel), extractPageFromLink(link)],
      R.split(';')
    )),
    R.split(','),
    R.prop('link')
  )
);
