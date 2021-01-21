const { UserInputError } = require('apollo-server');
const Todo = require('../../mongodb/models/Todo');
const NATS = require('nats');
const nc = NATS.connect({
  url: process.env.NATS_URL || 'nats://192.168.1.198:7777'
});

const typeDef = `
  type Todo {
    content: String!
    important: Boolean
    done: Boolean
    createdAt: Date
    markedDoneAt: String
    id: ID!

    scalar Date
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
        nc.publish('todo_create', 'A new todo was created with content:\n\n' + todo);
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
        nc.publish('todo_delete', 'A Todo was deleted with content:\n\n' + result);
        return result;
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }
    },
    editTodo: async (root, args) => {
      let todo = await Todo.findById(args.id);
      const date = new Date();
      try {
        if (args.content) {
          todo.content = args.content
        }

        if (args.important) {
          todo.important = args.important
        }

        if (args.done) {
          todo.done = args.done
          todo.markedDoneAt = date.toISOString()
        }

        await todo.save();
        nc.publish('todo_edit', 'Todo was edited with content ' + todo);
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
