const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const adminbook = require("./routes/book");
const Favourite = require("./routes/favourite");
const Order = require("./routes/order");
const Cart = require("./routes/cart");
const conn = require("./connection/connection");

// Connect to MongoDB
conn();

// Middleware
app.use(express.json());
// Use user routes
app.use("/api/v1", userRoutes);
// Use books
app.use("/api/v1", adminbook);
// Use favourite
app.use("/api/v1", Favourite);
// Use Cart
app.use("/api/v1", Cart);
// Use Order
app.use("/api/v1", Order);

// Define routes
app.get("/", (req, res) => {
  res.send("Hello");
});

// Create server and listen on the port
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server started running at port ${PORT}`);
});
