// connection/connection.js
require('dotenv').config();

console.log('MongoDB URI:', process.env.URI); // Add this line to debug

const mongoose = require('mongoose');

const conn = async () => {
  try {
    if (!process.env.URI) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to Database");
  } catch (error) {
    console.log("Database connection error:", error);
  }
};

module.exports = conn;
