const express = require("express");
const router = express.Router();
const User = require("../models/user");

//SignUp
router.post("/signup", async (req, res) => {
  try {
    const { username, password, email, address } = req.body;

    //Check the username length
    if (username.length < 4) {
      return res.status(400).json({ message: "Username must be at least 4 characters long." });
    }

    // Check if the user already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists." });
    }

    // Check if the email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Check the password length
    if (password.length < 4) {
      return res.status(400).json({ message: "Password must be at least 4 characters long." });
    }

    // Now saving the NewUser
    const newUser = new User({
      username,
      password,
      email,
      address,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
