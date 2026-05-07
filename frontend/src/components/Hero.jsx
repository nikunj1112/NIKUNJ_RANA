import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { profileAPI } from '../services/api';

const Hero = () => {
  const [profile, setProfile] = useState(null);
  const [text, setText] = useState('');
  const titles = ['Full Stack Developer', 'MERN Stack Expert', 'React Developer', 'Node.js Developer'];
  const [titleIndex, setTitleIndex] = useState(0);

  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 20,
  });

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    profileAPI
      .getProfile()
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex <= titles[titleIndex].length) {
        setText(titles[titleIndex].slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);

        setTimeout(() => {
          setTitleIndex((prev) => (prev + 1) % titles.length);
          setText('');
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [titleIndex]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-28 pb-20 md:pt-10 md:pb-0"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-soft-blue/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      />

      <div className="container-custom relative !px-0">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-0 px-4 md:px-0 md:pe-5">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 flex-1 text-center md:text-left md:order-1 w-full"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg mb-4 text-soft-blue font-medium"
            >
              Hello, I'm
            </motion.p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight">
              <span className="gradient-text">
                {profile?.name || 'Nikunj Rana'}
              </span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-soft-blue mb-6 min-h-10">
              {text}
              <span className="animate-pulse">|</span>
            </p>

            <p className="text-light-gray/70 text-base sm:text-lg mb-8 max-w-xl mx-auto md:mx-0">
              {profile?.about ||
                'Building modern web applications with cutting-edge technologies. Passionate about creating seamless user experiences and scalable solutions.'}
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a href="#projects" className="btn-primary">
                View My Work
              </a>

              <a href="#contact" className="btn-secondary">
                Contact Me
              </a>

              {profile?.resume && (
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  View Resume
                </a>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-6 mt-8 justify-center md:justify-start">
              {/* GitHub */}
              <motion.a
                href={profile?.github || 'https://github.com/nikunj1112'}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                className="p-3 rounded-full glass hover:bg-accent/30 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href={
                  profile?.linkedin ||
                  'https://www.linkedin.com/in/nikunj-rana-7ba712319/'
                }
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                className="p-3 rounded-full glass hover:bg-accent/30 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>

              {/* Instagram */}
              <motion.a
                href={profile?.instagram || 'https://www.instagram.com/nikunj.web/'}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                className="p-3 rounded-full glass hover:bg-accent/30 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </motion.a>

              {/* Email */}
              <motion.a
                href={`mailto:${profile?.email || 'rnikunj540@gmail.com'}`}
                whileHover={{ scale: 1.1, y: -5 }}
                className="p-3 rounded-full glass hover:bg-accent/30 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* ===== 3D PROFILE CARD ===== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 flex-1 flex justify-center md:order-2 md:justify-end w-full mt-4 md:mt-0"
          >
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative flex items-center justify-center w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px]"
            >
              {/* Outer dashed rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-dashed border-accent/70"
                style={{ borderWidth: '3px' }}
              />

              {/* Inner dotted counter-rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute rounded-full border-dotted border-soft-blue/70"
                style={{ borderWidth: '3px', inset: '-10px' }}
              />

              {/* Profile image */}
              <motion.div
                style={{ transform: 'translateZ(40px)' }}
                className="relative w-[220px] h-[220px] sm:w-[270px] sm:h-[270px] md:w-80 md:h-80 rounded-full overflow-hidden shadow-4xl"
              >
                <div className="absolute inset-0 rounded-full z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 z-10 pointer-events-none" />

                {profile?.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent to-soft-blue">
                    <span className="text-5xl md:text-7xl font-bold text-primary-dark">
                      NR
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Floating badge — top right */}
              <motion.div
                style={{ transform: 'translateZ(60px)' }}
                className="absolute top-1 right-0 sm:top-4 sm:-right-6 glass border border-accent/30 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium shadow-xl whitespace-nowrap"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-yellow-400">●</span> MERN Stack Dev
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                style={{ transform: 'translateZ(60px)' }}
                className="absolute bottom-1 left-0 sm:bottom-4 sm:-left-6 glass border border-soft-blue/30 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium shadow-xl whitespace-nowrap"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                🚀 Open to Work
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-accent flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-accent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;





// import { useState, useEffect, useRef } from 'react';
// import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
// import { profileAPI } from '../services/api';

// const Hero = () => {
//   const [profile, setProfile] = useState(null);
//   const [text, setText] = useState('');
//   const titles = ['Full Stack Developer', 'MERN Stack Expert', 'React Developer', 'Node.js Developer'];
//   const [titleIndex, setTitleIndex] = useState(0);

//   const cardRef = useRef(null);
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 20 });
//   const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 });

//   const handleMouseMove = (e) => {
//     const rect = cardRef.current?.getBoundingClientRect();
//     if (!rect) return;
//     mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
//     mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
//   };

//   const handleMouseLeave = () => {
//     mouseX.set(0);
//     mouseY.set(0);
//   };

//   useEffect(() => {
//     profileAPI.getProfile()
//       .then((res) => setProfile(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   useEffect(() => {
//     let currentIndex = 0;
//     const typeInterval = setInterval(() => {
//       if (currentIndex <= titles[titleIndex].length) {
//         setText(titles[titleIndex].slice(0, currentIndex));
//         currentIndex++;
//       } else {
//         clearInterval(typeInterval);
//         setTimeout(() => {
//           setTitleIndex((prev) => (prev + 1) % titles.length);
//           setText('');
//         }, 2000);
//       }
//     }, 100);
//     return () => clearInterval(typeInterval);
//   }, [titleIndex]);

//   return (
//     <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">

//       {/* Animated grid background */}
//       <div className="absolute inset-0" style={{
//         backgroundImage: `
//           linear-gradient(rgba(18, 78, 102, 0.08) 1px, transparent 1px),
//           linear-gradient(90deg, rgba(18, 78, 102, 0.08) 1px, transparent 1px)
//         `,
//         backgroundSize: '60px 60px',
//         animation: 'gridMove 20s linear infinite'
//       }} />

//       {/* Glowing orbs */}
//       <div className="absolute top-20 left-10 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-float" />
//       <div className="absolute bottom-20 right-10 w-96 h-96 bg-soft-blue/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

//       {/* Floating particles */}
//       {[...Array(8)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-1.5 h-1.5 bg-accent/60 rounded-full"
//           style={{
//             left: `${10 + i * 12}%`,
//             top: `${20 + (i % 3) * 25}%`,
//           }}
//           animate={{ y: [0, -30, 0], opacity: [0.4, 1, 0.4] }}
//           transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
//         />
//       ))}

//       <div className="container-custom relative z-10 !px-4 md:!px-8">
//         <div className="flex flex-col md:flex-row items-center gap-12">

//           {/* ===== TEXT CONTENT ===== */}
//           <motion.div
//             initial={{ opacity: 0, x: -60 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.9, ease: 'easeOut' }}
//             className="flex-1 text-center md:text-left"
//           >
//             {/* Available badge */}
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/30 mb-6"
//             >
//               <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//               <span className="text-sm text-soft-blue font-medium">Available for Work</span>
//             </motion.div>

//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               className="text-xl mb-3 text-soft-blue font-medium tracking-wide"
//             >
//               Hello, I'm
//             </motion.p>

//             <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
//               <span className="gradient-text">{profile?.name || 'Nikunj Rana'}</span>
//             </h1>

//             {/* Typing animation */}
//             <div className="text-2xl md:text-3xl text-soft-blue mb-6 h-12 flex items-center justify-center md:justify-start gap-2">
//               <span className="text-accent font-mono">{'>'}</span>
//               <span className="font-mono">{text}</span>
//               <motion.span
//                 animate={{ opacity: [1, 0] }}
//                 transition={{ duration: 0.6, repeat: Infinity }}
//                 className="inline-block w-0.5 h-8 bg-accent"
//               />
//             </div>

//             <p className="text-light-gray/70 text-lg mb-8 max-w-xl leading-relaxed">
//               {profile?.about || 'Building modern web applications with cutting-edge technologies. Passionate about creating seamless user experiences and scalable solutions.'}
//             </p>

//             {/* CTA Buttons */}
//             <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
//               <motion.a
//                 href="#projects"
//                 whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(18,78,102,0.5)' }}
//                 whileTap={{ scale: 0.95 }}
//                 className="btn-primary relative overflow-hidden group"
//               >
//                 <span className="relative z-10">View My Work</span>
//                 <motion.div
//                   className="absolute inset-0 bg-white/10"
//                   initial={{ x: '-100%' }}
//                   whileHover={{ x: '100%' }}
//                   transition={{ duration: 0.4 }}
//                 />
//               </motion.a>
//               <motion.a
//                 href="#contact"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="btn-secondary"
//               >
//                 Contact Me
//               </motion.a>
//               {profile?.resume && (
//                 <motion.a
//                   href={profile.resume}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   whileHover={{ scale: 1.05 }}
//                   className="btn-secondary"
//                 >
//                   📄 Resume
//                 </motion.a>
//               )}
//             </div>

//             {/* Social Links */}
//             <div className="flex gap-4 justify-center md:justify-start">
//               {[
//                 { href: profile?.github || 'https://github.com/nikunj1112', icon: '⌥', label: 'GitHub' },
//                 { href: profile?.linkedin || 'https://linkedin.com/in/nikunj-rana', icon: '💼', label: 'LinkedIn' },
//                 { href: profile?.instagram || 'https://instagram.com', icon: '📸', label: 'Instagram' },
//                 { href: `mailto:${profile?.email || 'rnikunj540@gmail.com'}`, icon: '✉️', label: 'Email' },
//               ].map((social) => (
//                 <motion.a
//                   key={social.label}
//                   href={social.href}
//                   target={social.label !== 'Email' ? '_blank' : undefined}
//                   rel="noopener noreferrer"
//                   whileHover={{ scale: 1.15, y: -5 }}
//                   whileTap={{ scale: 0.9 }}
//                   title={social.label}
//                   className="p-3 rounded-xl glass border border-white/5 hover:border-accent/40 hover:bg-accent/20 transition-all duration-300 text-xl"
//                 >
//                   {social.icon}
//                 </motion.a>
//               ))}
//             </div>

//             {/* Stats */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8 }}
//               className="flex gap-8 mt-10 justify-center md:justify-start"
//             >
//               {[
//                 { num: '2+', label: 'Years Exp.' },
//                 { num: '20+', label: 'Projects' },
//                 { num: '10+', label: 'Clients' },
//               ].map((stat) => (
//                 <div key={stat.label} className="text-center">
//                   <div className="text-3xl font-bold gradient-text">{stat.num}</div>
//                   <div className="text-xs text-light-gray/50 uppercase tracking-widest mt-1">{stat.label}</div>
//                 </div>
//               ))}
//             </motion.div>
//           </motion.div>

//           {/* ===== 3D PROFILE CARD ===== */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
//             animate={{ opacity: 1, scale: 1, rotateY: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="flex-1 flex justify-center md:justify-end"
//           >
//             <motion.div
//               ref={cardRef}
//               onMouseMove={handleMouseMove}
//               onMouseLeave={handleMouseLeave}
//               style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
//               className="relative flex items-center justify-center w-[360px] h-[360px]"
//             >

//               {/* Outer dashed rotating ring */}
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
//                 className="absolute inset-0 rounded-full border-dashed border-accent/40"
//                 style={{ borderWidth: '3px' }}
//               />

//               {/* Inner dotted counter-rotating ring */}
//               <motion.div
//                 animate={{ rotate: -360 }}
//                 transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
//                 className="absolute rounded-full border-dotted border-soft-blue/40"
//                 style={{ borderWidth: '3px', inset: '-15px' }}
//               />

  
//               {/* Profile image */}
//               <motion.div
//                 style={{ transform: 'translateZ(40px)' }}
//                 className="relative w-75 h-75 md:w-80 md:h-80 rounded-full overflow-hidden shadow-4xl "
//               >
//                 <div className="absolute inset-0 rounded-full  z-10" />
//                 <div className="absolute inset-0 bg-gradient-to-br  from-accent/20 to-soft-blue/20 z-10 pointer-events-none" />

//                 {profile?.profileImage ? (
//                   <img
//                     src={profile.profileImage}
//                     alt={profile.name}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent to-soft-blue">
//                     <span className="text-7xl font-bold text-primary-dark">NR</span>
//                   </div>
//                 )}
//               </motion.div>

//               {/* Floating badge — top right */}
//               <motion.div
//                 style={{ transform: 'translateZ(60px)' }}
//                 className="absolute top-4 -right-6 glass border border-accent/30 px-4 py-2 rounded-xl text-sm font-medium shadow-xl whitespace-nowrap"
//                 animate={{ y: [0, -8, 0] }}
//                 transition={{ duration: 3, repeat: Infinity }}
//               >
//                 <span className="text-green-400">●</span> MERN Stack Dev
//               </motion.div>

//               {/* Floating badge — bottom left */}
//               <motion.div
//                 style={{ transform: 'translateZ(60px)' }}
//                 className="absolute bottom-4 -left-6 glass border border-soft-blue/30 px-4 py-2 rounded-xl text-sm font-medium shadow-xl whitespace-nowrap"
//                 animate={{ y: [0, 8, 0] }}
//                 transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
//               >
//                 🚀 Open to Work
//               </motion.div>

//             </motion.div>
//           </motion.div>

//         </div>
//       </div>

//       {/* Scroll indicator */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 1.2 }}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2"
//       >
//         <motion.div
//           animate={{ y: [0, 10, 0] }}
//           transition={{ duration: 1.5, repeat: Infinity }}
//           className="w-6 h-10 rounded-full border-2 border-accent/50 flex justify-center pt-2"
//         >
//           <motion.div
//             animate={{ opacity: [1, 0], y: [0, 8] }}
//             transition={{ duration: 1, repeat: Infinity }}
//             className="w-1 h-2 rounded-full bg-accent"
//           />
//         </motion.div>
//         <p className="text-xs text-light-gray/40 text-center mt-2 tracking-widest uppercase">Scroll</p>
//       </motion.div>

//       <style>{`
//         @keyframes gridMove {
//           from { background-position: 0 0; }
//           to { background-position: 60px 60px; }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Hero;