const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /stored/courses
    storedCourses(req, res, next) {

        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    // cần làm như này vì đây là vấn đề của handlebars
                    courses: mutipleMongooseToObject(courses),
                })
            )
            .catch(err => next(err));

        // 2 cái bên dưới được gọi là Promise nên nó xáy ra đồng thời 
        // cho nên không thể lấy được count của Course.find() nên cần làm như trên để lấy count
        // Và giờ có thể xóa 2 Promise bên dưới

        // Course.countDocumentsDeleted()
        //     .then((deletedCount) => {
        //         console.log(deletedCount);
        //     })
        //     .catch(() => { })

        // Course.find({})
        //     .then(courses => {
        //         res.render('me/stored-courses', {
        //             // cần làm như này vì đây là vấn đề của handlebars
        //             courses: mutipleMongooseToObject(courses)
        //         });
        //     })
        //     // có lỗi sẽ render ra lỗi trong middleware
        //     .catch(err => next(err));
    }

    // [GET] /trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({ deleted: true })
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses.filter(course => course.deleted)),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();