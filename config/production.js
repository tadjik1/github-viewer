module.exports = {
  server: {
    port: process.env.PORT
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
