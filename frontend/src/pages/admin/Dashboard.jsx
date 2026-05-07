import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { profileAPI, skillsAPI, projectsAPI, messagesAPI, educationAPI, githubAPI } from '../../services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    skills: 0,
    projects: 0,
    messages: 0,
    githubStats: null,
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [skillsRes, projectsRes, messagesRes, educationRes, githubRes, profileRes] = await Promise.all([
        skillsAPI.getSkills(),
        projectsAPI.getProjects(),
        messagesAPI.getMessages(),
        educationAPI.getEducations(),
        githubAPI.getStats(),
        profileAPI.getProfile(),
      ]);
      const educations = educationRes.data || [];

      console.log('Dashboard Stats:', {
        skills: skillsRes.data,
        projects: projectsRes.data,
        messages: messagesRes.data,
        github: githubRes.data,
        profile: profileRes.data
      });

  setStats({
        skills: skillsRes.data?.length || 0,
        projects: projectsRes.data?.length || 0,
        messages: messagesRes.data?.length || 0,
        educations,
        githubStats: githubRes.data,
      });
      
      // Get recent projects (latest 3)
       setRecentProjects(projectsRes.data?.slice(0, 3) || []);
      
      // Get profile
      if (profileRes.data) {
        setProfile(profileRes.data);
      }
    } catch (err) {
      console.error('Error loading stats:', err);
      console.error('Error response:', err.response?.data);
      setError('Failed to load dashboard data. Please make sure the backend is running on port 3030.');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Skills', value: stats.skills, icon: '💼', color: 'from-blue-500 to-blue-600' },
    { label: 'Total Projects', value: stats.projects, icon: '🚀', color: 'from-purple-500 to-purple-600' },
    { label: 'Messages', value: stats.messages, icon: '💬', color: 'from-green-500 to-green-600' },
    { label: 'Education Records', value: stats.educations?.length || 0, icon: '🎓', color: 'from-indigo-500 to-indigo-600' },
    { label: 'GitHub Followers', value: stats.githubStats?.followers || 0, icon: '🐙', color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-4xl font-bold mb-2  ">
         Welcome <span className="gradient-text">  back, {profile?.name || 'Admin'}!</span>  👋
        </h1>
        <p className="text-light-gray/70">Here's what's happening with your portfolio today</p>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400"
        >
          <p>{error}</p>
          <button
            onClick={loadStats}
            className="mt-2 px-4 py-2 bg-red-500/30 rounded hover:bg-red-500/40"
          >
            Try Again
          </button>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-light-gray/70 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent Projects Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Recent Projects</h2>
          <Link
            to="/admin/projects"
            className="text-accent hover:text-accent/80 text-sm"
          >
            View All →
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="loader" />
          </div>
        ) : recentProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentProjects.map((project, index) => (
              <motion.div
                key={project._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="glass rounded-xl overflow-hidden"
              >
                <div className="h-32 bg-gradient-to-br from-accent/20 to-soft-blue/20 flex items-center justify-center">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl">🚀</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1 truncate">{project.title}</h3>
                  <p className="text-light-gray/70 text-sm line-clamp-2 mb-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies?.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded bg-secondary-dark">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="glass rounded-xl p-8 text-center">
            <p className="text-light-gray/70 mb-4">No projects yet. Start adding your work!</p>
            <Link
              to="/admin/projects"
              className="btn-primary inline-block"
            >
              + Add Your First Project
            </Link>
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/projects"
            className="glass rounded-xl p-6 hover:bg-accent/20 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h3 className="font-semibold">Add New Project</h3>
                <p className="text-light-gray/70 text-sm">Showcase your latest work</p>
              </div>
            </div>
          </Link>
          <Link
            to="/admin/skills"
            className="glass rounded-xl p-6 hover:bg-accent/20 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">💼</span>
              </div>
              <div>
                <h3 className="font-semibold">Manage Skills</h3>
                <p className="text-light-gray/70 text-sm">Update your skills</p>
              </div>
            </div>
          </Link>
          <Link
            to="/admin/education"
            className="glass rounded-xl p-6 hover:bg-accent/20 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h3 className="font-semibold">Manage Education</h3>
                <p className="text-light-gray/70 text-sm">Add your education records</p>
              </div>
            </div>
          </Link>
          <Link
            to="/admin/messages"
            className="glass rounded-xl p-6 hover:bg-accent/20 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <h3 className="font-semibold">View Messages</h3>
                <p className="text-light-gray/70 text-sm">{stats.messages} new messages</p>
              </div>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;




// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { profileAPI, skillsAPI, projectsAPI, messagesAPI, educationAPI, githubAPI } from '../../services/api';
// import { Link } from 'react-router-dom';

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     skills: 0,
//     projects: 0,
//     messages: 0,
//     githubStats: null,
//   });
//   const [recentProjects, setRecentProjects] = useState([]);
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     loadStats();
//   }, []);

//   const loadStats = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const [skillsRes, projectsRes, messagesRes, educationRes, githubRes, profileRes] = await Promise.all([
//         skillsAPI.getSkills(),
//         projectsAPI.getProjects(),
//         messagesAPI.getMessages(),
//         educationAPI.getEducations(),
//         githubAPI.getStats(),
//         profileAPI.getProfile(),
//       ]);
//       const educations = educationRes.data || [];

//       console.log('Dashboard Stats:', {
//         skills: skillsRes.data,
//         projects: projectsRes.data,
//         messages: messagesRes.data,
//         github: githubRes.data,
//         profile: profileRes.data
//       });

//       setStats({
//         skills: skillsRes.data?.length || 0,
//         projects: projectsRes.data?.length || 0,
//         messages: messagesRes.data?.length || 0,
//         educations,
//         githubStats: githubRes.data,
//       });
      
//       // Get recent projects (latest 3)
//       setRecentProjects(projectsRes.data?.slice(0, 3) || []);
      
//       // Get profile
//       if (profileRes.data) {
//         setProfile(profileRes.data);
//       }
//     } catch (err) {
//       console.error('Error loading stats:', err);
//       console.error('Error response:', err.response?.data);
//       setError('Failed to load dashboard data. Please make sure the backend is running on port 3030.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const statCards = [
//     { label: 'Total Skills', value: stats.skills, icon: '💼', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500/20' },
//     { label: 'Total Projects', value: stats.projects, icon: '🚀', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-500/20' },
//     { label: 'Messages', value: stats.messages, icon: '💬', color: 'from-green-500 to-green-600', bgColor: 'bg-green-500/20' },
//     { label: 'Education Records', value: stats.educations?.length || 0, icon: '🎓', color: 'from-indigo-500 to-indigo-600', bgColor: 'bg-indigo-500/20' },
//     { label: 'GitHub Followers', value: stats.githubStats?.followers || 0, icon: '🐙', color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-500/20' },
//   ];

//   // Loading skeleton
//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="animate-pulse space-y-8">
//           <div className="space-y-3">
//             <div className="h-8 bg-secondary-dark/50 rounded-lg w-1/3"></div>
//             <div className="h-4 bg-secondary-dark/50 rounded-lg w-1/2"></div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
//             {[...Array(5)].map((_, i) => (
//               <div key={i} className="glass rounded-xl p-6">
//                 <div className="h-12 w-12 bg-secondary-dark/50 rounded-lg mb-4"></div>
//                 <div className="h-8 bg-secondary-dark/50 rounded mb-2"></div>
//                 <div className="h-4 bg-secondary-dark/50 rounded w-2/3"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Welcome Banner */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mb-10"
//       >
//         <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent mb-3">
//           Welcome back, {profile?.name || 'Admin'}! 👋
//         </h1>
//         <p className="text-light-gray/70 text-lg">
//           Here's what's happening with your portfolio today
//         </p>
//       </motion.div>

//       {/* Error Message */}
//       <AnimatePresence>
//         {error && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400"
//           >
//             <div className="flex items-center justify-between flex-wrap gap-3">
//               <div className="flex items-center gap-3">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <p>{error}</p>
//               </div>
//               <button
//                 onClick={loadStats}
//                 className="px-4 py-2 bg-red-500/30 rounded-lg hover:bg-red-500/40 transition-colors text-sm"
//               >
//                 Try Again →
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
//         {statCards.map((stat, index) => (
//           <motion.div
//             key={stat.label}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="glass rounded-2xl p-6 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 group"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
//                 <span className="text-2xl">{stat.icon}</span>
//               </div>
//               <div className="text-3xl font-bold text-accent">{stat.value}</div>
//             </div>
//             <div className="text-light-gray/80 text-sm font-medium">{stat.label}</div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Recent Projects Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3 }}
//         className="mb-10"
//       >
//         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
//           <div>
//             <h2 className="text-2xl font-bold flex items-center gap-2">
//               <span className="w-1 h-6 bg-accent rounded-full"></span>
//               Your Recent Projects
//             </h2>
//             <p className="text-light-gray/60 text-sm mt-1">Latest additions to your portfolio</p>
//           </div>
//           <Link
//             to="/admin/projects"
//             className="text-accent hover:text-accent/80 text-sm font-medium inline-flex items-center gap-1 group"
//           >
//             View All Projects
//             <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </Link>
//         </div>
        
//         {recentProjects.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {recentProjects.map((project, index) => (
//               <motion.div
//                 key={project._id || index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 * index }}
//                 className="glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 group"
//               >
//                 <div className="relative h-40 bg-gradient-to-br from-accent/30 to-soft-blue/30 overflow-hidden">
//                   {project.image ? (
//                     <img 
//                       src={project.image} 
//                       alt={project.title} 
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center">
//                       <span className="text-6xl">🚀</span>
//                     </div>
//                   )}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>
//                 <div className="p-5">
//                   <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-accent transition-colors">
//                     {project.title}
//                   </h3>
//                   <p className="text-light-gray/70 text-sm mb-3 line-clamp-2">
//                     {project.description}
//                   </p>
//                   <div className="flex flex-wrap gap-2">
//                     {project.technologies?.slice(0, 3).map((tech, i) => (
//                       <span key={i} className="text-xs px-2 py-1 rounded-full bg-secondary-dark/80 text-light-gray/80">
//                         {tech}
//                       </span>
//                     ))}
//                     {project.technologies?.length > 3 && (
//                       <span className="text-xs px-2 py-1 rounded-full bg-secondary-dark/80 text-light-gray/80">
//                         +{project.technologies.length - 3}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="glass rounded-2xl p-10 text-center"
//           >
//             <div className="text-6xl mb-4">🚀</div>
//             <p className="text-light-gray/70 mb-5">No projects yet. Start showcasing your amazing work!</p>
//             <Link
//               to="/admin/projects"
//               className="btn-primary inline-flex items-center gap-2"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//               </svg>
//               Add Your First Project
//             </Link>
//           </motion.div>
//         )}
//       </motion.div>

//       {/* Quick Actions */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4 }}
//       >
//         <div className="flex items-center gap-2 mb-5">
//           <span className="w-1 h-6 bg-accent rounded-full"></span>
//           <h2 className="text-2xl font-bold">Quick Actions</h2>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//           <Link
//             to="/admin/projects"
//             className="glass rounded-2xl p-5 hover:bg-accent/10 transition-all duration-300 group hover:shadow-lg"
//           >
//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                 <span className="text-3xl">🚀</span>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg">Add Project</h3>
//                 <p className="text-light-gray/60 text-sm">Showcase your latest work</p>
//               </div>
//             </div>
//           </Link>
//           <Link
//             to="/admin/skills"
//             className="glass rounded-2xl p-5 hover:bg-accent/10 transition-all duration-300 group hover:shadow-lg"
//           >
//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                 <span className="text-3xl">💼</span>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg">Manage Skills</h3>
//                 <p className="text-light-gray/60 text-sm">Update your skillset</p>
//               </div>
//             </div>
//           </Link>
//           <Link
//             to="/admin/education"
//             className="glass rounded-2xl p-5 hover:bg-accent/10 transition-all duration-300 group hover:shadow-lg"
//           >
//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 rounded-xl bg-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                 <span className="text-3xl">🎓</span>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg">Education</h3>
//                 <p className="text-light-gray/60 text-sm">Add academic records</p>
//               </div>
//             </div>
//           </Link>
//           <Link
//             to="/admin/messages"
//             className="glass rounded-2xl p-5 hover:bg-accent/10 transition-all duration-300 group hover:shadow-lg"
//           >
//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                 <span className="text-3xl">💬</span>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg">Messages</h3>
//                 <p className="text-light-gray/60 text-sm">
//                   {stats.messages} unread {stats.messages === 1 ? 'message' : 'messages'}
//                 </p>
//               </div>
//             </div>
//           </Link>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Dashboard;