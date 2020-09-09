const express = require('express');
const router = express.Router();

const dashBoardControllers = require('../controllers/dashBoard');

router.get('/flaggedPosts/', dashBoardControllers.getFlaggedPosts);
router.put('/flagPost/:id', dashBoardControllers.flagPost);

module.exports = router;