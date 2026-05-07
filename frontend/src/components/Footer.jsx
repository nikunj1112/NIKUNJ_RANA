// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { profileAPI } from "../services/api";
// import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

// const Footer = () => {
//   const [profile, setProfile] = useState(null);
//   const currentYear = new Date().getFullYear();

//   useEffect(() => {
//     profileAPI
//       .getProfile()
//       .then((res) => setProfile(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const socialLinks = [
//     {
//       name: "GitHub",
//       url: profile?.github || "https://github.com/nikunj1112",
//       icon: <FaGithub />,
//     },
//     {
//       name: "LinkedIn",
//       url:
//         profile?.linkedin ||
//         "https://www.linkedin.com/in/nikunj-rana-7ba712319/",
//       icon: <FaLinkedin />,
//     },
//     {
//       name: "Instagram",
//       url: "https://www.instagram.com/nikunj.web/",
//       icon: <FaInstagram />,
//     },
//     {
//       name: "Email",
//       url: "mailto:rnikunj540@gmail.com",
//       icon: <FaEnvelope />,
//     },
//   ];

//   const quickLinks = [
//     { name: "Home", href: "#home" },
//     { name: "About", href: "#about" },
//     { name: "Skills", href: "#skills" },
//     { name: "Projects", href: "#projects" },
//     { name: "Education", href: "#education" },
//     { name: "Contact", href: "#contact" },
//   ];

//   return (
//     <footer className="glass-dark py-12">
//       <div className="container-custom">

//         {/* Top Footer */}
//         <div className="grid md:grid-cols-3 gap-10">

//           {/* Left */}
//           <div className="justify-self-start">
//             <h3 className="text-2xl font-bold gradient-text">
//               {profile?.name || "Nikunj Rana"}
//             </h3>

//             <p className="text-light-gray/70 text-sm mt-2">
//               {profile?.title || "Full Stack MERN Developer"}
//             </p>

//             <p className="text-light-gray/60 text-sm mt-3">
//               Building beautiful and functional web applications with modern technologies.
//             </p>
//           </div>

//           {/* Middle Quick Links */}
//           <div className="justify-self-center">
//             <h4 className="text-xl font-bold gradient-text">
//               Quick Links
//             </h4>

//             <ul className="flex flex-col gap-3 mt-4 items-center">
//               {quickLinks.map((link) => (
//                 <li key={link.name}>
//                   <a
//                     href={link.href}
//                     className="text-light-gray/70 hover:text-accent transition-colors text-sm"
//                   >
//                     {link.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Right Social */}
//           <div className="justify-self-end">
//             <h4 className="text-xl font-semibold mb-4 gradient-text">
//               Connect With Me
//             </h4>

//             <div className="flex gap-4">
//               {socialLinks.map((link) => (
//                 <motion.a
//                   key={link.name}
//                   href={link.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   whileHover={{ scale: 1.1, y: -3 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="p-3 rounded-full glass hover:bg-accent/30 transition"
//                   title={link.name}
//                 >
//                   {link.icon}
//                 </motion.a>
//               ))}
//             </div>
//           </div>

//         </div>

//         {/* Divider */}
//         <div className="border-t border-light-gray/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">

// <p className="text-light-gray/70 text-sm">
//   © {currentYear} {profile?.name || "Nikunj Rana"}. All rights reserved.
// </p>

// <p className="text-light-gray/50 text-sm">
//   Made with ❤️ using MERN Stack
// </p>

