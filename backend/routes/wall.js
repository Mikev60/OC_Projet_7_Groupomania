const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const multerProfile = require('../middleware/multer-profile-config')

const wallControllers = require('../controllers/wall');
const auth = require('../middleware/auth');

//Posts routes
router.post('/post/',auth, multer, wallControllers.postMessage);
router.post('/post/answer/', auth, wallControllers.postAnswer);

//Get routes
router.get('/getAll/', auth, wallControllers.getAllPosts);
router.get('/answer/get/:id', auth, wallControllers.getAnswers);

module.exports = router;