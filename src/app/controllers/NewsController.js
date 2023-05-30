
class NewsController {
    // [GET] /news
    index(req, res){
        res.render('news');
    }

    // [GET] /news/:slug
    show(req, res){
        res.send('New Details');
    }
}

module.exports = new NewsController;