const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  coverImage: {
    type: String,
    required: true
  },
  availability: {
    type: Boolean,
    default: true
  }
}, { collection: 'Books' });

const Book = mongoose.model("Books", bookSchema);

module.exports = Book;
