"use client";
import { useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './Hero.module.css';

const typingContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const typingChar: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.1, ease: "linear" }
  },
};

const renderText = (text: string) => {
  return text.split('').map((char, index) => (
    <motion.span key={index} variants={typingChar} style={{ whiteSpace: 'pre' }}>
      {char}
    </motion.span>
  ));
};

const revealParent: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 1.6, // Start after title finishes typing
    }
  }
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { left, top } = heroRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      heroRef.current.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={heroRef} className={`section ${styles.hero}`}>
      <div className={styles.grid} />
      <div className={styles.gridRefactor} />
      
      <div className={`container ${styles.container} ${styles.content}`}>
        <motion.div 
          className={styles.badge}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          ROHITH S
        </motion.div>
        
        <motion.h1 
          className={styles.title}
          variants={typingContainer}
          initial="hidden"
          animate="visible"
        >
          {renderText("I design and create ")}
          <motion.span className="text-gradient">
            {renderText("digital")}
          </motion.span>
          <br />
          <motion.span className="text-gradient">
            {renderText("experiences ")}
          </motion.span>
          {renderText("that looks good and")}
          <br />
          {renderText("performs.")}
        </motion.h1>

        <motion.div 
          variants={revealParent} 
          initial="hidden" 
          animate="visible"
        >
          <motion.p variants={revealItem} className={styles.subtitle}>
            UI/UX Designer &bull; Visual Storyteller &bull; Product Builder
          </motion.p>
          <motion.div variants={revealItem} className={styles.actions}>
            <a href="#contact" className="btn btn-primary">Let’s Build Something</a>
            <a href="#work" className="btn btn-secondary">View works</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
