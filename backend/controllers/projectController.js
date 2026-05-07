const Project = require('../models/Project');
const { uploadMulterFileToCloudinary } = require('../utils/cloudinaryUpload');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    let image = req.body.image || null;

    if (req.file) {
      // Upload directly to Cloudinary (images)
      image = await uploadMulterFileToCloudinary(req.file, {
        resourceType: 'image',
        folder: 'portfolio/projects',
      });
    }

    const projectData = {
      ...req.body,
      technologies: req.body.technologies
        ? req.body.technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
      image,
    };

    const project = await Project.create(projectData);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    let image = project.image;
    if (req.file) {
      image = await uploadMulterFileToCloudinary(req.file, {
        resourceType: 'image',
        folder: 'portfolio/projects',
      });
    }

    const updateData = {
      ...req.body,
      technologies: req.body.technologies
        ? req.body.technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : project.technologies,
      image,
    };

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Cloudinary deletion is optional; leaving it as-is avoids needing public_id
    // unless you add storing cloudinary public_id.
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProjects, createProject, updateProject, deleteProject };
