const { typeDef, resolvers } = require('./types/todo');
const { makeExecutableSchema } = require('apollo-server');

const Query = `
  type Query {
    allTodos: [Todo!]!
    findTodo(id: ID!): Todo
  }
  type Mutation {
    createTodo(
      content: String!
      important: Boolean = false
      done: Boolean = false
    ): Todo
    deleteTodo(id: ID!): Todo
    editTodo(
      id: ID!
      content: String
      important: Boolean = false
      done: Boolean = false
    ): Todo
  }
`

const schema = makeExecutableSchema({
  typeDefs: [Query, typeDef],
  resolvers: resolvers,
});

module.exports = schema;
