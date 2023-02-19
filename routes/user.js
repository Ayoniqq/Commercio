const router = require("express").Router();
const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//UPDATE USER INFO
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password, // PASSWORD ENCRYPT
      process.env.PASS_SECRET //PASSWORD SECRET CREATED ALONGSIDE CRYPTOJS
    ).toString();
  }

  try {
    //Update User
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete User
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET User
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------------------------------
// TESTING ROUTES
router.get("/usertest", (req, res) => {
  res.send(`User route is being accessed`);
});

router.post("/userposttest", (req, res) => {
  const username = req.body.username;
  res.send("User post sent!");
  console.log(username);
});
// --------------------------------------------------

module.exports = router;
