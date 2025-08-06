
import React from 'react';
import { motion } from 'framer-motion';

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-60">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary"
      />
    </div>
  );
};

export default Loading;
