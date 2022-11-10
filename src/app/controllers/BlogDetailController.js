const Blog = require("../models/Blog"); // The database.

createSlug = function (name) {
  const res = name.replace(/ /g, "-").toLowerCase();
  return res;
};

class BlogDetail {
  create(req, res, next) {
    res.render("create");
  }
  // [GEt] /blog/:slug
  show(req, res, next) {
    Blog.findOne({ slug: req.params.slug })
      .then((obj) => {
        obj = obj.toObject();
        res.render("blog-detail", { obj });
      })
      .catch((err) => next(err));
  }
  store(req, res, next) {
    const curr = req.body;
    curr.slug = createSlug(curr.name);
    console.log(curr.slug);

    const blog = new Blog(req.body, Blog);
    blog.save((err) => {
      if (err) return next(err);
      res.render("message/create-successfully", {
        message: "Document saved successfully!",
      });
    });
  }

  delete(req, res, next) {
    res.render("delete-page");
  }
  delete_handle(req, res, next) {
    //res.json(req.body);
    var blogName = req.body.name;
    blogName = createSlug(blogName);

    Blog.deleteOne({ slug: blogName })
      .then(
        res.render("message/create-successfully", {
          message: "Delete successfully",
        })
      )
      .catch(function (err) {
        next(err);
      });
  }
}

module.exports = new BlogDetail();
