import React from 'react';
import { motion } from 'motion/react';

interface LoadingTransitionProps {
  isVisible: boolean;
  message?: string;
}

export function LoadingTransition({ isVisible, message = "Carregando..." }: LoadingTransitionProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="text-center space-y-4">
        <div className="w-12 h-12 mx-auto">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
            <motion.div
              className="absolute top-0 left-0 w-12 h-12 border-4 border-orange-primary border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-subtitle"
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  );
}