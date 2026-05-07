import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { educationAPI } from '../../services/api';

const ManageEducation = () => {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    startYear: '',
    endYear: '',
    description: '',
  });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadEducations();
  }, []);

  // Custom toast
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadEducations = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await educationAPI.getEducations();
      setEducations(res.data || []);
    } catch (err) {
      console.error('Error loading educations:', err);
      setError('Failed to load education records. Make sure backend is running on port 3030.');
      showToast('Failed to load education records', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.degree.trim()) {
      showToast('Degree is required', 'error');
      return false;
    }
    if (!formData.institution.trim()) {
      showToast('Institution is required', 'error');
      return false;
    }
    if (formData.startYear && !/^\d{4}$/.test(formData.startYear)) {
      showToast('Start year must be a 4-digit year', 'error');
      return false;
    }
    if (formData.endYear && !/^\d{4}$/.test(formData.endYear)) {
      showToast('End year must be a 4-digit year', 'error');
      return false;
    }
    if (formData.startYear && formData.endYear && parseInt(formData.startYear) > parseInt(formData.endYear)) {
      showToast('Start year cannot be after end year', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSaving(true);
    try {
      if (editingEducation) {
        await educationAPI.updateEducation(editingEducation._id, formData);
        showToast('Education updated successfully!', 'success');
      } else {
        await educationAPI.createEducation(formData);
        showToast('Education added successfully!', 'success');
      }
      await loadEducations();
      closeModal();
    } catch (err) {
      console.error('Error saving education:', err);
      showToast(err.response?.data?.message || 'Failed to save education', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (education) => {
    setEditingEducation(education);
    setFormData({
      degree: education.degree || '',
      institution: education.institution || '',
      startYear: education.startYear || '',
      endYear: education.endYear || '',
      description: education.description || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await educationAPI.deleteEducation(id);
      await loadEducations();
      showToast('Education deleted successfully!', 'success');
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Error deleting education:', err);
      showToast('Failed to delete education', 'error');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEducation(null);
    setFormData({ degree: '', institution: '', startYear: '', endYear: '', description: '' });
  };

  const openAddModal = () => {
    setEditingEducation(null);
    setFormData({ degree: '', institution: '', startYear: '', endYear: '', description: '' });
    setShowModal(true);
  };

  // Filtering logic
  const filteredEducations = educations.filter(edu => {
    const matchesSearch = edu.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          edu.institution.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (statusFilter === 'ongoing') {
      return !edu.endYear || edu.endYear === '';
    }
    if (statusFilter === 'completed') {
      return edu.endYear && edu.endYear !== '';
    }
    return true;
  });

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

  // Confirmation Dialog
  const ConfirmDialog = ({ education, onConfirm, onCancel }) => (
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
          <h3 className="text-xl font-bold mb-2">Delete Education Record</h3>
          <p className="text-light-gray/70 mb-4">
            Are you sure you want to delete <span className="text-accent font-semibold">{education.degree}</span> at <span className="text-accent font-semibold">{education.institution}</span>? 
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
              onClick={() => onConfirm(education._id)}
              className="flex-1 py-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  // Education Card Component
  const EducationCard = ({ education }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <div className="glass rounded-xl p-6 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 border border-white/10 hover:border-accent/50 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-bold text-lg group-hover:text-accent transition-colors">
                {education.degree}
              </h3>
            </div>
            <p className="text-light-gray/70 text-sm mb-2">{education.institution}</p>
            {(education.startYear || education.endYear) && (
              <div className="flex items-center gap-2 text-xs text-light-gray/60 mb-3">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>
                  {education.startYear} {education.startYear && education.endYear ? '-' : ''} {education.endYear}
                  {!education.endYear && education.startYear && ' - Present'}
                </span>
              </div>
            )}
          </div>
        </div>
        {education.description && (
          <p className="text-sm text-light-gray/60 mb-4 line-clamp-2">
            {education.description}
          </p>
        )}
        <div className="flex gap-2 mt-auto pt-2 border-t border-white/10">
          <button
            onClick={() => handleEdit(education)}
            className="flex-1 py-2 px-3 rounded-lg bg-accent/20 hover:bg-accent/30 text-accent transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button
            onClick={() => setDeleteConfirm(education)}
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
            <h1 className="text-4xl md:text-5xl font-bold mb-2 ">
              Manage <span className="gradient-text">Education</span>
            </h1>
            <p className="text-light-gray/70">
              Add, edit, or remove your academic and professional education records
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
            Add Education
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
                onClick={loadEducations}
                className="text-sm underline hover:no-underline"
              >
                Retry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Filter */}
      {!loading && educations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by degree or institution..."
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-accent transition-all cursor-pointer"
          >
            <option value="all">All Education</option>
            <option value="ongoing">Ongoing (Present)</option>
            <option value="completed">Completed</option>
          </select>
        </motion.div>
      )}

      {/* Education Grid */}
      {loading ? (
        <div className="flex flex-col justify-center items-center py-20">
          <div className="loader" />
          <p className="mt-4 text-light-gray/70">Loading education records...</p>
        </div>
      ) : (
        <>
          {filteredEducations.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredEducations.map((education) => (
                  <EducationCard key={education._id} education={education} />
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-light-gray/50 text-lg">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No education records match your filters.' 
                  : 'No education records added yet. Click "Add Education" to get started.'}
              </p>
              {(searchTerm || statusFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                  className="mt-4 text-accent hover:underline inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
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
                  {editingEducation ? 'Edit Education' : 'Add New Education'}
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
                    Degree / Certificate <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="e.g., Bachelor of Science in Information Technology"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Institution <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="e.g., Vidhyadeep University"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Year</label>
                    <input
                      type="text"
                      name="startYear"
                      value={formData.startYear}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="e.g., 2023"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">End Year</label>
                    <input
                      type="text"
                      name="endYear"
                      value={formData.endYear}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="e.g., 2026 (leave blank for ongoing)"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="input-field resize-none"
                    placeholder="Brief description of your education..."
                  />
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
                        {editingEducation ? 'Updating...' : 'Adding...'}
                      </span>
                    ) : (
                      editingEducation ? 'Update Education' : 'Add Education'
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
            education={deleteConfirm}
            onConfirm={handleDelete}
            onCancel={() => setDeleteConfirm(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageEducation;