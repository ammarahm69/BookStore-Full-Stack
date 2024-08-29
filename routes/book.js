const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Book = require("../models/book");
var jwt = require("jsonwebtoken");
const { authenticaionToken } = require("./userAuth");

//All books -admins
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
module.exports = router;
