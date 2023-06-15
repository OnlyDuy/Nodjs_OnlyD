// Tại đây sẽ cấu hình route cho trang news
const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/stored/courses', meController.storedCourses);

module.exports = router;
 