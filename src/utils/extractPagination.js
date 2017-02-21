const url = require('url');
const qs = require('qs');
const R = require('ramda');

// extract page from query of link that returns from github
// <https://api.github.com/search/users?q=language%3Ajavascript&page=2> => 2
const extractPage = link => {
  const urlObj = url.parse(link.replace('<', '').replace('>', ''));
  return qs.parse(urlObj.query).page;
};

// extract label from rel string
// rel='next' => next
const extractLabel = rel => {
  const match = new RegExp(/rel=["|']([\w]+)["|']/).exec(rel);
  if (!match) return '';
  return match[1];
};

// parse 'link' header that contains urls for pagination
// and extract parameters from that urls
module.exports = R.when(
  R.has('link'),
  R.compose(
    ({next, last}) => ({total_pages: Number(last), page: next - 1}),
    R.fromPairs,
    R.map(R.compose(
      ([a, b]) => [extractLabel(b), extractPage(a)],
      R.split(';')
    )),
    R.split(','),
    R.prop('link')
  )
);
