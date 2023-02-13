const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const newUser = new User({
    //Create User
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });
  try {
    const savedUser = await newUser.save(); //Save User
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
