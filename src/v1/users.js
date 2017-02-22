const {fetchUsersByLanguage, fetchUser} = require('modules/githubClient');
const formatUser = require('utils/formatUser');

exports.fetchUsersByLanguage = async ctx => {
  const parameters = ctx.query.page
    ? {page: ctx.query.page}
    : {};

  const {body: rawUsers, pagination} =
    await fetchUsersByLanguage(ctx.params.language, parameters);

  const users = await Promise.all(rawUsers.items.map(item => {
    return fetchUser(item.login);
  }));

  ctx.body = {
    users: users.map(({body}) => formatUser(body)),
    pagination
  };
};
