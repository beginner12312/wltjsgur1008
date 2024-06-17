const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

router.post('/list', boardController.listPosts);
router.post('/insert', boardController.insertPost);
router.post('/update', boardController.updatePost);
router.post('/delete', boardController.deletePost);

module.exports = router;
