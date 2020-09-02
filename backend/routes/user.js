const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/user');

router.post('/signup', userControllers.signup);
router.post('/login/', userControllers.login);
router.get('/getInfos/:id', userControllers.getInfos);

module.exports = router;