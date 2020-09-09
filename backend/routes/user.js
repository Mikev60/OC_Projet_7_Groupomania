const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/user');

router.post('/signup', userControllers.signup);
router.post('/login/', userControllers.login);
router.get('/getInfos/:id', userControllers.getInfos);
router.get('/:id/getAllPosts', userControllers.getAllPosts);
router.get('/getAllUsers', userControllers.getAllUsers);

module.exports = router;