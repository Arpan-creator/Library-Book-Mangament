const express = require("express");
const router = express.Router();
const { updateStatus, getMyBooks,addBook } = require("../controllers/MyBooksController");

// router.post("/save", upsertMyBook);         // save or update
router.get("/mybooks", getMyBooks);         // get all books for a user
router.post("/mybooks/:bookId",addBook)

router.patch("/mybooks/:bookId/status",updateStatus)
router.patch("/mybooks/:bookId/rating",updateStatus)

module.exports = router;
