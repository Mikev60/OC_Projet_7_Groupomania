const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');

const wallControllers = require('../controllers/wall');

router.post('/post/', multer, wallControllers.postMessage);

module.exports = router; 