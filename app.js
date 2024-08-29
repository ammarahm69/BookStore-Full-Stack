const express = require('express');
const app = express();
const userRoutes = require('./routes/user'); 
const adminbook = require('./routes/book');
const conn = require('./connection/connection');  

// Connect to MongoDB
conn();

// Middleware
app.use(express.json());

// Use user routes
app.use('/api/v1', userRoutes);
// Use books
app.use('/api/v1', adminbook)
// Define routes
app.get("/", (req, res) => {
  res.send("Hello");
});

// Create server and listen on the port
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server started running at port ${PORT}`);
});
