const apolloServer = require('./graphql/apollo');

// initialize db
require('./mongodb/db');

// listen apollo server
apolloServer.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
});

