const express = require('express');
const router = express.Router();
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const { uploadProjectImage } = require('../middleware/multerConfig');

router.get('/', getProjects);
router.post('/', protect, uploadProjectImage.single('image'), createProject);
router.put('/:id', protect, uploadProjectImage.single('image'), updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;

