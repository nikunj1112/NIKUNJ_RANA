// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { skillsAPI } from '../../services/api';

// const ManageSkills = () => {
//   const [skills, setSkills] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [editingSkill, setEditingSkill] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     icon: '',
//     category: 'Frontend',
//   });
//   const [saving, setSaving] = useState(false);

//   const categories = ['Frontend', 'Backend', 'Database', 'Tools'];

//   useEffect(() => {
//     loadSkills();
//   }, []);

//   const loadSkills = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await skillsAPI.getSkills();
//       console.log('Skills response:', res.data);
//       setSkills(res.data || []);
//     } catch (err) {
//       console.error('Error loading skills:', err);
//       console.error('Error response:', err.response?.data);
//       setError('Failed to load skills. Make sure backend is running on port 3030.');
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
//     try {
//       if (editingSkill) {
//         await skillsAPI.updateSkill(editingSkill._id, formData);
//       } else {
//         await skillsAPI.createSkill(formData);
//       }
//       await loadSkills();
//       closeModal();
//     } catch (err) {
//       console.error('Error saving skill:', err);
//       alert('Failed to save skill. Please try again.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleEdit = (skill) => {
//     setEditingSkill(skill);
//     setFormData({
//       name: skill.name,
//       icon: skill.icon || '',
//       category: skill.category || 'Frontend',
//     });
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this skill?')) {
//       try {
//         await skillsAPI.deleteSkill(id);
//         await loadSkills();
//       } catch (err) {
//         console.error('Error deleting skill:', err);
//         alert('Failed to delete skill.');
//       }
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setEditingSkill(null);
//     setFormData({ name: '', icon: '', category: 'Frontend' });
//   };

//   const openAddModal = () => {
//     setEditingSkill(null);
//     setFormData({ name: '', icon: '', category: 'Frontend' });
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
//           <h1 className="text-3xl font-bold mb-2">Manage Skills</h1>
//           <p className="text-light-gray/70">Add, edit, or remove your skills</p>
//         </div>
//         <button onClick={openAddModal} className="btn-primary">
//           + Add Skill
//         </button>
//       </motion.div>

//       {/* Error Message */}
//       {error && (
//         <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
//           <p>{error}</p>
//           <button
//             onClick={loadSkills}
//             className="mt-2 text-sm underline"
//           >
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
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
//         >
//           <AnimatePresence>
//             {skills.map((skill) => (
//               <motion.div
//                 key={skill._id}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 className="glass rounded-xl p-6"
//               >
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12  flex items-center justify-center overflow-hidden">
//                       {skill.icon ? (
//                         <img 
//                           src={skill.icon} 
//                           alt={skill.name} 
//                           className="w-full h-full object-contain p-1"
//                           onError={(e) => {
//                             e.target.style.display = 'none';
//                             e.target.nextSibling.style.display = 'block';
//                           }}
//                         />
//                       ) : null}
//                       <div className="text-2xl" style={{display: skill.icon ? 'none' : 'block'}}>
//                         💻
//                       </div>
//                     </div>
//                     <div>
//                       <h3 className="font-bold">{skill.name}</h3>
//                       <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">
//                         {skill.category}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => handleEdit(skill)}
//                     className="flex-1 py-2 px-4 rounded-lg bg-accent text-white/50 hover:bg-accent/30 transition-colors"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(skill._id)}
//                     className="flex-1 py-2 px-4 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       )}

//       {skills.length === 0 && !loading && !error && (
//         <div className="text-center py-12 text-light-gray/50">
//           No skills added yet. Click "Add Skill" to get started.
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
//               className="glass rounded-xl p-6 w-full max-w-md"
//             >
//               <h2 className="text-2xl font-bold mb-6">
//                 {editingSkill ? 'Edit Skill' : 'Add New Skill'}
//               </h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Skill Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     className="input-field"
//                     placeholder="e.g., React, Node.js"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Icon URL</label>
//                   <input
//                     type="url"
//                     name="icon"
//                     value={formData.icon}
//                     onChange={handleChange}
//                     className="input-field"
//                     placeholder="e.g., https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg"
//                     pattern="https?://.*"
//                   />
//                   <p className="text-xs text-light-gray/60 mt-1">Enter image URL (SVG/PNG). Leave empty for default icon.</p>
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
//                     {saving ? 'Saving...' : (editingSkill ? 'Update' : 'Add')}
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

// export default ManageSkills;


