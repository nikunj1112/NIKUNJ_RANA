// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { projectsAPI } from '../../services/api';

// const ManageProjects = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [editingProject, setEditingProject] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     technologies: '',
//     githubLink: '',
//     liveLink: '',
//     image: '',
//     category: 'Web Development',
//   });
//   const [saving, setSaving] = useState(false);

//   const categories = ['Web Development', 'Mobile App', 'API', 'Full Stack'];

//   useEffect(() => {
//     loadProjects();
//   }, []);

//   const loadProjects = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await projectsAPI.getProjects();
//       console.log('Projects response:', res.data);
//       setProjects(res.data || []);
//     } catch (err) {
//       console.error('Error loading projects:', err);
//       console.error('Error response:', err.response?.data);
//       setError('Failed to load projects. Make sure backend is running on port 3030.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     const projectData = {
//       ...formData,
//       technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t),
//     };
//     try {
//       if (editingProject) {
//         await projectsAPI.updateProject(editingProject._id, projectData);
//       } else {
//         await projectsAPI.createProject(projectData);
//       }
//       await loadProjects();
//       closeModal();
//     } catch (err) {
//       console.error('Error saving project:', err);
//       alert('Failed to save project. Please try again.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleEdit = (project) => {
//     setEditingProject(project);
//     setFormData({
//       title: project.title || '',
//       description: project.description || '',
//       technologies: project.technologies?.join(', ') || '',
//       githubLink: project.githubLink || '',
//       liveLink: project.liveLink || '',
//       image: project.image || '',
//       category: project.category || 'Web Development',
//     });
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this project?')) {
//       try {
//         await projectsAPI.deleteProject(id);
//         await loadProjects();
//       } catch (err) {
//         console.error('Error deleting project:', err);
//         alert('Failed to delete project.');
//       }
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setEditingProject(null);
//     setFormData({
//       title: '',
//       description: '',
//       technologies: '',
//       githubLink: '',
//       liveLink: '',
//       image: '',
//       category: 'Web Development',
//     });
//   };

//   const openAddModal = () => {
//     setEditingProject(null);
//     setFormData({
//       title: '',
//       description: '',
//       technologies: '',
//       githubLink: '',
//       liveLink: '',
//       image: '',
//       category: 'Web Development',
//     });
//     setShowModal(true);
//   };

//   return (
//     <div>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mb-8 flex justify-between items-center"
//       >
//         <div>
//           <h1 className="text-3xl font-bold mb-2">Manage Projects</h1>
//           <p className="text-light-gray/70">Add, edit, or remove your projects</p>
//         </div>
//         <button onClick={openAddModal} className="btn-primary">
//           + Add Project
//         </button>
//       </motion.div>

//       {/* Error Message */}
//       {error && (
//         <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
//           <p>{error}</p>
//           <button onClick={loadProjects} className="mt-2 text-sm underline">
//             Try Again
//           </button>
//         </div>
//       )}

//       {loading ? (
//         <div className="flex justify-center py-12">
//           <div className="loader" />
//         </div>
//       ) : (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="grid grid-cols-1 md:grid-cols-2 gap-6"
//         >
//           <AnimatePresence>
//             {projects.map((project) => (
//               <motion.div
//                 key={project._id}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 className="glass rounded-xl overflow-hidden"
//               >
//                 <div className="h-40 bg-gradient-to-br from-accent/20 to-soft-blue/20 flex items-center justify-center">
//                   {project.image ? (
//                     <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
//                   ) : (
//                     <span className="text-6xl">🚀</span>
//                   )}
//                 </div>
//                 <div className="p-6">
//                   <div className="flex items-start justify-between mb-3">
//                     <h3 className="font-bold text-lg">{project.title}</h3>
//                     <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">
//                       {project.category}
//                     </span>
//                   </div>
//                   <p className="text-light-gray/70 text-sm mb-4 line-clamp-2">
//                     {project.description}
//                   </p>
//                   <div className="flex flex-wrap gap-1 mb-4">
//                     {project.technologies?.map((tech, i) => (
//                       <span key={i} className="text-xs px-2 py-1 rounded bg-secondary-dark">
//                         {tech}
//                       </span>
//                     ))}
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleEdit(project)}
//                       className="flex-1 py-2 px-4 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(project._id)}
//                       className="flex-1 py-2 px-4 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
//                     >
//                       Delete
//                     </button>
//                     </div>
// </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       )}

