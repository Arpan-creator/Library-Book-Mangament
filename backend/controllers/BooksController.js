const Book=require("../models/Book")
const BookController=async(req,res)=>{
try {
    const books = await Book.find(); // fetch all books
    // console.log("Books That i found--->",books)
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }

}

module.exports=BookController;