import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsAPI } from '../../services/api';

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    category: 'Frontend',
  });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [toast, setToast] = useState(null);

  const categories = ['Frontend', 'Backend', 'Database', 'Tools', 'Other'];

  useEffect(() => {
    loadSkills();
  }, []);

  // Custom toast function
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const loadSkills = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await skillsAPI.getSkills();
      console.log('Skills response:', res.data);
      setSkills(res.data || []);
    } catch (err) {
      console.error('Error loading skills:', err);
      console.error('Error response:', err.response?.data);
      setError('Failed to load skills. Make sure backend is running on port 3030.');
      showToast('Failed to load skills', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      showToast('Skill name is required', 'error');
      return false;
    }
    if (formData.icon && !formData.icon.match(/^https?:\/\/.+/)) {
      showToast('Please enter a valid URL starting with http:// or https://', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setSaving(true);
    
    try {
      const skillData = {
        name: formData.name,
        icon: formData.icon,
        category: formData.category,
      };
      
      if (editingSkill) {
        await skillsAPI.updateSkill(editingSkill._id, skillData);
        showToast('Skill updated successfully!', 'success');
      } else {
        await skillsAPI.createSkill(skillData);
        showToast('Skill added successfully!', 'success');
      }
      await loadSkills();
      closeModal();
    } catch (err) {
      console.error('Error saving skill:', err);
      showToast(err.response?.data?.message || 'Failed to save skill. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      icon: skill.icon || '',
      category: skill.category || 'Frontend',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await skillsAPI.deleteSkill(id);
      await loadSkills();
      showToast('Skill deleted successfully!', 'success');
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Error deleting skill:', err);
      showToast('Failed to delete skill.', 'error');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSkill(null);
    setFormData({ 
      name: '', 
      icon: '', 
      category: 'Frontend',
    });
  };

  const openAddModal = () => {
    setEditingSkill(null);
    setFormData({ 
      name: '', 
      icon: '', 
      category: 'Frontend',
    });
    setShowModal(true);
  };

  // Filter skills based on search and category (search only by name now)
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories from skills
  const uniqueCategories = ['All', ...new Set(skills.map(skill => skill.category))];

  // Toast Component
  const Toast = () => {
    if (!toast) return null;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
          toast.type === 'success' 
            ? 'bg-green-500/90 text-white' 
            : 'bg-red-500/90 text-white'
        } backdrop-blur-sm`}
      >
        {toast.message}
      </motion.div>
    );
  };

  // Confirmation Dialog Component
  const ConfirmDialog = ({ skill, onConfirm, onCancel }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass rounded-2xl p-6 max-w-md w-full mx-4 border border-red-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Delete Skill</h3>
          <p className="text-light-gray/70 mb-4">
            Are you sure you want to delete <span className="text-accent font-semibold">{skill.name}</span>? 
            This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-2 rounded-lg glass hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(skill._id)}
              className="flex-1 py-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  // Skill Card Component (without proficiency and description)
  const SkillCard = ({ skill }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <div className="glass rounded-xl p-6 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 border border-white/10 hover:border-accent/50">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-all duration-300">
              {skill.icon ? (
                <img 
                  src={skill.icon} 
                  alt={skill.name} 
                  className="w-10 h-10 object-contain p-1"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="text-3xl" style={{display: skill.icon ? 'none' : 'flex'}}>
                💻
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg group-hover:text-accent transition-colors">
                {skill.name}
              </h3>
              <span className="inline-block text-xs px-2 py-1 rounded-full bg-accent/20 text-accent mt-1">
                {skill.category}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2 border-t border-white/10">
          <button
            onClick={() => handleEdit(skill)}
            className="flex-1 py-2 px-3 rounded-lg bg-accent/20 hover:bg-accent/30 text-accent transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button
            onClick={() => setDeleteConfirm(skill)}
            className="flex-1 py-2 px-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen pb-12">
      {/* Custom Toast */}
      <AnimatePresence>
        <Toast />
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Manage <span className="gradient-text">Skills</span>
            </h1>
            <p className="text-light-gray/70">
              Add, edit, or remove your technical skills
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openAddModal}
            className="btn-primary px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-accent/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Skill
          </motion.button>
        </div>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 backdrop-blur-sm"
          >
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <p className="font-semibold mb-1">Connection Error</p>
                <p className="text-sm">{error}</p>
              </div>
              <button
                onClick={loadSkills}
                className="text-sm underline hover:no-underline"
              >
                Retry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Filter */}
      {!loading && skills.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search skills by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-gray/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-accent transition-all cursor-pointer"
          >
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </motion.div>
      )}

      {/* Skills Grid */}
      {loading ? (
        <div className="flex flex-col justify-center items-center py-20">
          <div className="loader" />
          <p className="mt-4 text-light-gray/70">Loading skills...</p>
        </div>
      ) : (
        <>
          {filteredSkills.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => (
                  <SkillCard key={skill._id} skill={skill} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <svg className="w-24 h-24 mx-auto mb-4 text-light-gray/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-light-gray/50 text-lg">
                {searchTerm || selectedCategory !== 'All' 
                  ? 'No skills match your filters.' 
                  : 'No skills added yet. Click "Add New Skill" to get started.'}
              </p>
              {(searchTerm || selectedCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="mt-4 text-accent hover:underline"
                >
                  Clear filters
                </button>
              )}
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold gradient-text">
                  {editingSkill ? 'Edit Skill' : 'Add New Skill'}
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
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Skill Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="e.g., React, Node.js, Python"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Icon URL</label>
                  <input
                    type="url"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg"
                  />
                  <p className="text-xs text-light-gray/60 mt-1">
                    Enter image URL (SVG/PNG). Leave empty for default icon.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input-field cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-3 rounded-xl glass hover:bg-white/10 transition-colors"
                    disabled={saving}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 btn-primary py-3 rounded-xl"
                    disabled={saving}
                  >
                    {saving ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {editingSkill ? 'Updating...' : 'Adding...'}
                      </span>
                    ) : (
                      editingSkill ? 'Update Skill' : 'Add Skill'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {deleteConfirm && (
          <ConfirmDialog
            skill={deleteConfirm}
            onConfirm={handleDelete}
            onCancel={() => setDeleteConfirm(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageSkills;