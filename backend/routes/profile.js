const express = require('express');
const router = express.Router();
const multerProfile = require('../middleware/multer-profile-config')

const profileControllers = require('../controllers/profile');

router.put('/avatar/', multerProfile, profileControllers.updateAvatar);
router.put('/changePassword/', profileControllers.changePassword);
router.put('/deleteAccount/', profileControllers.deleteAccount);

module.exports = router;