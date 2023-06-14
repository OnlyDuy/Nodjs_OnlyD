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
    // [GET] /courses/createCourse
    createCourse(req, res, next) {
        res.render('courses/createCourse');
    }

    // [GET] /courses/store
    store(req, res) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?s…RUAAIhCGAE=&rs=AOn4CLD-KzNy6Bp9u-hdiW4z_5ZcWA0Huw`
        const course = new Course(formData);
        course.save()
            .then(() => res.redirect('/home'));
    }
}   

module.exports = new CourseController();
