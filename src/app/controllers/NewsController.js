
class NewsController {
    // [GET] /news
    news(req, res){
        res.render('news');
    }

    // [GET] /news/:slug
    show(req, res){
        res.send('New Details');
    }
}

// Khởi tạo 1 News Controller và export ra ngoài (để require vào trang news)
module.exports = new NewsController;