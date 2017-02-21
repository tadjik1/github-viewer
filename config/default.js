module.exports = {
  applicationName: 'github-viewer',
  server: {
    port: 3000
  },
  github: {
    fields: ['login', 'name', 'avatar_url', 'followers'],
    client: {
      protocol: 'https',
      host: 'api.github.com',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'tadjik1/github-viewer'
      },
      query: {
      }
    }
  }
};
