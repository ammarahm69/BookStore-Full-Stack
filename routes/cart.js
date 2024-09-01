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

//Remove book from cart
router.put("/removeFromCart/:bookid", authenticaionToken, async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;
    await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
    return res.json({
      status: "Success",
      message: "Book removed from cart",
    });
  } catch (error) {
    res.status(500).json({ message: "Inrenal Server Error" });
  }
});

//get cart of a particular user
router.get("/get-user-cart" , authenticaionToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();

        return res.json({
            status: "Success",
            data: cart
        });
    } catch (error) {
        res.status(500).json({ message: "Inrenal Server Error" });

    }
})

module.exports = router;
