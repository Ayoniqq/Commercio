const router = require("express").Router();
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }

  try {
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

// router.get("/usertest", (req, res) => {
//   res.send(`User route is being accesesed`);
// });

// router.post("/userposttest", (req, res) => {
//   const username = req.body.username;
//   res.send("User post sent!");
//   console.log(username);
// });

module.exports = router;
