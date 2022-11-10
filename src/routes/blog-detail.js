const express = require('express');
const router = express.Router();
const BlogDetailController = require('../app/controllers/BlogDetailController');

router.get('/create', BlogDetailController.create);
router.post('/store', BlogDetailController.store);
router.post('/delete/delete_handle', BlogDetailController.delete_handle);
router.get('/delete', BlogDetailController.delete);
router.get('/:slug', BlogDetailController.show);

module.exports = router;
