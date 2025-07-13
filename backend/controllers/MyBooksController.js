const MyBooks=require("../models/MyBooks")
const Book=require("../models/Book");
// const { insertOne } = require("../models/Users");

// POST or UPDATE status/rating
const updateStatus = async (req, res) => {
  console.log("Inside Update Status -->");

  const userId = req.user.id;
  const { bookId } = req.params;
  const { status, rating } = req.body;

  // Build dynamic update object
//   const updateFields = {};
//   if (status !== undefined) updateFields.status = status;
//   if (rating !== undefined) updateFields.rating = rating;

//   if (Object.keys(updateFields).length === 0) {
//     return res.status(400).json({ error: "No status or rating provided to update" });
//   }

  try {
    const updated = await MyBooks.findOneAndUpdate(
      { userId, bookId },
      {status,rating},
    //   updateFields,
      { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json({ message: "Book status/rating updated", data: updated });
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).json({ error: "Failed to update book" });
  }
};


// GET all books for a user
const getMyBooks = async (req, res) => {
    // console.log("Get my books",req.user)

    const userId=req.user.id

  try {
    const userBooks = await MyBooks.find({userId })

    res.status(200).json({message:"Your added books",data:userBooks});
  } catch (error) {
    console.error("Fetch failed:", error);
    res.status(500).json({ error: "Failed to fetch user books" });
  }
};





const addBook = async (req, res) => {
  const { bookId } = req.params;
  const userId = req.user?.id;

  if (!userId || !bookId) {
    return res.status(400).json({ error: "Missing userId or bookId" });
  }

  try {
    // Simulate getting book metadata (you could replace this with a DB fetch or API call)
    const bookMeta = await Book.findById(bookId); // Only if you're still using a Book model

    if (!bookMeta) {
      return res.status(404).json({ error: "Book not found" });
    }

    const { title, author, coverImage } = bookMeta;

    console.log("This is coverImage:", coverImage);
    console.log("Adding book for user:", userId);

    const bookToAdd = {
      bookId,
      userId,
      title,
      author,
      coverImage,
      status: "Want to Read", // optional
      rating: 0 // or leave undefined
    };

    const addedBook = await MyBooks.create(bookToAdd);

    return res.status(201).json({ message: "Book added", data: addedBook });
  } catch (error) {
    console.error("❌ Failed adding book:", error);

    if (error.code === 11000) {
      return res.status(409).json({ error: "Book already in user's list" });
    }

    return res.status(500).json({ error: "Server error while adding book" });
  }
};


module.exports = { updateStatus, getMyBooks,addBook };
