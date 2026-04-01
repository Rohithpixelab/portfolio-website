"use client";
import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

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
        <div className={styles.badge}>
          ROHITH S
        </div>
        <h1 className={styles.title}>
          I design and create <span className="text-gradient">digital experiences</span> that looks good and performs.
        </h1>
        <p className={styles.subtitle}>
          UI/UX Designer &bull; Visual Storyteller &bull; Product Builder
        </p>
        <div className={styles.actions}>
          <a href="#contact" className="btn btn-primary">Let’s Build Something</a>
          <a href="#work" className="btn btn-secondary">View works</a>
        </div>
      </div>
    </section>
  );
}
