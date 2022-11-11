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

  // [POST] /blog/update
  update(req, res, next) {
    // res.send('Update ' + req.params.slug);
    Blog.findOne({ slug: req.params.slug })
      .then((blog) => {
        blog = blog.toObject();
        // res.json(blog);
        res.render("update/update-page", { blog });
      })
      .catch((err) => next(err));
  }

  // [POST] /blog/update_handle
  update_handle(req, res, next) {
    var blogName = req.body.name;
    blogName = createSlug(blogName);

    Blog.deleteOne({ slug: blogName })
      .then()
      .catch(function (err) {
        next(err);
      });

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
    res.render("delete-page");
  }
  
  // [POST] /blog/delete_handle
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
