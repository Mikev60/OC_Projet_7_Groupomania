const express = require('express');
const router = express.Router();

const dashBoardControllers = require('../controllers/dashBoard');

router.get('/flagged/', dashBoardControllers.getFlagged);
router.put('/flagPost/:id', dashBoardControllers.flagPost);

module.exports = router;