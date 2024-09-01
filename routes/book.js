const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Book = require("../models/book");
var jwt = require("jsonwebtoken");
const { authenticaionToken } = require("./userAuth");

//Add books -admins
router.post("/all-book", authenticaionToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.status(400).json({ message: "You are not Admin" });
    }
    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    await book.save();
    res.status(200).json({ message: "Book created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error" });
  }
});

//Update Book
router.put("/update-book", authenticaionToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    return res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error" });
  }
});

//Delete Book
router.delete("/delete-book", authenticaionToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error" });
  }
});

//get-all-books
router.get("/get-all-books", async (req, res) => {
  //Yeh api recent jo books add kiye hai unhe show karega
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
});

//Get Recents Books limit 4
router.get("/get-recent-books", async (req, res) => {
  //Yeh api recent jo books add kiye hai unhe show karega limit 4 home page ke liye.
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
});

//get book by id
router.get("/get-book-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.json({
      status: "Success",
      data: book,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
});
module.exports = router;
