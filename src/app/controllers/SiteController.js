const Blog = require("../models/Blog"); // Import Mongoose Schema.
const { multipleMongooseObjects } = require("../../ulti/mongoose");

class SiteController {
  // [GET] /index
  index(req, res, next) {
    // Promies type:

    Blog.find({})
      .then((courses) => {
        // courses = multipleMongooseObjects(courses);
        courses = courses.map((obj) => obj.toObject());
        res.render("home", { courses });
      })
      .catch((err) => next(err));
  }
  // [GET] /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
