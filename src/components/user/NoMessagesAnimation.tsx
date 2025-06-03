import { motion } from 'framer-motion';
import { BsChat } from 'react-icons/bs';
import { FC } from 'react';


const NoMessagesAnimation: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500">
      <motion.div
        animate={{
          scale: [1, 1.2, 1], 
          rotate: [0, 10, -10, 0], 
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
        }}
        className="mb-4"
      >
        <BsChat size={64} className="text-blue-500" />
      </motion.div>
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }} 
        transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
        className="text-lg font-medium"
      >
        No messages yet... Start the conversation!
      </motion.p>
    </div>
  );
};

export default NoMessagesAnimation;