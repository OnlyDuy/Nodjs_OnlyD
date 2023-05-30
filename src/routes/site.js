
// Tại đây sẽ cấu hình route cho trang site
const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.use('/search', siteController.search);
router.use('/', siteController.home);

module.exports = router;