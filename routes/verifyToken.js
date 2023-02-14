const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header.token;
  if (authHeader) {
  } else {
    res.status(401).send("User not Authenticated");
  }
};
