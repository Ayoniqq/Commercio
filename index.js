const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const db = require("./config/db");
const PORT = process.env.PORT || 8080;
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute); //Default route & userRoute from user.js

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT: ${PORT}`);
});
