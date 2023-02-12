const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const db = require("./config/db");
const PORT = process.env.PORT || 8080;
const userRoute = require("./routes/user");
//ALL ROUTES
//ALL LOGIC
app.use(express.json());
app.use("/api/user", userRoute); //Default route & userRoute from user.js

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT: ${PORT}`);
});
