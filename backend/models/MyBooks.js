// const mongoose = require('mongoose');

// const userBookSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User", // assuming you have a User model
//     required: true
//   },
//   bookId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Book", // assuming you have a Book model
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ["Want to Read", "Currently Reading", "Read"],
//     default: "Want to Read"
//   },
//   rating: {
//     type: Number,
//     min: 0,
//     max: 5
//   }
// }, { timestamps: true });

// userBookSchema.index({ userId: 1, bookId: 1 }, { unique: true });

// module.exports = mongoose.model("MyBooks", userBookSchema);



const mongoose = require('mongoose');

const userBookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming a User model exists
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book", // assuming a Book model exists
    required: true
  },
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
  status: {
    type: String,
    enum: ["Want to Read", "Currently Reading", "Read"],
    default: "Want to Read"
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  }
}, { timestamps: true });

// Prevent duplicate books for a user by bookId
userBookSchema.index({ userId: 1, bookId: 1 }, { unique: true });

module.exports = mongoose.model("MyBooks", userBookSchema);


