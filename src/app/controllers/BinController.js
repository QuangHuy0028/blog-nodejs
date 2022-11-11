const Blog = require("../models/Blog");
const binBlog = require("../models/Bin");

createSlug = function (name) {
  const res = name.replace(/ /g, "-").toLowerCase();
  return res;
};

class BinController {
  // [GET] /bin/show
  show(req, res, next) {
    res.send("Bin page !");
  }

  // [POST] /bin/:slug
  store(req, res, next) {
    const slug = createSlug(req.body.name);
    Blog.findOne({slug: slug})
    .then((obj) => {
        // store in the bin
        const blog = new binBlog(req.body, binBlog);
        blog.save()
        .then(() => {
            res.json(req.body);
        })
        .catch((err) => next(err));
    })
    .catch(err => next(err));
  }
}

module.exports = new BinController();
