const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const db = require("./config/db");
const PORT = process.env.PORT || 8080;
//ALL ROUTES
//ALL LOGIC

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT: ${PORT}`);
});
