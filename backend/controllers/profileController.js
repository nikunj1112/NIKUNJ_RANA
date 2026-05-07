const Profile = require('../models/Profile');
const { uploadMulterFileToCloudinary } = require('../utils/cloudinaryUpload');

// @desc    Get profile
// @route   GET /api/profile
// @access  Public
const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    
    if (!profile) {
      profile = await Profile.create({});
    }
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update profile
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      profile = await Profile.findByIdAndUpdate(
        profile._id,
        req.body,
        { new: true, runValidators: true }
      );
    }
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload profile image
// @route   POST /api/profile/image
// @access  Private
const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const cloudinaryUrl = await uploadMulterFileToCloudinary(req.file, {
      resourceType: 'image',
      folder: 'portfolio/profile',
    });

    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({ profileImage: cloudinaryUrl });
    } else {
      profile.profileImage = cloudinaryUrl;
      profile = await profile.save();
    }

    res.json({
      message: 'Profile image uploaded successfully',
      profileImage: profile.profileImage,
      profile: profile,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload resume
// @route   POST /api/profile/resume
// @access  Private
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No resume file provided' });
    }

    const cloudinaryUrl = await uploadMulterFileToCloudinary(req.file, {
      resourceType: 'raw',
      folder: 'portfolio/resume',
    });

    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({ resume: cloudinaryUrl });
    } else {
      profile.resume = cloudinaryUrl;
      profile = await profile.save();
    }

    res.json({
      message: 'Resume uploaded successfully',
      resume: profile.resume,
      profile: profile,
    });
  } catch (error) {
    console.error('Resume upload error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProfile, updateProfile, uploadProfileImage, uploadResume };

