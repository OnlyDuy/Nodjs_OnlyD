// Tại đây sẽ cấu hình route cho trang news
const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/:slug', courseController.showDetail);

module.exports = router;
