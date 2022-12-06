// import mongoose library
const mongoose = require("mongoose");
// Use Schema interface in Mongoose
const Schema = mongoose.Schema;

// Fields of data
const Blog = new Schema({
  name: { type: String, default: "A Blog" },
  description: { type: String, default: "A description" },
  image: { type: String, default: "" },
  slug: { type: String, default: "", slug: "name", unique: true },
  content: { type: String, default: "" },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("courses", Blog); // Export
