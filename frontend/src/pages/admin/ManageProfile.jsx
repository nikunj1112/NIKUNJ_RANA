// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { profileAPI } from '../../services/api';

// const ManageProfile = () => {
//   const [profile, setProfile] = useState({
//     name: '',
//     title: '',
//     about: '',
//     github: '',
//     linkedin: '',
//     email: '',
//     location: '',
//     resume: '',
//   });
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState('');
//   const [message, setMessage] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     loadProfile();
//   }, []);

//   const loadProfile = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await profileAPI.getProfile();
//       console.log('Profile data:', res.data);
//       if (res.data) {
//         setProfile({
//           name: res.data.name || '',
//           title: res.data.title || '',
//           about: res.data.about || '',
//           github: res.data.github || '',
//           linkedin: res.data.linkedin || '',
//           email: res.data.email || '',
//           location: res.data.location || '',
//           resume: res.data.resume || '',
//         });
//         setImagePreview(res.data.profileImage || '');
//       }
//     } catch (err) {
//       console.error('Error loading profile:', err);
//       setError('Failed to load profile. Make sure backend is running on port 3030.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith('image/')) {
//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//       setMessage(null);
//     } else {
//       setMessage({ type: 'error', text: 'Please select a valid image file (JPG, PNG, GIF)' });
//     }
//   };

//   const handleImageUpload = async () => {
//     if (!selectedFile) {
//       setMessage({ type: 'error', text: 'Please select an image file first' });
//       return;
//     }

//     const formData = new FormData();
//     formData.append('profileImage', selectedFile);

//     try {
//       setUploadingImage(true);
//       setMessage(null);
//       const res = await profileAPI.uploadProfileImage(formData);
//       setProfile(prev => ({ ...prev, profileImage: res.data.profileImage }));
//       setSelectedFile(null);
//       setImagePreview(res.data.profileImage);
//       setMessage({ type: 'success', text: 'Profile image uploaded successfully!' });
//     } catch (err) {
//       console.error('Upload error:', err);
//       setMessage({ type: 'error', text: err.response?.data?.message || 'Upload failed. Please try again.' });
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     setMessage(null);
//     try {
//       await profileAPI.updateProfile(profile);
//       setMessage({ type: 'success', text: 'Profile updated successfully!' });
//     } catch (err) {
//       console.error('Error updating profile:', err);
//       setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="loader" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mb-8"
//       >
//         <h1 className="text-3xl font-bold mb-2">Manage Profile</h1>
//         <p className="text-light-gray/70">Update your profile information and upload profile image</p>
//       </motion.div>

//       {error && (
//         <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
//           <p>{error}</p>
//           <button onClick={loadProfile} className="mt-2 text-sm underline">
//             Try Again
//           </button>
//         </div>
//       )}

//       {/* Profile Image Upload Section */}
//       <motion.section
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//         className="glass rounded-xl p-6 mb-8"
//       >
//         <h3 className="text-xl font-bold mb-4">Profile Image</h3>
//         {message && (
//           <div className={`p-4 rounded-lg mb-4 ${
//             message.type === 'success' ? 'bg-green-500/20 text-green-400 border-green-500/50 border' : 'bg-red-500/20 text-red-400 border-red-500/50 border'
//           }`}>
//             {message.text}
//           </div>
//         )}
        
//         <div className="flex flex-col md:flex-row gap-6 items-start">
//           {/* Image Preview */}
//           <div className="flex-shrink-0">
//             <div className="w-48 h-48 rounded-full bg-gradient-to-br from-accent to-soft-blue flex items-center justify-center overflow-hidden border-4 border-white/20 mx-auto md:mx-0">
//               {imagePreview ? (
//                 <img 
//                   src={imagePreview} 
//                   alt="Profile preview"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="text-4xl font-bold text-primary-dark">
//                   {profile.name ? profile.name.charAt(0).toUpperCase() : 'N'}
//                 </span>
//               )}
//             </div>
//             {profile.profileImage && (
//               <p className="text-xs text-light-gray/60 mt-2 text-center">
//                 Current: {profile.profileImage.split('/').pop()}
//               </p>
//             )}
//           </div>

