module.exports = {
  server: {
    port: 3000
  },
  github: {
    fields: ['login', 'avatar_url'],
    client: {
      protocol: 'https',
      host: 'api.github.com',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'tadjik1/github-viewer'
      },
      query: {
        client_id: '',
        client_secret: ''
      }
    }
  }
};
