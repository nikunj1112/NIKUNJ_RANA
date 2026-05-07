// import { useState, useEffect } from 'react';
// import { certificateAPI } from '../../services/api.js';

// const Certificates = () => {
//   const [certificates, setCertificates] = useState([]);
//   const [formData, setFormData] = useState({
//     title: '',
//     organization: '',
//     issueDate: '',
//     credentialId: '',
//     certificateLink: '',
//     image: '',
//     description: ''
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     loadCertificates();
//   }, []);

//   const loadCertificates = async () => {
//     try {
//       const response = await certificateAPI.getCertificates();
//       setCertificates(response.data || []);
//     } catch (error) {
//       console.error('Error loading certificates:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       if (editingId) {
//         await certificateAPI.updateCertificate(editingId, formData);
//       } else {
//         await certificateAPI.createCertificate(formData);
//       }
//       setFormData({
//         title: '',
//         organization: '',
//         issueDate: '',
//         credentialId: '',
//         certificateLink: '',
//         image: '',
//         description: ''
//       });
//       setEditingId(null);
//       loadCertificates();
//     } catch (error) {
//       console.error('Error saving certificate:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (certificate) => {
//     setFormData({
//       title: certificate.title,
//       organization: certificate.organization,
//       issueDate: certificate.issueDate.split('T')[0],
//       credentialId: certificate.credentialId || '',
//       certificateLink: certificate.certificateLink || '',
//       image: certificate.image || '',
//       description: certificate.description || ''
//     });
//     setEditingId(certificate._id);
//   };

//   const handleDelete = async (id) => {
//     if (confirm('Are you sure you want to delete this certificate?')) {
//       try {
//         await certificateAPI.deleteCertificate(id);
//         loadCertificates();
//       } catch (error) {
//         console.error('Error deleting certificate:', error);
//       }
//     }
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold">Certificates Management</h1>
//         <button
//           onClick={() => {
//             setFormData({
//               title: '',
//               organization: '',
//               issueDate: '',
//               credentialId: '',
//               certificateLink: '',
//               image: '',
//               description: ''
//             });
//             setEditingId(null);
//           }}
//           className="px-6 py-2 bg-accent text-white rounded-xl hover:bg-opacity-90 transition-all font-semibold"
//         >
//           {editingId ? 'Cancel Edit' : 'Add New Certificate'}
//         </button>
//       </div>

//       {/* Form */}
//       <div className="glass p-8 rounded-2xl">
//         <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Certificate' : 'Add Certificate'}</h2>
//         <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium mb-2 text-light-gray">Title *</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               className="input-field w-full"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2 text-light-gray">Organization *</label>
//             <input
//               type="text"
//               name="organization"
//               value={formData.organization}
//               onChange={handleInputChange}
//               className="input-field w-full"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2 text-light-gray">Issue Date *</label>
//             <input
//               type="date"
//               name="issueDate"
//               value={formData.issueDate}
//               onChange={handleInputChange}
//               className="input-field w-full"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2 text-light-gray">Credential ID</label>
//             <input
//               type="text"
//               name="credentialId"
//               value={formData.credentialId}
//               onChange={handleInputChange}
//               className="input-field w-full"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2 text-light-gray">Certificate Link</label>
//             <input
//               type="url"
//               name="certificateLink"
//               value={formData.certificateLink}
//               onChange={handleInputChange}
//               className="input-field w-full"
//               placeholder="https://credentials.example.com"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2 text-light-gray">Image URL</label>
//             <input
//               type="url"
//               name="image"
//               value={formData.image}
//               onChange={handleInputChange}
//               className="input-field w-full"
//               placeholder="https://example.com/cert-image.jpg"
//             />
//           </div>
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium mb-2 text-light-gray">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               rows="3"
//               className="input-field w-full resize-vertical"
//               placeholder="Brief description of the certificate..."
//             />
//           </div>
//           <div className="md:col-span-2 flex gap-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 bg-accent text-white py-3 px-6 rounded-xl font-bold hover:bg-opacity-90 transition-all disabled:opacity-50"
//             >
//               {loading ? 'Saving...' : editingId ? 'Update Certificate' : 'Add Certificate'}
//             </button>
//             {editingId && (
//               <button
//                 type="button"
//                 onClick={() => setEditingId(null)}
//                 className="flex-1 bg-secondary-dark text-light-gray py-3 px-6 rounded-xl font-bold hover:bg-accent transition-all"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       {/* Certificates List */}
//       <div>
//         <h2 className="text-2xl font-bold mb-6">Certificates ({certificates.length})</h2>
//         {certificates.length === 0 ? (
//           <div className="glass p-12 rounded-2xl text-center">
//             <div className="text-6xl mb-6">🏆</div>
//             <h3 className="text-2xl font-bold text-light-gray/50 mb-2">No certificates yet</h3>
//             <p className="text-light-gray/60">Add your first certificate using the form above</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {certificates.map((cert) => (
//               <div key={cert._id} className="glass p-6 rounded-2xl hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 group h-[280px] flex flex-col">
//                 <div className="flex-1">
//                   <h3 className="font-bold text-lg mb-2 line-clamp-2">{cert.title}</h3>
//                   <div className="flex items-center gap-2 mb-3">
//                     <div className="bg-accent/20 px-3 py-1 rounded-lg text-accent text-sm font-bold">
//                       {cert.organization}
//                     </div>
//                     <span className="text-sm font-mono text-light-gray/70">
//                       {new Date(cert.issueDate).getFullYear()}
//                     </span>
//                   </div>
//                   {cert.description && (
//                     <p className="text-light-gray/70 text-sm line-clamp-3 mb-4">
//                       {cert.description}
//                     </p>
//                   )}
//                   {cert.credentialId && (
//                     <div className="text-xs text-light-gray/50 mb-2">
//                       ID: <span className="font-mono">{cert.credentialId}</span>
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-all">
//                   <button
//                     onClick={() => handleEdit(cert)}
//                     className="flex-1 bg-accent/10 hover:bg-accent text-accent hover:text-white py-2 px-3 rounded-lg text-sm font-medium transition-all"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(cert._id)}
//                     className="flex-1 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-2 px-3 rounded-lg text-sm font-medium transition-all"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Certificates;




