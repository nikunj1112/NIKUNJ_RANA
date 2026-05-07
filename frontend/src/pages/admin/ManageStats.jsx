// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { statsAPI } from '../../services/api';

// const ManageStats = () => {
//   const [stats, setStats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [editingStat, setEditingStat] = useState(null);
//   const [formData, setFormData] = useState({
//     label: '',
//     value: '',
//     order: '',
//   });
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     loadStats();
//   }, []);

//   const loadStats = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await statsAPI.getStats();
//       setStats(res.data || []);
//     } catch (err) {
//       console.error('Error loading stats:', err);
//       setError('Failed to load stats. Make sure backend is running on port 3030.');
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
//       if (editingStat) {
//         await statsAPI.updateStats(editingStat._id, formData);
//       } else {
//         await statsAPI.createStats(formData);
//       }
//       await loadStats();
//       closeModal();
//     } catch (err) {
//       console.error('Error saving stat:', err);
//       alert('Failed to save stat. Please try again.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleEdit = (stat) => {
//     setEditingStat(stat);
//     setFormData({
//       label: stat.label || '',
//       value: stat.value || '',
//       order: stat.order || '',
//     });
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this stat?')) {
//       try {
//         await statsAPI.deleteStats(id);
//         await loadStats();
//       } catch (err) {
//         console.error('Error deleting stat:', err);
//         alert('Failed to delete stat.');
//       }
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setEditingStat(null);
//     setFormData({ label: '', value: '', order: '' });
//   };

//   const openAddModal = () => {
//     setEditingStat(null);
//     setFormData({ label: '', value: '', order: '' });
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
//           <h1 className="text-3xl font-bold mb-2">Manage Stats</h1>
//           <p className="text-light-gray/70">Add, edit, or remove your portfolio statistics</p>
//         </div>
//         <button onClick={openAddModal} className="btn-primary">
//           + Add Stat
//         </button>
//       </motion.div>

//       {/* Error Message */}
//       {error && (
//         <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
//           <p>{error}</p>
//           <button onClick={loadStats} className="mt-2 text-sm underline">
//             Try Again
//           </button>
//         </div>
//       )}

//       {loading ? (
//         <div className="flex justify-center py-12">
//           <div className="loader" />
//         </div>
//       ) : (
//         <>
//           <div className="overflow-x-auto">
//             <table className="w-full bg-secondary-dark/50 border border-soft-blue/30 rounded-xl">
//               <thead>
//                 <tr className="border-b border-soft-blue/20">
//                   <th className="p-4 text-left font-semibold text-light-gray/80">Label</th>
//                   <th className="p-4 text-left font-semibold text-light-gray/80">Value</th>
//                   <th className="p-4 text-left font-semibold text-light-gray/80">Order</th>
//                   <th className="p-4 text-right font-semibold text-light-gray/80">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <AnimatePresence>
//                   {stats.map((stat) => (
//                     <motion.tr
//                       key={stat._id}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 20 }}
//                       className="border-b border-soft-blue/10 hover:bg-secondary-dark/70 transition-colors"
//                     >
//                       <td className="p-4 font-medium">{stat.label}</td>
//                       <td className="p-4 font-bold text-accent">{stat.value}</td>
//                       <td className="p-4">{stat.order}</td>
//                       <td className="p-4">
//                         <div className="flex gap-2 justify-end">
//                           <button
//                             onClick={() => handleEdit(stat)}
//                             className="px-4 py-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors text-sm"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(stat._id)}
//                             className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-sm"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </AnimatePresence>
//               </tbody>
//             </table>
//           </div>

//           {stats.length === 0 && !loading && !error && (
//             <div className="text-center py-16 text-light-gray/50">
//               <div className="text-6xl mb-4">📊</div>
//               No stats added yet. Click "Add Stat" to get started.
//             </div>
//           )}
//         </>
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
//                 {editingStat ? 'Edit Stat' : 'Add New Stat'}
//               </h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Label *</label>
//                   <input
//                     type="text"
//                     name="label"
//                     value={formData.label}
//                     onChange={handleChange}
//                     required
//                     className="input-field"
//                     placeholder="e.g., Projects Completed"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Value *</label>
//                   <input
//                     type="text"
//                     name="value"
//                     value={formData.value}
//                     onChange={handleChange}
//                     required
//                     className="input-field"
//                     placeholder="e.g., 25+"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Order</label>
//                   <input
//                     type="number"
//                     name="order"
//                     value={formData.order}
//                     onChange={handleChange}
//                     min="0"
//                     className="input-field"
//                     placeholder="0"
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
//                     {saving ? 'Saving...' : (editingStat ? 'Update' : 'Add')}
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

// export default ManageStats;





import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { statsAPI } from '../../services/api';

const ManageStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingStat, setEditingStat] = useState(null);
  const [formData, setFormData] = useState({
    label: '',
    value: '',
    order: '',
  });
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await statsAPI.getStats();
      setStats(res.data || []);
    } catch (err) {
      console.error('Error loading stats:', err);
      setError('Failed to load stats. Make sure backend is running on port 3030.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingStat) {
        await statsAPI.updateStats(editingStat._id, formData);
        showSuccess('Stat updated successfully!');
      } else {
        await statsAPI.createStats(formData);
        showSuccess('Stat added successfully!');
      }
      await loadStats();
      closeModal();
    } catch (err) {
      console.error('Error saving stat:', err);
      alert('Failed to save stat. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (stat) => {
    setEditingStat(stat);
    setFormData({
      label: stat.label || '',
      value: stat.value || '',
      order: stat.order || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this stat?')) {
      try {
        await statsAPI.deleteStats(id);
        await loadStats();
        showSuccess('Stat deleted successfully!');
      } catch (err) {
        console.error('Error deleting stat:', err);
        alert('Failed to delete stat.');
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingStat(null);
    setFormData({ label: '', value: '', order: '' });
  };

  const openAddModal = () => {
    setEditingStat(null);
    setFormData({ label: '', value: '', order: '' });
    setShowModal(true);
  };

  // Sort stats by order
  const sortedStats = [...stats].sort((a, b) => (a.order || 0) - (b.order || 0));

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
              Manage Stats
            </h1>
            <p className="text-light-gray/70 text-lg">
              Add, edit, or remove your portfolio statistics
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
            Add New Stat
          </motion.button>
        </div>
        
        {/* Stats Count Badge */}
        {!loading && stats.length > 0 && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">
            <span className="font-semibold">{stats.length}</span>
            <span>Total Statistics</span>
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
            <button onClick={loadStats} className="text-sm underline hover:no-underline">
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
          <p className="mt-6 text-light-gray/60">Loading statistics...</p>
        </div>
      ) : (
        <>
          {/* Stats Grid/Table View */}
          {stats.length > 0 ? (
            <div className="glass rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary-dark/80 border-b border-soft-blue/20">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-light-gray/80 uppercase tracking-wider">
                        Label
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-light-gray/80 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-light-gray/80 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-light-gray/80 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence mode="wait">
                      {sortedStats.map((stat, index) => (
                        <motion.tr
                          key={stat._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-soft-blue/10 hover:bg-secondary-dark/50 transition-all duration-200 group"
                        >
                          <td className="px-6 py-4">
                            <span className="font-medium text-light-gray">{stat.label}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent font-bold text-lg">
                              {stat.value}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-soft-blue/10 text-light-gray/70 text-sm font-mono">
                              {stat.order || '—'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-3 justify-end">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleEdit(stat)}
                                className="p-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-all duration-200 group-hover:shadow-lg"
                                title="Edit"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDelete(stat._id)}
                                className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all duration-200 group-hover:shadow-lg"
                                title="Delete"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-soft-blue/10">
                <AnimatePresence mode="wait">
                  {sortedStats.map((stat, index) => (
                    <motion.div
                      key={stat._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 hover:bg-secondary-dark/50 transition-all duration-200"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-light-gray text-lg">{stat.label}</h3>
                          <p className="text-accent font-bold text-2xl mt-1">{stat.value}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(stat)}
                            className="p-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(stat._id)}
                            className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-light-gray/50">
                        <span>Order:</span>
                        <span className="font-mono bg-soft-blue/10 px-2 py-1 rounded">
                          {stat.order || 'Not set'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-12 text-center"
            >
              <div className="text-8xl mb-6">📊</div>
              <h3 className="text-2xl font-semibold mb-3">No Statistics Yet</h3>
              <p className="text-light-gray/60 mb-6 max-w-md mx-auto">
                Start adding your portfolio statistics to showcase your achievements, projects, and skills.
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
                Add Your First Stat
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
              className="glass rounded-2xl p-6 w-full max-w-md relative shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
                  {editingStat ? 'Edit Stat' : 'Add New Stat'}
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
                    Label <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="label"
                    value={formData.label}
                    onChange={handleChange}
                    required
                    className="input-field w-full px-4 py-3 rounded-xl bg-secondary-dark/50 border border-soft-blue/30 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
                    placeholder="e.g., Projects Completed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-light-gray/80">
                    Value <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    required
                    className="input-field w-full px-4 py-3 rounded-xl bg-secondary-dark/50 border border-soft-blue/30 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
                    placeholder="e.g., 25+"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-light-gray/80">
                    Order
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    min="0"
                    className="input-field w-full px-4 py-3 rounded-xl bg-secondary-dark/50 border border-soft-blue/30 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
                    placeholder="0"
                  />
                  <p className="mt-1 text-xs text-light-gray/50">
                    Lower numbers appear first in the list
                  </p>
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
                      editingStat ? 'Update Stat' : 'Add Stat'
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

export default ManageStats;