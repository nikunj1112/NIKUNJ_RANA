// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { messagesAPI } from '../../services/api';

// const ManageMessages = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     loadMessages();
//   }, []);

//   const loadMessages = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await messagesAPI.getMessages();
//       console.log('Messages response:', res.data);
//       setMessages(res.data || []);
//     } catch (err) {
//       console.error('Error loading messages:', err);
//       console.error('Error response:', err.response?.data);
//       setError('Failed to load messages. Make sure backend is running on port 3030.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this message?')) {
//       try {
//         await messagesAPI.deleteMessage(id);
//         await loadMessages();
//       } catch (err) {
//         console.error('Error deleting message:', err);
//         alert('Failed to delete message.');
//       }
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
//     <div>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mb-8"
//       >
//         <h1 className="text-3xl font-bold mb-2">Manage Messages</h1>
//         <p className="text-light-gray/70">View and manage contact form submissions</p>
//       </motion.div>

//       {error && (
//         <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
//           <p>{error}</p>
//           <button onClick={loadMessages} className="mt-2 text-sm underline">
//             Try Again
//           </button>
//         </div>
//       )}

//       {loading ? (
//         <div className="flex justify-center py-12">
//           <div className="loader" />
//         </div>
//       ) : messages.length === 0 ? (
//         <div className="text-center py-12 text-light-gray/50">
//           No messages yet. When someone contacts you, they'll appear here.
//         </div>
//       ) : (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="space-y-4"
//         >
//           <AnimatePresence>
//             {messages.map((message) => (
//               <motion.div
//                 key={message._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 className="glass rounded-xl p-6"
//               >
//                 <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-3 mb-3">
//                       <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
//                         <span className="text-lg">👤</span>
//                       </div>
//                       <div>
//                         <h3 className="font-bold">{message.name}</h3>
//                         <p className="text-sm text-light-gray/70">{message.email}</p>
//                       </div>
//                       <span className="text-xs text-light-gray/50 ml-auto">
//                         {formatDate(message.createdAt)}
//                       </span>
//                     </div>
//                     <p className="text-light-gray/80">{message.message}</p>
//                   </div>
//                   <button
//                     onClick={() => handleDelete(message._id)}
//                     className="py-2 px-4 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors self-start"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default ManageMessages;



import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { messagesAPI } from '../../services/api';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await messagesAPI.getMessages();
      console.log('Messages response:', res.data);
      setMessages(res.data || []);
    } catch (err) {
      console.error('Error loading messages:', err);
      console.error('Error response:', err.response?.data);
      setError('Failed to load messages. Make sure backend is running on port 3030.');
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await messagesAPI.deleteMessage(id);
        await loadMessages();
        showSuccess('Message deleted successfully!');
      } catch (err) {
        console.error('Error deleting message:', err);
        alert('Failed to delete message.');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Sort messages by newest first
  const sortedMessages = [...messages].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent mb-3">
          Manage Messages
        </h1>
        <p className="text-light-gray/70 text-lg">
          View and manage contact form submissions
        </p>
        {!loading && messages.length > 0 && (
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">
            <span className="font-semibold">{messages.length}</span>
            <span>Total Messages</span>
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
            <button onClick={loadMessages} className="text-sm underline hover:no-underline">
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
          <p className="mt-6 text-light-gray/60">Loading messages...</p>
        </div>
      ) : messages.length === 0 ? (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-12 text-center"
        >
          <div className="text-8xl mb-6">📬</div>
          <h3 className="text-2xl font-semibold mb-3">No Messages Yet</h3>
          <p className="text-light-gray/60 max-w-md mx-auto">
            When someone contacts you through your portfolio's contact form, their messages will appear here.
          </p>
        </motion.div>
      ) : (
        /* Messages List */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-5"
        >
          <AnimatePresence mode="popLayout">
            {sortedMessages.map((message, index) => (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    {/* Message Content */}
                    <div className="flex-1">
                      {/* Header with Avatar and Info */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/30 to-soft-blue/30 flex items-center justify-center text-xl font-bold">
                          {message.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{message.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-light-gray/60">
                            <a 
                              href={`mailto:${message.email}`} 
                              className="hover:text-accent transition-colors"
                            >
                              {message.email}
                            </a>
                            <span>•</span>
                            <span>{formatDate(message.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Message Body */}
                      <div className="bg-secondary-dark/30 rounded-xl p-4 border border-soft-blue/10">
                        <p className="text-light-gray/80 leading-relaxed whitespace-pre-wrap">
                          {message.message}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex md:flex-col gap-2">
                      {/* Reply Button */}
                      <a
                        href={`mailto:${message.email}?subject=Re: Your message from portfolio`}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-accent/20 text-accent hover:bg-accent/30 transition-all duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Reply
                      </a>
                      
                      {/* Delete Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDelete(message._id)}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default ManageMessages;