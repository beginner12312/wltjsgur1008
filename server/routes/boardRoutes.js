const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

router.get('/list', boardController.listPosts);
router.post('/insert', boardController.insertPost);
router.put('/update', boardController.updatePost);
router.get('/:id', boardController.getPost);
router.delete('/delete/:id', boardController.deletePost);

module.exports = router;
