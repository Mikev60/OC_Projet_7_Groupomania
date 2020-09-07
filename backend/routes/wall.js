const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const multerProfile = require('../middleware/multer-profile-config')

const wallControllers = require('../controllers/wall');

//Posts routes
router.post('/post/', multer, wallControllers.postMessage);
router.post('/post/answer/', wallControllers.postAnswer);

//Get routes
router.get('/getAll/',  wallControllers.getAllPosts);
router.get('/answer/get/:id', wallControllers.getAnswers);

module.exports = router;