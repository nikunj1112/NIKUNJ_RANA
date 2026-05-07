import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Active section detect
      const sections = document.querySelectorAll('section');
      sections.forEach((sec) => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 100;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Education', href: '#education', id: 'education' },
    { name: 'GitHub', href: '#github', id: 'github' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-dark py-3' : 'py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold gradient-text">
          Nikunj<span>.web</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative transition-colors duration-300 ${
                activeSection === link.id
                  ? 'text-accent'
                  : 'text-light-gray hover:text-accent'
              }`}
            >
              {link.name}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                  activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </a>
          ))}
          <Link to="/admin" className="btn-primary text-sm">
            N~hub 🔒
          </Link>
        </div>

        {/* Mobile Button */}
        
        <button
          className="md:hidden text-light-gray p-2 rounded-lg hover:bg-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor">
            {isOpen ? (
              <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={2} />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-dark mt-2 mx-4 rounded-lg border border-white/10"
          >
            <div className="p-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 rounded-lg w-auto ${
                    activeSection === link.id
                      ? 'bg-accent/20  text-accent'
                      : 'text-light-gray hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </a>
              ))}

                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary text-sm px-4 py-2 self-start mt-2"
                >
                  N~hub 🔒
                </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;



// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import DarkModeToggle from './DarkModeToggle';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState('home');

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);

//       // Active section detection
//       const sections = ['home', 'about', 'skills', 'projects', 'education', 'github', 'contact'];
//       for (const section of sections.reverse()) {
//         const el = document.getElementById(section);
//         if (el && window.scrollY >= el.offsetTop - 120) {
//           setActiveSection(section);
//           break;
//         }
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navLinks = [
//     { name: 'Home', href: '#home', id: 'home' },
//     { name: 'About', href: '#about', id: 'about' },
//     { name: 'Skills', href: '#skills', id: 'skills' },
//     { name: 'Projects', href: '#projects', id: 'projects' },
//     { name: 'Education', href: '#education', id: 'education' },
//     { name: 'GitHub', href: '#github', id: 'github' },
//     { name: 'Contact', href: '#contact', id: 'contact' },
//   ];

//   return (
//     <motion.nav
//       initial={{ y: -100, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6, ease: 'easeOut' }}
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//         isScrolled
//           ? 'py-3 backdrop-blur-xl bg-primary-dark/80 border-b border-white/5 shadow-lg shadow-black/20'
//           : 'py-5 bg-transparent'
//       }`}
//     >
//       <div className="container-custom flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/">
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="flex items-center gap-2"
//           >
//             <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-accent/30">
//               N
//             </div>
//             <span className="text-xl font-bold gradient-text">
//               ikunj<span className="text-soft-blue">.web</span>
//             </span>
//           </motion.div>
//         </Link>

//         {/* Desktop Nav */}
//         <div className="hidden md:flex items-center gap-1">
//           {navLinks.map((link) => (
//             <motion.a
//               key={link.name}
//               href={link.href}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
//                 activeSection === link.id
//                   ? 'text-accent'
//                   : 'text-light-gray/70 hover:text-light-gray'
//               }`}
//             >
//               {activeSection === link.id && (
//                 <motion.div
//                   layoutId="activeNav"
//                   className="absolute inset-0 bg-accent/10 rounded-lg border border-accent/20"
//                   transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
//                 />
//               )}
//               <span className="relative z-10">{link.name}</span>
//             </motion.a>
//           ))}
//         </div>

//         {/* Right side */}
//         <div className="hidden md:flex items-center gap-3">
//           <DarkModeToggle />
//           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//             <Link
//               to="/admin"
//               className="px-4 py-2 rounded-lg text-sm font-medium bg-accent/10 border border-accent/30 text-accent hover:bg-accent hover:text-white transition-all duration-300"
//             >
//               Admin Panel
//             </Link>
//           </motion.div>
//         </div>

//         {/* Mobile Menu Button */}
//         <motion.button
//           whileTap={{ scale: 0.9 }}
//           className="md:hidden p-2 rounded-lg glass border border-white/10"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <div className="w-5 h-4 flex flex-col justify-between">
//             <motion.span
//               animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
//               className="w-full h-0.5 bg-light-gray rounded-full block"
//             />
//             <motion.span
//               animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
//               className="w-full h-0.5 bg-light-gray rounded-full block"
//             />
//             <motion.span
//               animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
//               className="w-full h-0.5 bg-light-gray rounded-full block"
//             />
//           </div>
//         </motion.button>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0, y: -10 }}
//             animate={{ opacity: 1, height: 'auto', y: 0 }}
//             exit={{ opacity: 0, height: 0, y: -10 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden mx-4 mt-2 rounded-2xl overflow-hidden border border-white/10"
//             style={{ background: 'rgba(33, 42, 49, 0.95)', backdropFilter: 'blur(20px)' }}
//           >
//             <div className="p-4 flex flex-col gap-1">
//               {navLinks.map((link, i) => (
//                 <motion.a
//                   key={link.name}
//                   href={link.href}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: i * 0.05 }}
//                   onClick={() => setIsOpen(false)}
//                   className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
//                     activeSection === link.id
//                       ? 'bg-accent/20 text-accent border border-accent/20'
//                       : 'text-light-gray/70 hover:bg-white/5 hover:text-light-gray'
//                   }`}
//                 >
//                   {link.name}
//                 </motion.a>
//               ))}
//               <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/10">
//                 <DarkModeToggle />
//                 <Link
//                   to="/admin"
//                   onClick={() => setIsOpen(false)}
//                   className="px-4 py-2 rounded-lg text-sm bg-accent text-white font-medium"
//                 >
//                   Admin
//                 </Link>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// };

// export default Navbar;