// </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { profileAPI } from "../services/api";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const [profile, setProfile] = useState(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    profileAPI
      .getProfile()
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, []);

  const socialLinks = [
    {
      name: "GitHub",
      url: profile?.github || "https://github.com/nikunj1112",
      icon: <FaGithub />,
    },
    {
      name: "LinkedIn",
      url:
        profile?.linkedin ||
        "https://www.linkedin.com/in/nikunj-rana-7ba712319/",
      icon: <FaLinkedin />,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/nikunj.web/",
      icon: <FaInstagram />,
    },
    {
      name: "Email",
      url: "mailto:rnikunj540@gmail.com",
      icon: <FaEnvelope />,
    },
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="glass-dark py-14">
      <div className="container-custom px-4">

        {/* Top Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center md:text-center">

          {/* Left */}
          <div>
            <h3 className="text-2xl font-bold gradient-text  md:text-left text-center ">
              {profile?.name || "Nikunj Rana"}
            </h3>

            <p className="text-light-gray/70 text-sm mt-2  md:text-left text-center">
              {profile?.title || "Full Stack MERN Developer"}
            </p>

            <p className="text-light-gray/60 text-sm mt-3 leading-relaxed max-w-xs mx-auto md:mx-0  md:text-left text-center">
              Building beautiful and functional web applications with modern technologies.
            </p>
          </div>

          {/* Middle */}
          <div>
            <h4 className="text-xl font-bold gradient-text">
              Quick Links
            </h4>

            <ul className="flex flex-col gap-3 mt-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-light-gray/70 hover:text-accent transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div>
            <h4 className="text-xl font-semibold mb-4 gradient-text  md:text-end text-center">
              Connect With Me
            </h4>

            <div className="flex justify-center md:justify-end gap-4 flex-wrap ">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3  rounded-full glass hover:bg-accent/30 hover:shadow-lg hover:shadow-accent/20 transition duration-300"
                  title={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-light-gray/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">

          <p className="text-light-gray/70 text-sm">
            © {currentYear} {profile?.name || "Nikunj Rana"}. All rights reserved.
          </p>

          <p className="text-light-gray/50 text-sm">
            Made with 🤍 using MERN Stack
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { profileAPI } from "../services/api";
// import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaHeart } from "react-icons/fa";

// const Footer = () => {
//   const [profile, setProfile] = useState(null);
//   const currentYear = new Date().getFullYear();

//   useEffect(() => {
//     profileAPI
//       .getProfile()
//       .then((res) => setProfile(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const socialLinks = [
//     {
//       name: "GitHub",
//       url: profile?.github || "https://github.com/nikunj1112",
//       icon: <FaGithub />,
//       color: "hover:bg-[#333]",
//     },
//     {
//       name: "LinkedIn",
//       url:
//         profile?.linkedin ||
//         "https://www.linkedin.com/in/nikunj-rana-7ba712319/",
//       icon: <FaLinkedin />,
//       color: "hover:bg-[#0A66C2]",
//     },
//     {
//       name: "Instagram",
//       url: "https://www.instagram.com/nikunj.web/",
//       icon: <FaInstagram />,
//       color: "hover:bg-gradient-to-r from-[#f09433] to-[#bc1888]",
//     },
//     {
//       name: "Email",
//       url: "mailto:rnikunj540@gmail.com",
//       icon: <FaEnvelope />,
//       color: "hover:bg-[#EA4335]",
//     },
//   ];

//   const quickLinks = [
//     { name: "Home", href: "#home" },
//     { name: "About", href: "#about" },
//     { name: "Skills", href: "#skills" },
//     { name: "Projects", href: "#projects" },
//     { name: "Education", href: "#education" },
//     { name: "Contact", href: "#contact" },
//   ];

//   return (
//     <footer className="relative bg-gradient-to-b from-secondary-dark/80 to-secondary-dark/90 border-t border-white/5">
//       {/* Background Decoration */}
//       <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
//       <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />
//       <div className="absolute top-0 right-0 w-64 h-64 bg-soft-blue/10 rounded-full blur-3xl -z-10" />

//       <div className="container-custom relative z-10 py-12 md:py-16">
//         {/* Top Footer */}
//         <div className="grid md:grid-cols-3 gap-12">
//           {/* Left - Brand Info */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="text-center md:text-left"
//           >
//             <h3 className="text-2xl md:text-3xl font-bold gradient-text">
//               {profile?.name || "Nikunj Rana"}
//             </h3>
//             <p className="text-accent font-medium mt-1">
//               {profile?.title || "Full Stack MERN Developer"}
//             </p>
//             <p className="text-light-gray/60 text-sm mt-3 max-w-md mx-auto md:mx-0 leading-relaxed">
//               Building beautiful and functional web applications with modern technologies. Passionate about creating seamless user experiences.
//             </p>
//           </motion.div>

//           {/* Middle - Quick Links */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="text-center"
//           >
//             <h4 className="text-xl font-bold gradient-text mb-4">
//               Quick Links
//             </h4>
//             <ul className="space-y-2">
//               {quickLinks.map((link, idx) => (
//                 <motion.li
//                   key={link.name}
//                   whileHover={{ x: 5 }}
//                   transition={{ type: "spring", stiffness: 400 }}
//                 >
//                   <a
//                     href={link.href}
//                     className="text-light-gray/70 hover:text-accent transition-colors text-sm inline-block"
//                   >
//                     {link.name}
//                   </a>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Right - Social Links */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="text-center md:text-right"
//           >
//             <h4 className="text-xl font-bold gradient-text mb-4">
//               Connect With Me
//             </h4>
//             <div className="flex justify-center md:justify-end gap-4">
//               {socialLinks.map((link) => (
//                 <motion.a
//                   key={link.name}
//                   href={link.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   whileHover={{ scale: 1.15, y: -3 }}
//                   whileTap={{ scale: 0.95 }}
//                   className={`p-3 rounded-full glass backdrop-blur-sm border border-white/10 text-light-gray/80 transition-all duration-300 hover:text-white ${link.color}`}
//                   title={link.name}
//                 >
//                   {link.icon}
//                 </motion.a>
//               ))}
//             </div>
//             <p className="text-light-gray/50 text-xs mt-4 hidden md:block">
//               Available for collaborations and opportunities
//             </p>
//           </motion.div>
//         </div>

//         {/* Divider */}
//         <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="text-light-gray/60 text-sm text-center md:text-left"
//           >
//             © {currentYear} {profile?.name || "Nikunj Rana"}. All rights reserved.
//           </motion.p>
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="text-light-gray/50 text-sm flex items-center gap-1"
//           >
//             Made with <FaHeart className="text-accent text-xs animate-pulse" /> using MERN Stack
//           </motion.p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;