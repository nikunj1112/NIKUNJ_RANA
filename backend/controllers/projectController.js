const Project = require('../models/Project');
const fs = require('fs');

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
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image || null;
    
    const projectData = {
      ...req.body,
      technologies: req.body.technologies ? req.body.technologies.split(',').map(t => t.trim()).filter(t => t) : [],
      image
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

    // Handle file upload - delete old image if new uploaded
    let imagePath = project.image;
    if (req.file) {
      // Delete old image
      if (project.image && fs.existsSync(`.${project.image}`)) {
        fs.unlinkSync(`.${project.image}`);
      }
      imagePath = `/uploads/${req.file.filename}`;
    }

    const updateData = {
      ...req.body,
      technologies: req.body.technologies ? req.body.technologies.split(',').map(t => t.trim()).filter(t => t) : project.technologies,
      image: imagePath
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

    // Delete image file
    if (project.image && fs.existsSync(`.${project.image}`)) {
      fs.unlinkSync(`.${project.image}`);
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProjects, createProject, updateProject, deleteProject };
