const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header.token;
  if (authHeader) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(400).send("Token not valid!");
      req.user = user;
    });
  } else {
    res.status(401).send("User not Authenticated!");
  }
};

const verifyTokenAndAuthenticate = (req, res, next) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    next();
  } else {
    res.status(401).json("You are not Allowed to do that");
  }
};

module.exports = verifyToken;
