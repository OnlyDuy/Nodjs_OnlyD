const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] /courses/:slug
    showDetail(req, res, next) {
        //findOne: Tìm 1 bản ghi khi được chọn
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                //res.json(course);
                res.render('courses/showDetail', {
                    course: mongooseToObject(course)
                });
            })

            .catch(err => next(err));
    }
}   

module.exports = new CourseController();