//       {projects.length === 0 && !loading && !error && (
//         <div className="text-center py-12 text-light-gray/50">
//           No projects added yet. Click "Add Project" to get started.
//         </div>
//       )}

//       {/* Modal */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
//             onClick={closeModal}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               onClick={(e) => e.stopPropagation()}
//               className="glass rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
//             >
//               <h2 className="text-2xl font-bold mb-6">
//                 {editingProject ? 'Edit Project' : 'Add New Project'}
//               </h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Project Title</label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     required
//                     className="input-field"
//                     placeholder="e.g., E-Commerce Platform"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Description</label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     required
//                     rows="3"
//                     className="input-field resize-none"
//                     placeholder="Describe your project..."
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
//                   <input
//                     type="text"
//                     name="technologies"
//                     value={formData.technologies}
//                     onChange={handleChange}
//                     className="input-field"
//                     placeholder="e.g., React, Node.js, MongoDB"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Category</label>
//                   <select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleChange}
//                     className="input-field"
//                   >
//                     {categories.map((cat) => (
//                       <option key={cat} value={cat}>{cat}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">GitHub Link</label>
//                   <input
//                     type="url"
//                     name="githubLink"
//                     value={formData.githubLink}
//                     onChange={handleChange}
//                     className="input-field"
//                     placeholder="https://github.com/..."
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Live Demo Link</label>
//                   <input
//                     type="url"
//                     name="liveLink"
//                     value={formData.liveLink}
//                     onChange={handleChange}
//                     className="input-field"
//                     placeholder="https://..."
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Image URL</label>
//                   <input
//                     type="url"
//                     name="image"
//                     value={formData.image}
//                     onChange={handleChange}
//                     className="input-field"
//                     placeholder="https://example.com/image.jpg"
//                   />
//                 </div>
//                 <div className="flex gap-4 pt-4">
//                   <button
//                     type="button"
//                     onClick={closeModal}
//                     className="flex-1 py-3 rounded-lg bg-secondary-dark border border-soft-blue/20 hover:bg-secondary-dark/80 transition-colors"
//                     disabled={saving}
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     type="submit" 
//                     className="flex-1 btn-primary"
//                     disabled={saving}
//                   >
//                     {saving ? 'Saving...' : (editingProject ? 'Update' : 'Add')}
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ManageProjects;



