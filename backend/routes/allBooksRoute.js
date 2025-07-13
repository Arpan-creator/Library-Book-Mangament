const express = require('express');
const router = express.Router();

const BookController=require("../controllers/BooksController")

router.get('/books',BookController)

module.exports=router