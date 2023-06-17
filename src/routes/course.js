// Tại đây sẽ cấu hình route cho trang news
const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/createCourse', courseController.createCourse);
router.post('/store', courseController.store);
router.get('/editCourse/:id', courseController.editCourse);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

router.get('/:slug', courseController.showDetail);

module.exports = router;
