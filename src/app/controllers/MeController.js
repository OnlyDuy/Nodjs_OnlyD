const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /stored/courses
    storedCourses(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('me/stored-courses', {
                    // cần làm như này vì đây là vấn đề của handlebars
                    courses: mutipleMongooseToObject(courses)
                });
            })
            // có lỗi sẽ render ra lỗi trong middleware
            .catch(err => next(err));
    }
}

module.exports = new MeController();