//           {/* Upload Controls */}
//           <div className="flex-1 space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-2">Choose New Image</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="input-field file-input"
//                 disabled={uploadingImage}
//               />
//             </div>
//             <motion.button
//               type="button"
//               onClick={handleImageUpload}
//               disabled={!selectedFile || uploadingImage}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {uploadingImage ? 'Uploading...' : 'Upload Profile Image'}
//             </motion.button>
//             <p className="text-xs text-light-gray/60">
//               Supported: JPG, PNG, GIF. Max 5MB. Replaces current image.
//             </p>
//           </div>
//         </div>
//       </motion.section>

//       {/* Profile Form */}
//       <motion.form
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         onSubmit={handleSubmit}
//         className="glass rounded-xl p-6 space-y-6"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium mb-2">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={profile.name || ''}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2">Title</label>
//             <input
//               type="text"
//               name="title"
//               value={profile.title || ''}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={profile.email || ''}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2">Location</label>
//             <input
//               type="text"
//               name="location"
//               value={profile.location || ''}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2">GitHub URL</label>
//             <input
//               type="url"
//               name="github"
//               value={profile.github || ''}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
//             <input
//               type="url"
//               name="linkedin"
//               value={profile.linkedin || ''}
//               onChange={handleChange}
//               className="input-field"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2">Resume URL</label>
//             <input
//               type="url"
//               name="resume"
//               value={profile.resume || ''}
//               onChange={handleChange}
//               className="input-field"
//               placeholder="https://example.com/resume.pdf"
//             />
//           </div>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium mb-2">About Description</label>
//           <textarea
//             name="about"
//             value={profile.about || ''}
//             onChange={handleChange}
//             rows="6"
//             className="input-field resize-none w-full"
//           />
//         </div>

//         <div className="flex justify-end">
//           <motion.button
//             type="submit"
//             disabled={saving}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className="btn-primary px-8 py-3 disabled:opacity-50"
//           >
//             {saving ? 'Saving...' : 'Save Changes'}
//           </motion.button>
//         </div>
//       </motion.form>
//     </div>
//   );
// };

// export default ManageProfile;



import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileAPI } from '../../services/api';

const ManageProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    about: '',
    github: '',
    linkedin: '',
    email: '',
    location: '',
    resume: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await profileAPI.getProfile();
      console.log('Profile data:', res.data);
      if (res.data) {
        setProfile({
          name: res.data.name || '',
          title: res.data.title || '',
          about: res.data.about || '',
          github: res.data.github || '',
          linkedin: res.data.linkedin || '',
          email: res.data.email || '',
          location: res.data.location || '',
          resume: res.data.resume || '',
        });
        setImagePreview(res.data.profileImage || '');
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('Failed to load profile. Make sure backend is running on port 3030.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setMessage(null);
    } else {
      setMessage({ type: 'error', text: 'Please select a valid image file (JPG, PNG, GIF)' });
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      setMessage({ type: 'error', text: 'Please select an image file first' });
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', selectedFile);

    try {
      setUploadingImage(true);
      setMessage(null);
      const res = await profileAPI.uploadProfileImage(formData);
      setProfile(prev => ({ ...prev, profileImage: res.data.profileImage }));
      setSelectedFile(null);
      setImagePreview(res.data.profileImage);
      setMessage({ type: 'success', text: 'Profile image uploaded successfully!' });
    } catch (err) {
      console.error('Upload error:', err);
      setMessage({ type: 'error', text: err.response?.data?.message || 'Upload failed. Please try again.' });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await profileAPI.updateProfile(profile);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      console.error('Error updating profile:', err);
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-accent/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-6 text-light-gray/60">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent mb-3">
          Manage  <span className="gradient-text">Profile</span>
        </h1>


        
        <p className="text-light-gray/70 text-lg">
          Update your profile information and upload profile image
        </p>
      </motion.div>

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
            <button onClick={loadProfile} className="text-sm underline hover:no-underline">
              Try Again →
            </button>
          </div>
        </motion.div>
      )}

      {/* Profile Image Upload Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6 md:p-8 mb-8 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-accent rounded-full"></div>
          <h2 className="text-2xl font-bold">Profile Image</h2>
        </div>

        {/* Message Alert */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${
                message.type === 'success' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/50'
              }`}
            >
              {message.type === 'success' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <p>{message.text}</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Image Preview */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-accent/30 to-soft-blue/30 flex items-center justify-center overflow-hidden border-4 border-white/20 shadow-xl">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-6xl font-bold text-accent">
                    {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                )}
              </div>
              {profile.profileImage && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-secondary-dark/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs text-light-gray/70 whitespace-nowrap">
                  Current
                </div>
              )}
            </div>
          </div>

          {/* Upload Controls */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-light-gray/80">
                Choose New Image
              </label>
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploadingImage}
                  className="flex-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-accent/20 file:text-accent hover:file:bg-accent/30 transition-all cursor-pointer"
                />
                <motion.button
                  type="button"
                  onClick={handleImageUpload}
                  disabled={!selectedFile || uploadingImage}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {uploadingImage ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Uploading...
                    </span>
                  ) : (
                    'Upload Image'
                  )}
                </motion.button>
              </div>
              <p className="text-xs text-light-gray/50 mt-2">
                Supported: JPG, PNG, GIF. Max 5MB. Replaces current image.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Profile Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="glass rounded-2xl p-6 md:p-8 space-y-8 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 bg-accent rounded-full"></div>
          <h2 className="text-2xl font-bold">Personal Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-light-gray/80">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={profile.name || ''}
              onChange={handleChange}
              className="input-field w-full px-4 py-3 rounded-xl bg-secondary-dark/50 border border-soft-blue/30 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
              placeholder="Your name"
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-light-gray/80">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Professional Title
            </label>
            <input
              type="text"
              name="title"
              value={profile.title || ''}
              onChange={handleChange}
              className="input-field w-full px-4 py-3 rounded-xl bg-secondary-dark/50 border border-soft-blue/30 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
              placeholder="e.g., Full Stack Developer"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-light-gray/80">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={profile.email || ''}
              onChange={handleChange}
              className="input-field w-full px-4 py-3 rounded-xl bg-secondary-dark/50 border border-soft-blue/30 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
              placeholder="you@example.com"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-light-gray/80">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Location
            </label>
            <input
              type="text"
              name="location"
              value={profile.location || ''}
              onChange={handleChange}
              className="input-field w-full px-4 py-3 rounded-xl bg-secondary-dark/50 border border-soft-blue/30 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
              placeholder="City, Country"
            />
          </div>

          {/* GitHub */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-light-gray/80">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub URL
            </label>
            <input
              type="url"
              name="github"
              value={profile.github || ''}
              onChange={handleChange}
              className="input-field w-full px-4 py-3 rounded-xl bg-secondary-dark/50 border border-soft-blue/30 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
              placeholder="https://github.com/username"
            />
          </div>

          {/* LinkedIn */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-light-gray/80">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z" />
              </svg>
              LinkedIn URL
            </label>
            <input
              type="url"
              name="linkedin"
              value={profile.linkedin || ''}
              onChange={handleChange}
              className="input-field w-full px-4 py-3 rounded-xl bg-secondary-dark/50 border border-soft-blue/30 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          {/* Resume URL */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-light-gray/80">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume URL
            </label>
            <input
              type="url"
              name="resume"
              value={profile.resume || ''}
              onChange={handleChange}
              className="input-field w-full px-4 py-3 rounded-xl bg-secondary-dark/50 border border-soft-blue/30 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
              placeholder="https://example.com/resume.pdf"
            />
          </div>
        </div>
        
        {/* About Section */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-light-gray/80">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            About Description
          </label>
          <textarea
            name="about"
            value={profile.about || ''}
            onChange={handleChange}
            rows="6"
            className="input-field w-full px-4 py-3 rounded-xl bg-secondary-dark/50 border border-soft-blue/30 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 resize-none"
            placeholder="Tell visitors about yourself, your skills, experience, and passion..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <motion.button
            type="submit"
            disabled={saving}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary px-8 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving Changes...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </>
            )}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default ManageProfile;