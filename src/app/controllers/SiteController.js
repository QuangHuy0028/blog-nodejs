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

        res.render("home", { title: "Home page", courses });
      })
      .catch((err) => next(err));
  }
  // [GET] /contact
  contact(req, res, next) {
    res.render("contact/contact", { title: "Contact page"});
  }

  // [GET] /search
  search(req, res, next) {
    if (req.query.q === undefined || req.query.q === "") res.render("search");
    else {
      Blog.find({})
        .then((blog) => {
          // Regular expression to match all Blog which has name include search text
          var expr = new RegExp(req.query.q, "gi");
          
          // Find all Blog which has name include search text
          blog = blog.map((obj) => obj.toObject()).filter((element, index) => {
            return expr.test(element.name);
          });

          // Render to the browser window
          var title = (req.query.q).toString();
          title = title[0].toUpperCase() + title.slice(1);

          res.render("search/search-result", {
            title: `Search Result: ${title}`,
            css: '<link rel="stylesheet" href="/css/search-result.css">',
            blog: blog,
          });
        })
        .catch(function (err) {
          next(err);
        });
    }
  }
}

module.exports = new SiteController();
