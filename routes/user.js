const router = require("express").Router();
const User  = require("../models/user");
//SignUp
router.post("/signup", async (req, res) => {
  try {
    const { username, password, email, address } = req.body;
    //Check the username length
    if (username.length < 4 ){
        return res.status(400).json({ message: "Username must be at least 4 characters long." });
    }
    
    // Check if the user is already exist
    const existingUsername = await User.findOne({ username: username})
    if (existingUsername){
        return res.status(400).json({ message: "Username already exists." });
    }

    //check if the user email is already exist
    const existingEmail = await User.findOne({email: email})
    if (existingUsername){
        return res.status(400).json({ message: "Email already exists." });
    }
    //check the password length
    if(password.length < 4 ){
        return res.status(400).json({ message: "Password must be at least 4 characters long." });
    }
    //Now saving the NewUser
    const newUser = new User ({
        username : username,
        password : password,
        email : email,
        address : address
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
 