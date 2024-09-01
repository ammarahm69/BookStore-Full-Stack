const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Book = require("../models/book");
const { authenticaionToken } = require("./userAuth");
const Order = require("../models/order");

//Place order
router.post("/place-order", authenticaionToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { orders } = req.body;

    for (const orderData of orders) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();

      // Saving order in user model
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });
    }
    //clearing cart
    await User.findByIdAndUpdate(id , {
        $pull:{cart :orderData._id},
    })
    return res.status(200).send({ message: "Order placed successfully"});k
  } catch (error) {
    res.status(500).send({ error: "Error placing order" });
  }
});


//get order history of a particular user

module.exports = router;
