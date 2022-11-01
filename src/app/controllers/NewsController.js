class NewsController {
    // [GET] /news
    index(req, res) {
        res.render("news");
    }

    // [GEt] /news/:slug
    show(req, res){
        res.send('This is detail page.');
    }
}

module.exports = new NewsController;