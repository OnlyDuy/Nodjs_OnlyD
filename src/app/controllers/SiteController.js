const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /home
    // Đang tương tác với model để gọi model 
    // model trọc vào db để lấy dữ liệu theo truy vấn của chúng ta
    // cuối cùng trả lại dữ liệu cho Controller: courses
    // đứng từ controller lại send về browser: res.json(courses)
    home(req, res, next) {
        // ở đây đang viết ở dạng promise
        Course.find({})
            .then(courses => {
                res.render('home', {
                    // cần làm như này vì đây là vấn đề của handlebars
                    courses: mutipleMongooseToObject(courses)
                });
            })
            // có lỗi sẽ render ra lỗi trong middleware
            .catch(err => next(err));
        //res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
