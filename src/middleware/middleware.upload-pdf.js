const cloudinary = require('cloudinary').v2;
const upload = require('./middleware.multer');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const uploadMiddleware = (req, res, next) => {
  upload.single('signedPdf')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        status: 'error',
        message: err.message
      });
    } else if (err) {
      return res.status(400).json({
        status: 'error',
        message: err.message
      });
    }

    if (!req.file) {
      return next();
    }
    cloudinary.uploader.upload(req.file.path, (error, result) => {
      if (error) {
        return res.status(400).json({
          status: 'error',
          message: error.message
        });
      }

      req.fileUrl = result.secure_url;
      next();
    });
  });
};

module.exports = uploadMiddleware;
