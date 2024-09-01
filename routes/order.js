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
    await User.findByIdAndUpdate(id, {
      $pull: { cart: orderData._id },
    });
    return res.status(200).send({ message: "Order placed successfully" });
    k;
  } catch (error) {
    res.status(500).send({ error: "Error placing order" });
  }
});

//get order history of a particular user

router.get("/get-order-history", authenticaionToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });

    const ordersData = userData.orders.reverse();
    return res.json({
      status: "Success",
      data: "ordersData",
    });
  } catch (error) {
    return res.status(500).send({ error: "Error getting order history" });
  }
});

//Get all orders -- Admin (jitne bhi orders hai unko dekhega)
router.get("/get-all-orders", authenticaionToken, async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({
        path: "book",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: "userData",
    });
  } catch (error) {
    return res.status(500).send({ error: "Error getting order history" });
  }
});

// updation of order status -- Admin
router.put("/update-status/:id", authenticaionToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Orders.findByIdAndUpdate(id, { status: req.body.status });
    return res.json({
      status: "Success",
      message: "Status updated successfully",
    });
  } catch (error) {
    return res.status(500).send({ error: "Error updating status" });
  }
});

module.exports = router;
