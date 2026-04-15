'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function TopLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start loading animation on pathname change
    setLoading(true);
    setProgress(0);

    if (timerRef.current) clearInterval(timerRef.current);

    // Simulate progress
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    // After a short delay, hide the loader (as the new page should be rendering)
    const endTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }, 500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      clearTimeout(endTimer);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ width: '0%', opacity: 1 }}
          animate={{ width: `${progress}%`, opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #0C69FF, #ADC6FF)',
            zIndex: 9999,
            boxShadow: '0 0 10px rgba(12, 105, 255, 0.5)',
          }}
        />
      )}
    </AnimatePresence>
  );
}
