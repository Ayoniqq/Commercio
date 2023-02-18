const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const CryptoJS = require("crypto-js"); //Password encryption
const jwt = require("jsonwebtoken"); //Json web security

// REGISTER USER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString(),
    // isAdmin: req.body.isAdmin,
  });
  try {
    const savedUser = await newUser.save(); //Save User Info to the DB
    res.status(200).json(savedUser); //Display Saved user as JSON
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN USER
router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username }); //Query User
  if (!user) {
    return res.status(401).json("User not found");
  }
  const hashedPwd = CryptoJS.AES.decrypt(
    user.password,
    process.env.PASS_SECRET
  ); //CryptoJS decrypt

  const pwd = hashedPwd.toString(CryptoJS.enc.Utf8);
  console.log(pwd);
  if (pwd !== req.body.password) {
    return res.status(401).json("Wrong Credentials");
  }

  //JSON WEB TOKEN
  const accessToken = jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );

  const { password, ...others } = user._doc; //Destructuring the user info, then sending all but password to be visible in the json display
  res.status(200).json({ others, accessToken });
});

module.exports = router;
