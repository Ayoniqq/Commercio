const express = require("express");
const app = express();
const PORT = 8080;
const mongoose = require("mongoose");
const db = require("./config/db");

//ALL ROUTES
//ALL LOGIC

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT: ${PORT}`);
});
