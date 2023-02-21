const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const db = require("./config/db");
const PORT = process.env.PORT || 8080;
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");

app.use(express.json());
app.use("/api/auth", authRoute); //authRoute
app.use("/api/users", userRoute); //Default route & userRoute from user.js
app.use("/api/products", productRoute); //productRoute

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT: ${PORT}`);
});
