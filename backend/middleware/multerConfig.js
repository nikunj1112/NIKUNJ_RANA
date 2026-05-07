// NOTE: This file used to store uploads locally via multer.diskStorage.
// For Render deployment we removed local disk dependency entirely.
//
// We now use multer memoryStorage and upload req.file.buffer to Cloudinary
// inside controllers.

// Backward-compatible multer exports used by existing routes.
// - profileRoutes uses `uploadProfile.single('profileImage')` and `uploadProfile.single('resume')`
// - projectRoutes uses `uploadProjectImage.single('image')`
// - certificateRoutes uses `uploadCertificateImage.single('image')`

const multer = require('multer');
const { uploadProjectImage, uploadCertificateImage } = require('./cloudinaryMulter');


// `uploadProfileImage` and `uploadResume` are multer instances;
// choose based on content-type inside a single wrapper.
// We keep implementation simple by using one multer with a filter that accepts both.
// (Reusing the original filters from cloudinaryMulter would require refactor; this wrapper is production-safe.)

const memoryStorage = require('multer').memoryStorage();

const uploadProfile = multer({
  storage: memoryStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith('image/')) return cb(null, true);
    if (file.mimetype === 'application/pdf') return cb(null, true);
    return cb(new Error('Only image files or PDF are allowed!'), false);
  },
});

module.exports = {
  // multer instances used by routes
  uploadProfile,
  uploadCertificateImage,
  uploadProjectImage,
};




