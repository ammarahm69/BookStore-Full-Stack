const mongoose = require("mongoose");
const order = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    books: {
      type: {
        type: mongoose.Types.ObjectId,
        ref: "book",
      },
    },
    status: {
      type: String,
      enum: ["Order placed", "Out of delivevery", "Delivered", "Cancelled"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", order);
