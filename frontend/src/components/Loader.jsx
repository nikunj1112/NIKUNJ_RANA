// import { motion } from 'framer-motion';

// const Loader = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-primary-dark">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="text-center"
//       >
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
//           className="w-20 h-20 mx-auto mb-6"
//         >
//           <div className="relative w-full h-full">
//             <div className="absolute inset-0 rounded-full border-4 border-accent/30" />
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
//               className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent"
//             />
//           </div>
//         </motion.div>
//         <motion.h2
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="text-2xl font-bold gradient-text"
//         >
//           Nikunj Rana
//         </motion.h2>
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="text-light-gray/70 mt-2"
//         >
//           Loading Portfolio...
//         </motion.p>
//       </motion.div>
//     </div>
//   );
// };

// export default Loader;


import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-dark relative overflow-hidden">
      {/* Animated background gradient orbs */}
      <motion.div
        className="absolute w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0, -100, 0],
          y: [0, -100, 0, 100, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-soft-blue/5 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0, 80, 0],
          y: [0, 80, 0, -80, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear', delay: 2 }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10"
      >
        {/* Animated Spinner Container */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-24 h-24 mx-auto mb-8 relative"
        >
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-accent/20" />
          {/* Inner spinning ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-accent border-r-accent/50"
          />
          {/* Pulse dot in center */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-3 h-3 bg-accent rounded-full" />
          </motion.div>
        </motion.div>

        {/* Name with staggered letter animation */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold gradient-text"
          >
            Nikunj Rana
          </motion.h2>
        </div>

        {/* Animated loading text with dots */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-light-gray/70 mt-3 flex items-center justify-center gap-1"
        >
          Loading Portfolio
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
          >
            .
          </motion.span>
        </motion.p>

        {/* Optional: subtle progress bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="h-0.5 bg-gradient-to-r from-accent/20 via-accent to-accent/20 mt-8 rounded-full max-w-[200px] mx-auto"
        />
      </motion.div>
    </div>
  );
};

export default Loader;