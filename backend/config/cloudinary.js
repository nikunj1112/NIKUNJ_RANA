const cloudinary = require('cloudinary').v2;

// Ensure env vars are present
const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_FOLDER,
} = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  // Don’t throw on import in case someone runs scripts that don’t use uploads,
  // but fail fast when upload is attempted.
  console.warn(
    '[cloudinary] Missing one or more required environment variables: ' +
      'CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET'
  );
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

/**
 * Uploads a buffer to Cloudinary using an upload stream.
 * @param {Object} params
 * @param {Buffer} params.buffer
 * @param {string} params.mimetype
 * @param {string} [params.originalFilename]
 * @param {string} [params.resourceType] - 'image' | 'raw'
 * @param {string} [params.folder] - Cloudinary folder
 * @returns {Promise<string>} secure_url
 */
const uploadBufferToCloudinary = ({
  buffer,
  mimetype,
  originalFilename,
  resourceType = 'image',
  folder,
}) => {
  return new Promise((resolve, reject) => {
    if (!buffer) return reject(new Error('No file buffer provided'));

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType,
        folder: folder || CLOUDINARY_FOLDER,
        // Use original filename for better traceability; Cloudinary will sanitize.
        public_id:
          originalFilename && typeof originalFilename === 'string'
            ? originalFilename.replace(/\.[^/.]+$/, '')
            : undefined,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );

    const data = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
    uploadStream.end(data);
  });
};

module.exports = {
  cloudinary,
  uploadBufferToCloudinary,
};