import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificateAPI } from '../../services/api.js';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    issueDate: '',
    credentialId: '',
    certificateLink: '',
    image: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    loadCertificates();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadCertificates = async () => {
    try {
      const response = await certificateAPI.getCertificates();
      setCertificates(response.data || []);
    } catch (error) {
      console.error('Error loading certificates:', error);
      showToast('Failed to load certificates', 'error');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (3MB)
      if (file.size > 3 * 1024 * 1024) {
        showToast('Image size must be less than 3MB', 'error');
        return;
      }
      // Check image type
      if (!file.type.startsWith('image/')) {
        showToast('Please select an image file', 'error');
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

  const validateForm = () => {
    if (!formData.title.trim()) {
      showToast('Title is required', 'error');
      return false;
    }
    if (!formData.organization.trim()) {
      showToast('Organization is required', 'error');
      return false;
    }
    if (!formData.issueDate) {
      showToast('Issue date is required', 'error');
      return false;
    }
    if (formData.certificateLink && !formData.certificateLink.match(/^https?:\/\/.+/)) {
      showToast('Please enter a valid certificate link', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('organization', formData.organization);
      formDataToSend.append('issueDate', formData.issueDate);
      formDataToSend.append('credentialId', formData.credentialId);
      formDataToSend.append('certificateLink', formData.certificateLink);
      formDataToSend.append('description', formData.description);
      
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }
      
      if (editingId) {
        await certificateAPI.updateCertificate(editingId, formDataToSend);
        showToast('Certificate updated successfully!', 'success');
      } else {
        await certificateAPI.createCertificate(formDataToSend);
        showToast('Certificate added successfully!', 'success');
      }
      resetForm();
      loadCertificates();
    } catch (error) {
      console.error('Error saving certificate:', error);
      showToast('Failed to save certificate', 'error');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      organization: '',
      issueDate: '',
      credentialId: '',
      certificateLink: '',
      image: '',
      description: ''
    });
    setEditingId(null);
    setImagePreview('');
    setImageFile(null);
  };

  const handleEdit = (certificate) => {
    setFormData({
      title: certificate.title,
      organization: certificate.organization,
      issueDate: certificate.issueDate.split('T')[0],
      credentialId: certificate.credentialId || '',
      certificateLink: certificate.certificateLink || '',
      image: certificate.image || '',
      description: certificate.description || ''
    });
    // Set image preview from existing image
    if (certificate.image) {
      setImagePreview(certificate.image);
    }
    setEditingId(certificate._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await certificateAPI.deleteCertificate(id);
      loadCertificates();
      showToast('Certificate deleted successfully!', 'success');
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting certificate:', error);
      showToast('Failed to delete certificate', 'error');
    }
  };

  // Filter certificates
  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.organization.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'recent') {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      return matchesSearch && new Date(cert.issueDate) >= oneYearAgo;
    }
    return matchesSearch;
  });

  // Toast component
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

  // Confirmation dialog
  const ConfirmDialog = ({ cert, onConfirm, onCancel }) => (
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
          <h3 className="text-xl font-bold mb-2">Delete Certificate</h3>
          <p className="text-light-gray/70 mb-4">
            Are you sure you want to delete <span className="text-accent font-semibold">{cert.title}</span>? 
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
              onClick={() => onConfirm(cert._id)}
              className="flex-1 py-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </motion.div>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Certificates <span className="gradient-text">Management</span>
            </h1>
            <p className="text-light-gray/70">
              Add, edit, or remove your professional certificates
            </p>
          </div>
          {/* <button
            onClick={() => {
              resetForm();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-primary px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-accent/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {editingId ? 'Cancel Edit' : 'Add New Certificate'}
          </button> */}
        </div>
      </motion.div>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6 md:p-8 mb-12 border border-white/10"
      >
        <h2 className="text-2xl font-bold mb-6 gradient-text">
          {editingId ? 'Edit Certificate' : 'Add New Certificate'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-light-gray">
                Title <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="input-field w-full"
                placeholder="e.g., Full Stack Web Development"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-light-gray">
                Organization <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                className="input-field w-full"
                placeholder="e.g., Coursera, Udemy, LinkedIn"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-light-gray">
                Issue Date <span className="text-accent">*</span>
              </label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleInputChange}
                className="input-field w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-light-gray">
                Credential ID
              </label>
              <input
                type="text"
                name="credentialId"
                value={formData.credentialId}
                onChange={handleInputChange}
                className="input-field w-full"
                placeholder="Optional: ID or code"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-light-gray">
                Certificate Link
              </label>
              <input
                type="url"
                name="certificateLink"
                value={formData.certificateLink}
                onChange={handleInputChange}
                className="input-field w-full"
                placeholder="https://credentials.example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-light-gray">
                Certificate Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="input-field w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-accent/20 file:text-accent hover:file:bg-accent/30"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img 
                    src={imagePreview} 
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg border-2 border-white/20 shadow-lg"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-light-gray">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="input-field w-full resize-none"
              placeholder="Brief description of the certificate..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary py-3 rounded-xl"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {editingId ? 'Updating...' : 'Adding...'}
                </span>
              ) : (
                editingId ? 'Update Certificate' : '+ Add New Certificate'
              )}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 py-3 rounded-xl glass hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </motion.div>

      {/* Certificates List */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold">
            All Certificates <span className="text-accent">({filteredCertificates.length})</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search by title or organization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-gray/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
            >
              <option value="all">All Certificates</option>
              <option value="recent">Last 12 Months</option>
            </select>
          </div>
        </div>

        {certificates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <div className="text-6xl mb-6">🏆</div>
            <h3 className="text-2xl font-bold text-light-gray/50 mb-2">No certificates yet</h3>
            <p className="text-light-gray/60">Add your first certificate using the form above</p>
          </motion.div>
        ) : filteredCertificates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <svg className="w-24 h-24 mx-auto mb-4 text-light-gray/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-light-gray/50 text-lg">No certificates match your search.</p>
            <button
              onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
              className="mt-4 text-accent hover:underline"
            >
              Clear filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredCertificates.map((cert) => (
                <motion.div
                  key={cert._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="group"
                >
                  <div className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 h-full flex flex-col">
                    {/* Image section if available */}
                    {cert.image && (
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark to-transparent" />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-3">
                        <span className="inline-block text-xs px-2 py-1 rounded-full bg-accent/20 text-accent mb-2">
                          {cert.organization}
                        </span>
                        <h3 className="font-bold text-lg line-clamp-2 group-hover:text-accent transition-colors">
                          {cert.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-light-gray/70 mb-3">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                      </div>

                      {cert.description && (
                        <p className="text-sm text-light-gray/60 mb-4 line-clamp-2">
                          {cert.description}
                        </p>
                      )}
                      
                      {cert.credentialId && (
                        <div className="text-xs text-light-gray/50 mb-3">
                          ID: <span className="font-mono">{cert.credentialId}</span>
                        </div>
                      )}

                      <div className="flex gap-2 mt-auto pt-4 border-t border-white/10">
                        <button
                          onClick={() => handleEdit(cert)}
                          className="flex-1 py-2 px-3 rounded-lg bg-accent/20 hover:bg-accent/30 text-accent transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(cert)}
                          className="flex-1 py-2 px-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {deleteConfirm && (
          <ConfirmDialog
            cert={deleteConfirm}
            onConfirm={handleDelete}
            onCancel={() => setDeleteConfirm(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certificates;