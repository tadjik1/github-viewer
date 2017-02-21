module.exports = {
  server: {
    port: process.env.PORT || 8080
  },
  github: {
    client: {
      query: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
      }
    }
  }
};
