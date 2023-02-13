const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const cryptoJs = require("crypto-js"); //Password encryption

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET),
    // isAdmin: req.body.isAdmin,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
