// pages/404.tsx
"use client";
// pages/404.tsx
import { motion } from 'framer-motion';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary text-secondary">
      <div className="text-center">
        <motion.h1
          className="text-6xl font-bold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: 'auto' }}
            transition={{ duration: 2, ease: 'easeOut' }}  
            style={{ overflow: 'hidden' }}
            className="block whitespace-nowrap"
          >
            404 - Page Not Found
          </motion.span>
        </motion.h1>

        <Link
          href="/"
          className="px-6 py-3 bg-primary hover:bg-secondary hover:text-white rounded-lg mt-6 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