import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsAPI } from '../../services/api';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubLink: '',
    liveLink: '',
    image: '',
    category: 'Web Development',
  });
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const categories = [' Frontend development', 'web App', 'API', 'Full Stack development' , 'Backend development' , 'others'];

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await projectsAPI.getProjects();
      console.log('Projects response:', res.data);
      setProjects(res.data || []);
    } catch (err) {
      console.error('Error loading projects:', err);
      console.error('Error response:', err.response?.data);
      setError('Failed to load projects. Make sure backend is running on port 3030.');
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('technologies', formData.technologies);
      formDataToSend.append('githubLink', formData.githubLink);
      formDataToSend.append('liveLink', formData.liveLink);
      formDataToSend.append('category', formData.category);
      
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }
      
      if (editingProject) {
        await projectsAPI.updateProject(editingProject._id, formDataToSend);
        showSuccess('Project updated successfully!');
      } else {
        await projectsAPI.createProject(formDataToSend);
        showSuccess('Project added successfully!');
      }
      await loadProjects();
      closeModal();
    } catch (err) {
      console.error('Error saving project:', err);
      alert('Failed to save project. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      technologies: project.technologies?.join(', ') || '',
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
      image: project.image || '',
      category: project.category || 'Web Development',
    });
    if (project.image) {
      setImagePreview(project.image);
    }
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.deleteProject(id);
        await loadProjects();
        showSuccess('Project deleted successfully!');
      } catch (err) {
        console.error('Error deleting project:', err);
        alert('Failed to delete project.');
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      technologies: '',
      githubLink: '',
      liveLink: '',
      image: '',
      category: 'Web Development',
    });
    setImagePreview('');
    setImageFile(null);
  };

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      technologies: '',
      githubLink: '',
      liveLink: '',
      image: '',
      category: 'Web Development',
    });
    setImagePreview('');
    setImageFile(null);
    setShowModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent mb-3">
              Manage Projects
            </h1>
            <p className="text-light-gray/70 text-lg">
              Add, edit, or remove your projects
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openAddModal}
            className="btn-primary flex items-center gap-2 px-6 py-3 text-base shadow-lg shadow-accent/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Project
          </motion.button>
        </div>
        
        {/* Projects Count Badge */}
        {!loading && projects.length > 0 && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">
            <span className="font-semibold">{projects.length}</span>
            <span>Total Projects</span>
          </div>
        )}
      </motion.div>

      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 flex items-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p>{successMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400"
        >
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>{error}</p>
            </div>
            <button onClick={loadProjects} className="text-sm underline hover:no-underline">
              Try Again →
            </button>
          </div>
        </motion.div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-accent/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-6 text-light-gray/60">Loading projects...</p>
        </div>
      ) : (
        <>
          {/* Projects Grid */}
          {projects.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 group"
                  >
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-accent/30 to-soft-blue/30">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-7xl">🚀</span>
                        </div>
                      )}
                      {/* Category Badge Overlay */}
                      <span className="absolute top-3 right-3 text-xs px-3 py-1.5 rounded-full bg-accent/90 text-white font-medium shadow-lg backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                    
                    {/* Project Content */}
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-2 line-clamp-1 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-light-gray/70 text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.technologies?.slice(0, 4).map((tech, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-full bg-secondary-dark/80 text-light-gray/80">
                            {tech}
                          </span>
                        ))}
                        {project.technologies?.length > 4 && (
                          <span className="text-xs px-2 py-1 rounded-full bg-secondary-dark/80 text-light-gray/80">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleEdit(project)}
                          className="flex-1 py-2.5 rounded-xl bg-accent/20 text-accent hover:bg-accent/30 transition-all duration-200 font-medium flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleDelete(project._id)}
                          className="flex-1 py-2.5 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all duration-200 font-medium flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-12 text-center"
            >
              <div className="text-8xl mb-6">🚀</div>
              <h3 className="text-2xl font-semibold mb-3">No Projects Yet</h3>
              <p className="text-light-gray/60 mb-6 max-w-md mx-auto">
                Start adding your projects to showcase your work, skills, and achievements.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openAddModal}
                className="btn-primary inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Your First Project
              </motion.button>
            </motion.div>
          )}
        </>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-light-gray/80">
                    Project Title <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="input-field w-full px-4 py-3 rounded-xl bg-secondary-dark/50 border border-soft-blue/30 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
                    placeholder="e.g., E-Commerce Platform"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-light-gray/80">
                    Description <span className="text-accent">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="input-field w-full px-4 py-3 rounded-xl bg-secondary-dark/50 border border-soft-blue/30 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 resize-none"
                    placeholder="Describe your project..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-light-gray/80">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleChange}
                    className="input-field w-full px-4 py-3 rounded-xl bg-secondary-dark/50 border border-soft-blue/30 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
                    placeholder="e.g., React, Node.js, MongoDB"
                  />
                  <p className="mt-1 text-xs text-light-gray/50">
                    Separate multiple technologies with commas
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-light-gray/80">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input-field w-full px-4 py-3 rounded-xl bg-secondary-dark/50 border border-soft-blue/30 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-light-gray/80">
                    GitHub Link
                  </label>
                  <input
                    type="url"
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleChange}
                    className="input-field w-full px-4 py-3 rounded-xl bg-secondary-dark/50 border border-soft-blue/30 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-light-gray/80">
                    Live Demo Link
                  </label>
                  <input
                    type="url"
                    name="liveLink"
                    value={formData.liveLink}
                    onChange={handleChange}
                    className="input-field w-full px-4 py-3 rounded-xl bg-secondary-dark/50 border border-soft-blue/30 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-light-gray/80">
                    Project Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="input-field w-full px-4 py-3 rounded-xl bg-secondary-dark/50 border border-soft-blue/30 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-accent/20 file:text-accent hover:file:bg-accent/30"
                  />
                  {imagePreview && (
                    <div className="mt-2 rounded-lg overflow-hidden h-24 w-24 border border-soft-blue/30 shadow-lg">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-3 rounded-xl bg-secondary-dark border border-soft-blue/30 hover:bg-secondary-dark/80 transition-all duration-200 font-medium"
                    disabled={saving}
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 btn-primary py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      editingProject ? 'Update Project' : 'Add Project'
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageProjects;