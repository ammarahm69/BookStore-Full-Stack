const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { authenticaionToken } = require("./userAuth");

//SignUp
router.post("/signup", async (req, res) => {
  try {
    const { username, password, email, address } = req.body;

    //Check the username length
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username must be at least 4 characters long." });
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
      return res
        .status(400)
        .json({ message: "Password must be at least 4 characters long." });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    // Now saving the NewUser
    const newUser = new User({
      username: username,
      password: hashPassword,
      email: email,
      address: address,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Sign-In

router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invaild Credentials" });
    }
    await bcrypt.compare(password, existingUser.password, (err, data) => {
      const authClaims = [
        { name: existingUser.username },
        { role: existingUser.role },
      ];
      const token = jwt.sign({ authClaims }, "bookStore", { expiresIn: "30d" });
      if (data) {
        return res.status(200).json({
          id: existingUser._id,
          role: existingUser.role,
          token: token,
        });
      } else {
        return res.status(400).json({ message: "Invaild Credentials" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error" });
  }
});

//Get user Informations

router.get("/get-user-info", authenticaionToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error" });
  }
});

//Address Update
router.put("/update-address", authenticaionToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address: address });
    return res.status(200).json({ message: "Address Updated Successfully"})
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error" });
  }
});
module.exports = router;
