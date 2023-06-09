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
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?s…RUAAIhCGAE=&rs=AOn4CLD-KzNy6Bp9u-hdiW4z_5ZcWA0Huw`
        const course = new Course(formData);
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(err => next(err));
    }

    // [GET] /courses/editCourse/:_id
    editCourse(req, res, next) {
        Course.findById(req.params.id)
            .then(course => {
                //res.json(course);
                res.render('courses/editCourse', {
                    course: mongooseToObject(course)
                });
            })

        .catch(err => next(err));
    }

    // [PUT] /courses/:_id
    updateCourse(req, res, next) {
        //res.json(req.body);
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(err => next(err));
    }

    // [DELETE] /courses/:_id
    deleteCourse(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(err => next(err));
    }

    // [PATCH] /courses/:_id/restoreCourse
    restoreCourse(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(err => next(err));
    }

    // [DELETE] /courses/:_id/force
    forceDeleteCourse(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(err => next(err));
    }

    // [POST] /courses/handle-form-actions-delete
    handleFormActionsDelete(req, res, next) {
        switch (req.body.action) {
            // Xóa tất cả những course có Id nằm trong list {$in: req.body.courseIds}
            case 'delete':
                Course.delete({ _id: {$in: req.body.courseIds} })
                    .then(() => res.redirect('back'))
                    .catch(err => next(err));
                break;
            default:
                res.json({message: 'Invalid action'});
        }
    }

     // [POST] /courses/handle-form-actions
     handleFormActions(req, res, next) {
        switch (req.body.action) {
            // Xóa tất cả những course có Id nằm trong list {$in: req.body.courseIds}
            case 'delete':
                Course.delete({ _id: {$in: req.body.courseIds} })
                    .then(() => res.redirect('back'))
                    .catch(err => next(err));
                break;
            case 'restore':
                Course.restore({ _id: {$in: req.body.courseIds} })
                    .then(() => res.redirect('back'))
                    .catch(err => next(err));
                break;
            default:
                res.json({message: 'Invalid action'});
        }
    }
}   

module.exports = new CourseController();
