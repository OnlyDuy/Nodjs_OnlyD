const Course = require('../models/Course');

class SiteController {
    // [GET] /home
    // Đang tương tác với model để gọi model 
    // model trọc vào db để lấy dữ liệu theo truy vấn của chúng ta
    // cuối cùng trả lại dữ liệu cho Controller: courses
    // đứng từ controller lại send về browser: res.json(courses)
    home(req, res) {
        Course.find({})
        .then(courses => {res.json(courses)})
        .catch(err => {res.status(400).json({error: 'ERROR !!'})})
        //res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
