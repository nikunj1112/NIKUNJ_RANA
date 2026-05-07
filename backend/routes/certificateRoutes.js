const express = require('express');
const router = express.Router();
const {
  getCertificates,
  getCertificate,
  createCertificate,
  updateCertificate,
  deleteCertificate
} = require('../controllers/certificateController');
const { protect } = require('../middleware/authMiddleware');
const { uploadCertificateImage } = require('../middleware/multerConfig');

router.route('/')
  .get(getCertificates)
  .post(protect, uploadCertificateImage.single('image'), createCertificate);

router.route('/:id')
  .get(getCertificate)
  .put(protect, uploadCertificateImage.single('image'), updateCertificate)
  .delete(protect, deleteCertificate);

module.exports = router;
