const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, uploadProfileImage, uploadResume } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');
const { uploadProfile } = require('../middleware/multerConfig');

router.get('/', getProfile);
router.put('/', protect, updateProfile);
router.post('/image', protect, uploadProfile.single('profileImage'), uploadProfileImage);
router.post('/resume', protect, uploadProfile.single('resume'), uploadResume);

module.exports = router;

