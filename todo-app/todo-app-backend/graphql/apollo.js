const { ApolloServer } = require('apollo-server');
const schema = require('./schema');

const server = new ApolloServer({
  schema,
  formatError: (err) => {
    if (err.message.startsWith("E11000 duplicate key error collection")) {
      return new Error('Todo already exists')
    }
    if (err.message.startsWith("Todo validation failed")) {
      return new Error('Todo already exists')
    }
    if (err.message.startsWith("UserInputError: no todo found with id")) {
      return new Error('Cannot delete todo: no todo found')
    }
  }
});

module.exports = server;
