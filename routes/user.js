const Router = require("express").Router();

Router.get("/user", () => {
  console.log(`User route being accesesed`);
});
