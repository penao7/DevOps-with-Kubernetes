const { ApolloServer } = require('apollo-server');
const schema = require('./schema');

const server = new ApolloServer({
  schema,
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
