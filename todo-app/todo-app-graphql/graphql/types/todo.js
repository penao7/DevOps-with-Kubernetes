const { UserInputError } = require('apollo-server');
const Todo = require('../../mongodb/models/Todo');

const typeDef = `
  type Todo {
    content: String!
    important: Boolean
    id: ID!
  }
`

const resolvers = {
  Query: {
    allTodos: () => {
      return Todo.find({})
    },
    findTodo: (root, args) =>
      Todo.findOne({ id: args.id })
  },
  Mutation: {
    createTodo: async (root, args) => {
      const todo = new Todo({ ...args });
      try {
        await todo.save();
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }
      return todo;
    },
    deleteTodo: async (root, args) => {
      try {
        const result = await Todo.findByIdAndDelete(args.id);
        return result;
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }
    },
    editTodo: async (root, args) => {
      let todo = await Todo.findById(args.id);
      try {
        if (args.content) {
          todo.content = args.content
        }

        if (args.important) {
          todo.important = args.important
        }
        await todo.save();

      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }

      return todo;
    }
  }
}

module.exports = { typeDef, resolvers }