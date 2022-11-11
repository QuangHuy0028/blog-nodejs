const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const binBlog = new Schema({
  name: { type: String, default: "A Blog" },
  description: { type: String, default: "A description" },
  image: { type: String, default: "" },
  slug: { type: String, default: "" },
  content: { type: String, default: "" },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('bin_courses', binBlog);
