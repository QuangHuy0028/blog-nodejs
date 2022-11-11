class NewsController {
    // [GET] /news
    index(req, res) {
        res.render("news", {title: 'News Page'});
    }

    // [GEt] /news/:slug
    show(req, res){
        res.send('This is detail page.');
    }
}

module.exports = new NewsController;