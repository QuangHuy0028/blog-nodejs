const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/blog_nodejs_dev", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected successfully !");
    
  } catch (err) {
    console.log("Connect failed");
  }

//   const db = mongoose.connection;
//   db.on("error", console.error.bind(console, "MongoDB connection error"));
}

module.exports = { connect }; // exports a function(promise)
