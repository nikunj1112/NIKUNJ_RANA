// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { projectsAPI } from '../services/api';

// const Projects = () => {
//   const [projects, setProjects] = useState([]);
//   const [filter, setFilter] = useState('All');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const ITEMS_PER_PAGE = 4;


//   // Dynamic categories based on available projects in database
//   const [categories, setCategories] = useState(['All']);

//   useEffect(() => {
//     loadProjects();
//   }, []);

//   const loadProjects = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await projectsAPI.getProjects();
//       setProjects(res.data);
      
//       // Extract unique categories from projects
//       const uniqueCategories = ['All', ...new Set(res.data.map(p => p.category).filter(Boolean))];
//       setCategories(uniqueCategories);
//     } catch (err) {
//       console.error('Error loading projects:', err);
//       setError('Failed to load projects. Please make sure the backend server is running.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredProjects = filter === 'All'
//     ? projects
//     : projects.filter(project => project.category === filter);

//   // Pagination
//   const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
//   const paginatedProjects = filteredProjects.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const goToPage = (page) => {
//     setCurrentPage(page);
//   };

//   const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
//   const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [filter]);


//   return (
//     <section id="projects" className="section-padding relative">
//       <div className="container-custom">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold mb-4">
//             My <span className="gradient-text">Projects</span>
//           </h2>
//           <p className="text-light-gray/70 max-w-2xl mx-auto">
//             Check out some of the projects I've worked on
//           </p>
//         </motion.div>

//         {/* Filter Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="flex flex-wrap justify-center gap-3 mb-12"
//         >
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setFilter(category)}
//               className={`px-6 py-2 rounded-full transition-all duration-300 ${
//                 filter === category
//                   ? 'bg-accent text-white'
//                   : 'glass hover:bg-accent/30'
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </motion.div>

//         {/* Projects Grid */}
//         {loading ? (
//           <div className="flex justify-center">
//             <div className="loader" />
//           </div>
//         ) : error ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center py-12"
//           >
//             <p className="text-red-400 mb-4">{error}</p>
//             <button
//               onClick={loadProjects}
//               className="px-6 py-2 rounded-full bg-accent text-white hover:bg-accent/80 transition-colors"
//             >
//               Try Again
//             </button>
//           </motion.div>
//         ) : (
//           <motion.div
//             layout
//             className="grid md:grid-cols-2 gap-8"
//           >
//             <AnimatePresence mode="popLayout">
//               {paginatedProjects.map((project, index) => (

//                 <motion.div
//                   key={project._id || index}
//                   layout
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -30 }}
//                   transition={{ duration: 0.4, delay: index * 0.1 }}
//                   className="glass rounded-2xl overflow-hidden card-hover group"
//                 >
//                   {/* Project Image */}
//                   <div className="relative h-48 bg-gradient-to-br from-accent/20 to-soft-blue/20 overflow-hidden">
//                     {project.image ? (
//                       <img
//                         src={project.image}
//                         alt={project.title}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center">
//                         <span className="text-6xl">🚀</span>
//                       </div>
//                     )}
//                     <div className="absolute inset-0 bg-primary-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
//                       {project.githubLink && (
//                         <a
//                           href={project.githubLink}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
//                         >
//                           <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                             <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
//                           </svg>
//                         </a>
//                       )}
//                       {project.liveLink && (
//                         <a
//                           href={project.liveLink}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
//                         >
//                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                           </svg>
//                         </a>
//                       )}
//                     </div>
//                   </div>

//                   {/* Project Content */}
//                   <div className="p-6">
//                     <div className="flex items-start justify-between mb-3">
//                       <h3 className="text-xl font-bold">{project.title}</h3>
//                       <span className="text-xs px-3 py-1 rounded-full bg-accent/50 text-white/60">
//                         {project.category}
//                       </span>
//                     </div>
//                     <p className="text-light-gray/70 mb-4 line-clamp-2">
//                       {project.description}
//                     </p>
//                     <div className="flex flex-wrap gap-2">
//                       {project.technologies?.map((tech, i) => (
//                         <span
//                           key={i}
//                           className="text-xs px-3 py-1 rounded-full bg-white/50 text-accent border border-soft-blue/20"
//                         >
//                           {tech}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex flex-wrap items-center justify-center gap-2 mt-12"
//           >
//             <button
//               onClick={prevPage}
//               disabled={currentPage === 1}
//               className="px-4 py-2 rounded-lg glass disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-all"
//             >
//               ← Prev
//             </button>

