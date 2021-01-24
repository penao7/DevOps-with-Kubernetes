const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const todoSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    unique: true,
    minLength: 4,
    maxLength: 140,
    uniqueCaseInsensitive: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  markedDoneAt: String,
  important: Boolean,
  done: Boolean
}, 
  { runValidators: true }
);

todoSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Todo', todoSchema);
