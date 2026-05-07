// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { skillsAPI } from '../services/api';

// const Skills = () => {
//   const [skills, setSkills] = useState([]);
//   const [filter, setFilter] = useState('All');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const ITEMS_PER_PAGE = 8;


//   useEffect(() => {
//     loadSkills();
//   }, []);

//   const loadSkills = async () => {
//     try {
//       const res = await skillsAPI.getSkills();
//       setSkills(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get unique categories from database skills
//   const categories = ['All', ...new Set(skills.map(skill => skill.category))];

//   const filteredSkills = filter === 'All' 
//     ? skills 
//     : skills.filter(skill => skill.category === filter);

//   // Pagination
//   const totalPages = Math.ceil(filteredSkills.length / ITEMS_PER_PAGE);
//   const paginatedSkills = filteredSkills.slice(
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
//     <section id="skills" className="section-padding relative bg-secondary-dark/30">
//       <div className="container-custom">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold mb-4">
//             My <span className="gradient-text">Skills</span>
//           </h2>
//           <p className="text-light-gray/70 max-w-2xl mx-auto">
//             A collection of technologies and tools I work with
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

//         {/* Skills Grid */}
//         {loading ? (
//           <div className="flex justify-center">
//             <div className="loader" />
//           </div>
//         ) : (
//           <motion.div
//             layout
//             className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
//           >
//             <AnimatePresence mode="popLayout">
// {paginatedSkills.map((skill, index) => (
//                 <motion.div
//                   key={skill._id || skill.name}
//                   layout
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   transition={{ duration: 0.3, delay: index * 0.05 }}
//                   whileHover={{ scale: 1.05, y: -5 }}
//                   className="glass p-6 rounded-xl text-center card-hover cursor-pointer group"
//                 >
//                   <div className="w-16 h-16 mx-auto mb-4 rounded-xl  flex items-center justify-center overflow-hidden group-hover:scale-110 transition-all">
//                     {skill.icon ? (
//                       <img 
//                         src={skill.icon} 
//                         alt={skill.name} 
//                         className="w-12 h-12 object-contain"
//                         onError={(e) => {
//                           e.target.replaceWith(e.target.nextSibling.cloneNode(true));
//                         }}
//                       />
//                     ) : null}
//                     <div className="text-3xl" style={{display: skill.icon ? 'none' : 'block'}}>
//                       💻
//                     </div>
//                   </div>

//                   <h3 className="font-semibold text-lg mb-2">{skill.name}</h3>
//                   <span className="text-xs px-3 py-1 rounded-full bg-accent/60 text-white/50">
//                     {skill.category}
//                   </span>
//                 </motion.div>
//               ))}

//             </AnimatePresence>
//           </motion.div>
//         )}

//         {filteredSkills.length === 0 && !loading && (
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center text-light-gray/50"
//           >
//             No skills in this category yet.
//           </motion.p>
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
//       </div>
//     </section>
//   );
// };


// export default Skills;