//             {/* Page Numbers */}
//             {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//               const pageNum = i + 1;
//               return (
//                 <button
//                   key={pageNum}
//                   onClick={() => goToPage(pageNum)}
//                   className={`px-3 py-2 rounded-lg transition-all ${
//                     currentPage === pageNum
//                       ? 'bg-accent/50 text-white/60 shadow-lg scale-105'
//                       : 'glass hover:bg-white/10'
//                   }`}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}

//             <button
//               onClick={nextPage}
//               disabled={currentPage === totalPages}
//               className="px-4 py-2 rounded-lg glass disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-all"
//             >
//               Next →
//             </button>

//             <span className="text-light-gray/50 text-sm ml-4">
//               Page {currentPage} of {totalPages}
//             </span>
//           </motion.div>
//         )}

// {paginatedProjects.length === 0 && !loading && (
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center text-light-gray/50"
//           >
//             No projects in this category yet.
//           </motion.p>
//         )}
//       </div>
//     </section>
//   );
// };


// export default Projects;




import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsAPI } from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ITEMS_PER_PAGE = 4;

  // Dynamic categories based on available projects in database
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await projectsAPI.getProjects();
      setProjects(res.data);
      
      // Extract unique categories from projects
      const uniqueCategories = ['All', ...new Set(res.data.map(p => p.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('Failed to load projects. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.category === filter);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-soft-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-light-gray/70 max-w-2xl mx-auto">
            Check out some of the projects I've worked on
          </p>
        </motion.div>

        {/* Filter Buttons - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md ${
                filter === category
                  ? 'bg-accent text-white shadow-accent/30'
                  : 'glass hover:bg-accent/30 hover:text-white border border-soft-blue/20'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-accent/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin"></div>
            </div>
            <p className="mt-6 text-light-gray/60">Loading projects...</p>
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="glass rounded-2xl p-8 max-w-md mx-auto">
              <div className="text-5xl mb-4">⚠️</div>
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={loadProjects}
                className="px-6 py-2.5 rounded-full bg-accent text-white hover:bg-accent/80 transition-all shadow-md"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            <motion.div
              layout
              className="grid md:grid-cols-2 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {paginatedProjects.map((project, index) => (
                  <motion.div
                    key={project._id || index}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="glass rounded-2xl overflow-hidden card-hover group hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500"
                  >
                    {/* Project Image with overlay */}
                    <div className="relative h-52 bg-gradient-to-br from-accent/30 to-soft-blue/30 overflow-hidden">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-7xl animate-float">🚀</span>
                        </div>
                      )}
                      {/* Overlay with links */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        {project.githubLink && (
                          <motion.a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-white/20 backdrop-blur rounded-full hover:bg-accent/80 transition-colors"
                          >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                          </motion.a>
                        )}
                        {project.liveLink && (
                          <motion.a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-white/20 backdrop-blur rounded-full hover:bg-accent/80 transition-colors"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </motion.a>
                        )}
                      </div>
                      {/* Category badge */}
                      <div className="absolute top-4 right-4">
                        <span className="text-xs px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white/90 font-medium shadow-lg">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-light-gray/70 mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 rounded-full bg-accent/60 text-white/40 border border-accent/20 hover:bg-accent/20 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination - Enhanced */}
            {totalPages > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap items-center justify-center gap-3 mt-12"
              >
                <motion.button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 rounded-xl glass disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Prev
                </motion.button>

                {/* Page Numbers with ellipsis for many pages */}
                <div className="flex gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <motion.button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-10 h-10 rounded-xl font-medium transition-all ${
                          currentPage === pageNum
                            ? 'bg-accent text-white shadow-md shadow-accent/30 scale-105'
                            : 'glass hover:bg-white/10'
                        }`}
                      >
                        {pageNum}
                      </motion.button>
                    );
                  })}
                </div>

                <motion.button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 rounded-xl glass disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>

                <span className="text-light-gray/50 text-sm ml-2">
                  Page {currentPage} of {totalPages}
                </span>
              </motion.div>
            )}

            {paginatedProjects.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="glass rounded-2xl p-8 max-w-md mx-auto">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-light-gray/50">
                    No projects in this category yet.
                  </p>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;