const newsRouter = require("./news");
const siteRouter = require("./site");
const blogRouter = require("./blog-detail");

function route(app) {
  app.use("/news", newsRouter);
  app.use("/blog", blogRouter);
  
  app.use("/", siteRouter); // Always under all
}

module.exports = route;
