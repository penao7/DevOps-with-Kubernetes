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
  date: Date,
  important: Boolean
}, 
  { runValidators: true }
);

todoSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Todo', todoSchema);
