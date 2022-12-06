const Blog = require("../models/Blog"); // The database.

createSlug = function (name) {
  const res = name.replace(/ /g, "-").toLowerCase();
  return res;
};
handleContentField = function (content) {
  return "<pre>" + content + "</pre>";
};
class BlogDetail {
  // [POST] /blog/create
  create(req, res, next) {
    res.render("create", { title: "Create Blogs" });
  }

  // [GEt] /blog/:slug
  show(req, res, next) {
    Blog.findOne({ slug: req.params.slug })
      .then((obj) => {
        obj = obj.toObject();
        res.render("blog-detail", { obj, content: obj.content });
      })
      .catch((err) => next(err));
  }

  // [GET] /blog/:id/edit
  update(req, res, next) {
    Blog.findOne({ slug: req.params.id })
      .then((blog) => {
        if (blog) blog = blog.toObject();

        res.render("update/update-page", { blog });
      })
      .catch((err) => next(err));
  }

  // [POST] /blog/update_handle
  update_handle(req, res, next) {
    var blogID = req.params.id;
    console.log("\n\nBLOG ID : " + blogID + "\n\n");
    Blog.findOne({ _id: blogID })
      .then(function (blog) {
        blog.name = req.body.name;
        blog.description = req.body.description;
        blog.image = req.body.image;
        blog.content = req.body.content;
        blog.save();
        res.render("message/create-successfully", {
          message: "Document saved successfully!",
        });
      })
      .catch((err) => next(err));
  }

  // [POST] /blog/store
  store(req, res, next) {
    const curr = req.body;
    curr.slug = createSlug(curr.name);

    const blog = new Blog(req.body, Blog);
    blog.save((err) => {
      if (err) return next(err);
      res.render("message/create-successfully", {
        message: "Document saved successfully!",
      });
    });
  }
  // [POST] /blog/delete
  delete(req, res, next) {
    Blog.find({})
      .then((blog) => {
        blog = blog.map((obj) => obj.toObject());
        res.render("delete-page", {
          css: '<link rel="stylesheet" href="/css/delete-page.css">',
          blog: blog,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  // [POST] /blog/delete_handle/
  delete_handle(req, res, next) {
    //res.json(req.body);
    var blogName = req.params.id;

    Blog.deleteOne({ name: blogName })
      .then(
        res.send("Delete successfully")
      )
      .catch(function (err) {
        next(err);
      });
  }
}

module.exports = new BlogDetail();
