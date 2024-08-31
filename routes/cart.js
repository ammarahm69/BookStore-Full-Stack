const router = require("express").Router();
const User = require("../models/user");
const { authenticaionToken } = require("./userAuth");

//Add book to cart
router.put("/addToCart", authenticaionToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookinCart = userData.cart.includes(bookid);
    if (isBookinCart) {
      res.json({
        status: "Success",
        message: "Book is already in cart",
      });
    }
    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
    return res.json({
      status: "Success",
      message: "Book added to cart",
    });
  } catch (error) {
    res.status(500).json({ message: "Inrenal Server Error" });
  }
});
