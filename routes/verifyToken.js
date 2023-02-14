const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header.token;
  if (authHeader) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(400).send("Token not valid!");
      res.status(200).json(user);
    });
  } else {
    res.status(401).send("User not Authenticated!");
  }
};

module.exports = verifyToken;
