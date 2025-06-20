
import { motion } from 'framer-motion';

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-[#1E1E1E] flex items-center justify-center p-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delayChildren: 0.3,
          staggerChildren: 0.2
        }}
      >
        {/* 404 Number Animation */}
        <motion.div 
          className="flex justify-center gap-4 mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: 1,
            rotate: 0
          }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20
          }}
        >
          <span className="text-9xl font-bold text-white opacity-90">4</span>
          <motion.span 
            className="text-9xl font-bold text-blue-500"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
          >
            0
          </motion.span>
          <span className="text-9xl font-bold text-white opacity-90">4</span>
        </motion.div>

        {/* Main Message */}
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            type: 'spring',
            stiffness: 100,
            delay: 0.5
          }}
        >
          Page Not Found
        </motion.h1>

        <motion.p 
          className="text-gray-400 text-lg md:text-xl max-w-md mx-auto mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            type: 'spring',
            stiffness: 100,
            delay: 0.7
          }}
        >
          Oops! It seems you've wandered off the project path. Let's get you back on track.
        </motion.p>

        {/* Back Button */}
        <motion.a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium
            hover:bg-blue-700 transition-colors duration-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            type: 'spring',
            stiffness: 100,
            delay: 0.9
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Return to Dashboard
        </motion.a>

        {/* Floating particles */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-500 rounded-full"
              initial={{
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
                y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PageNotFound;