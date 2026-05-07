const { uploadBufferToCloudinary } = require('../config/cloudinary');

/**
 * Uploads an uploaded file from multer (memoryStorage) to Cloudinary.
 *
 * @param {Express.Multer.File} file
 * @param {Object} params
 * @param {'image'|'raw'} params.resourceType
 * @param {string} [params.folder]
 */
const uploadMulterFileToCloudinary = async (file, { resourceType, folder }) => {
  if (!file || !file.buffer) {
    throw new Error('No file buffer found');
  }

  const secureUrl = await uploadBufferToCloudinary({
    buffer: file.buffer,
    mimetype: file.mimetype,
    originalFilename: file.originalname,
    resourceType,
    folder,
  });

  return secureUrl;
};

module.exports = {
  uploadMulterFileToCloudinary,
};

