const router = require("express").Router();

router.get("/usertest", (req, res) => {
  res.send(`User route is being accesesed`);
});

router.post("/userposttest", (req, res) => {
  const username = req.body.username;
  res.send("User post sent!");
  console.log(username);
});

module.exports = router;
