const express = require('express');
const app = express();
const userRoutes = require('./routes/user');  // Renamed the import to avoid conflict
const conn = require('./connection/connection');  // Import the connection setup

// Connect to MongoDB
conn();

// Middleware
app.use(express.json());

// Use user routes
app.use('/api/v1', userRoutes);

// Define routes
app.get("/", (req, res) => {
  res.send("Hello");
});

// Create server and listen on the port
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server started running at port ${PORT}`);
});
