"use client";
import { useEffect, useState, useRef } from "react";

export default function MouseGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      if (glowRef.current) {
        // Direct DOM manipulation is much more performant than React state for mouse tracking
        glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob-spin {
          0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: rotate(0deg); }
          50% { border-radius: 60% 40% 30% 70% / 50% 60% 40% 60%; transform: rotate(180deg); }
          100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: rotate(360deg); }
        }
        .organic-blob {
          width: 350px;
          height: 250px;
          background-color: rgba(0, 98, 255, 0.34);
          filter: blur(80px);
          animation: blob-spin 10s linear infinite;
        }
      `}} />
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 50,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.4s ease',
          mixBlendMode: 'screen',
          willChange: 'transform',
        }}
      >
        <div className="organic-blob" />
      </div>
    </>
  );
}
