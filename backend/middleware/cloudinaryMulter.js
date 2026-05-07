const multer = require('multer');

// Use memoryStorage so Render doesn’t rely on local disk.
// Controllers upload req.file.buffer to Cloudinary.
const memoryStorage = multer.memoryStorage();

const createMulterMiddleware = ({
  fileFilter,
  limits,
}) => {
  return multer({
    storage: memoryStorage,
    fileFilter,
    limits,
  });
};

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith('image/')) {
    return cb(null, true);
  }
  return cb(new Error('Only image files are allowed!'), false);
};

const imageOrPdfFileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith('image/')) {
    return cb(null, true);
  }
  if (file.mimetype === 'application/pdf') {
    return cb(null, true);
  }
  return cb(new Error('Only image files (or PDF for resume) are allowed!'), false);
};

// Projects: field name 'image' and images only
const uploadProjectImage = createMulterMiddleware({
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Profile image: field name 'profileImage' and images only
const uploadProfileImage = createMulterMiddleware({
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Certificate image: field name 'image' and images only
const uploadCertificateImage = createMulterMiddleware({
  fileFilter: imageFileFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
});

// Resume: field name 'resume' and PDF only
const uploadResume = createMulterMiddleware({
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') return cb(null, true);
    return cb(new Error('Resume must be a PDF file'), false);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = {
  uploadProjectImage,
  uploadProfileImage,
  uploadCertificateImage,
  uploadResume,
};

