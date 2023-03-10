/* ---------------<--MONGO DB CONNECTION -->-------------------------*/
const mongoose = require("mongoose");
const DB_URL = process.env.MONGOURL || "mongodb://127.0.0.1:27017/commercio";
mongoose.set("strictQuery", true); //Ensure this code comes before Mongoose connection below

//mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp') //, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("MONGO DB CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("OH NO: MONGO DB ENCOUNTERED ERROR:");
    console.log(err);
    //process.exit(1);
  });
/* ---------------<--MONGO DB CONNECTION -->-------------------------*/
