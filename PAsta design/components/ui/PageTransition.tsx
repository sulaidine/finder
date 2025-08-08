import React from 'react';
import { motion } from 'motion/react';

interface PageTransitionProps {
  children: React.ReactNode;
  direction?: 'forward' | 'backward';
  className?: string;
}

export function PageTransition({ 
  children, 
  direction = 'forward', 
  className = '' 
}: PageTransitionProps) {
  const slideVariants = {
    initial: {
      x: direction === 'forward' ? 50 : -50,
      opacity: 0,
    },
    in: {
      x: 0,
      opacity: 1,
    },
    out: {
      x: direction === 'forward' ? -50 : 50,
      opacity: 0,
    },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4,
  };

  return (
    <motion.div
      className={`w-full ${className}`}
      initial="initial"
      animate="in"
      exit="out"
      variants={slideVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}