const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const todoSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    unique: true,
    minlenght: 4,
    uniqueCaseInsensitive: true
  },
  date: Date,
  important: Boolean
});

todoSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Todo', todoSchema);
