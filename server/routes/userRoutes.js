const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout); // 로그아웃 엔드포인트 추가
router.get('/check-session', userController.checkSession);
router.get('/current', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).send('Unauthorized');
    }
});
module.exports = router;
