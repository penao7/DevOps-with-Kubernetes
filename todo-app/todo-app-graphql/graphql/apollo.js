const { ApolloServer } = require('apollo-server');
const schema = require('./schema');

const errorPlugin = {

  // Fires whenever a GraphQL request is received from a client.
  requestDidStart(requestContext) {
    console.log('Request started! Query:\n' +
      requestContext.request.query);

    return {

      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      parsingDidStart(requestContext) {
        console.log('Parsing started!');
      },

      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      validationDidStart(requestContext) {
        console.log('Validation started!');
      },

    }
  },
};

const server = new ApolloServer({
  schema,
  plugins: [
    errorPlugin
  ],
  formatError: (err) => {
    console.log(err);
    if (err.message.startsWith("E11000 duplicate key error collection")) {
      return new Error('Todo already exists')
    }
    if (err.message.includes("Error, expected `content` to be unique")) {
      return new Error('Todo already exists') 
    }
    if (err.message.includes("is longer than the maximum allowed length")) {
      return new Error('Todo maxium length is 140 characters')
    }
    if (err.message.includes("is shorter than the minimum allowed length")) {
      return new Error('Todo minimun length is 4 characters')
    }
    if (err.message.startsWith("UserInputError: no todo found with id")) {
      return new Error('Cannot delete todo: no todo found')
    }
  }
});

module.exports = server;