import { useState, useEffect, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsAPI } from '../services/api';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [selectedSkill, setSelectedSkill] = useState(null);
  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const res = await skillsAPI.getSkills();
      setSkills(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from database skills
  const categories = ['All', ...new Set(skills.map(skill => skill.category))];

  // Filter skills by category and search term
  const filteredSkills = skills.filter(skill => {
    const matchesCategory = filter === 'All' || skill.category === filter;
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (skill.description && skill.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredSkills.length / ITEMS_PER_PAGE);
  const paginatedSkills = filteredSkills.slice(
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
  }, [filter, searchTerm]);

  // Skill card component
  const SkillCard = forwardRef(({ skill, index }, ref) => (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onClick={() => setSelectedSkill(skill)}
      className="group cursor-pointer"
    >
      <div className="glass rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 border border-white/10 hover:border-accent/50">
        <div className="relative">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl  flex items-center justify-center group-hover:scale-110 transition-all duration-300">
            {skill.icon ? (
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className="text-4xl" style={{ display: skill.icon ? 'none' : 'flex' }}>
              💻
            </div>
          </div>

        </div>

        <h3 className="font-bold text-lg mb-2 text-center group-hover:text-accent transition-colors">
          {skill.name}
        </h3>

        <p className="text-sm text-light-gray/60 text-center mb-3 line-clamp-2">
          {skill.description || `Expert in ${skill.name} development and implementation`}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs px-3 py-1 rounded-full bg-accent/60 text-white/40 border border-accent/30">
            {skill.category}
          </span>

          {/* View Details Indicator */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  ));
  SkillCard.displayName = 'SkillCard';

  // List view component
  const SkillListItem = forwardRef(({ skill, index }, ref) => (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ x: 8 }}
      onClick={() => setSelectedSkill(skill)}
      className="glass rounded-xl p-4 cursor-pointer group hover:border-accent/50 border border-white/10 transition-all"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-white/10 flex items-center justify-center">
          {skill.icon ? (
            <img src={skill.icon} alt={skill.name} className="w-8 h-8 object-contain" />
          ) : (
            <span className="text-2xl">💻</span>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold group-hover:text-accent transition-colors">
              {skill.name}
            </h3>
            <span className="text-xs px-3 py-2 rounded-full bg-accent/60 text-white/40">
              {skill.category}
            </span>
          </div>




        </div>
      </div>
    </motion.div>
  ));
  SkillListItem.displayName = 'SkillListItem';

  // Modal for skill details
  const SkillModal = ({ skill, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass rounded-2xl max-w-md w-full p-6 border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/90 flex items-center justify-center">
              {skill.icon ? (
                <img src={skill.icon} alt={skill.name} className="w-8 h-8 object-contain" />
              ) : (
                <span className="text-2xl">💻</span>
              )}
            </div>
            <h3 className="text-2xl font-bold">{skill.name}</h3>
          </div>
          <button onClick={onClose} className="text-light-gray/70 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <span className="text-sm text-light-gray/70">Category</span>
            <p className="font-semibold">{skill.category}</p>
          </div>


          <div>
            <span className="text-sm text-light-gray/70">Description</span>
            <p className="mt-1">{skill.description || `Expert in ${skill.name} with extensive hands-on experience in real-world projects.`}</p>
          </div>

          {skill.projects && skill.projects.length > 0 && (
            <div>
              <span className="text-sm text-light-gray/70">Related Projects</span>
              <ul className="list-disc list-inside mt-1 space-y-1">
                {skill.projects.map((project, idx) => (
                  <li key={idx} className="text-sm">{project}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section id="skills" className="section-padding relative bg-gradient-to-b from-secondary-dark/30 to-secondary-dark/50">

      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid " />
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-soft-blue/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-light-gray/70 max-w-2xl mx-auto">
            A comprehensive collection of technologies and tools I specialize in
          </p>
        </motion.div>

        {/* Filter, Search, and View Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 mb-12"
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search skills..."
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

          <div className="flex flex-wrap justify-between items-center gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${filter === category
                    ? 'bg-gradient-to-r from-accent to-accent/80 text-white shadow-lg shadow-accent/30'
                    : 'glass hover:bg-accent/30 hover:shadow-lg'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-accent text-white' : 'glass hover:bg-white/10'
                  }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-accent text-white' : 'glass hover:bg-white/10'
                  }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Skills Grid/List */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="relative">
              <div className="loader" />
              <p className="mt-4 text-light-gray/70">Loading skills...</p>
            </div>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {paginatedSkills.map((skill, index) => (
                    <SkillCard key={skill._id || skill.name} skill={skill} index={index} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="space-y-3"
              >
                <AnimatePresence mode="popLayout">
                  {paginatedSkills.map((skill, index) => (
                    <SkillListItem key={skill._id || skill.name} skill={skill} index={index} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </>
        )}

        {filteredSkills.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <svg className="w-16 h-16 mx-auto mb-4 text-light-gray/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-light-gray/50 text-lg">No skills found matching your criteria.</p>
            <button
              onClick={() => {
                setFilter('All');
                setSearchTerm('');
              }}
              className="mt-4 text-accent hover:underline"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-center gap-2 mt-12"
          >
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg glass disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-all group"
            >
              <span className="group-hover:translate-x-[-2px] inline-block transition-transform">←</span> Prev
            </button>

            {/* Page Numbers with Ellipsis */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => {
                if (totalPages <= 5) return true;
                if (page === 1 || page === totalPages) return true;
                if (Math.abs(page - currentPage) <= 1) return true;
                return false;
              })
              .map((page, idx, arr) => {
                if (idx > 0 && page - arr[idx - 1] > 1) {
                  return (
                    <span key={`ellipsis-${page}`} className="px-2 text-light-gray/50">
                      ...
                    </span>
                  );
                }
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`min-w-[40px] px-3 py-2 rounded-lg transition-all ${currentPage === page
                      ? 'bg-gradient-to-r from-accent to-accent/80 text-white shadow-lg shadow-accent/30'
                      : 'glass hover:bg-white/10'
                      }`}
                  >
                    {page}
                  </button>
                );
              })}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg glass disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-all group"
            >
              Next <span className="group-hover:translate-x-[2px] inline-block transition-transform">→</span>
            </button>
          </motion.div>
        )}

        {/* Statistics */}
        {!loading && filteredSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 text-light-gray/50 text-sm"
          >
            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredSkills.length)} of {filteredSkills.length} skills
          </motion.div>
        )}
      </div>



    {/* Skill Modal */}
    <AnimatePresence>
      {selectedSkill && (
        <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
      )}
    </AnimatePresence>
  </section>
  );
};

export default Skills;