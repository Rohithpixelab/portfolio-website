'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './ProjectPage.module.css';

export default function ProjectGallery({ gallery }: { gallery: any[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (activeIndex === null) return;
    if (e.key === 'Escape') setActiveIndex(null);
    if (e.key === 'ArrowLeft') setActiveIndex(prev => prev !== null ? (prev === 0 ? gallery.length - 1 : prev - 1) : null);
    if (e.key === 'ArrowRight') setActiveIndex(prev => prev !== null ? (prev === gallery.length - 1 ? 0 : prev + 1) : null);
  }, [activeIndex, gallery.length]);

  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, handleKeyDown]);

  if (!gallery || gallery.length === 0) return null;

  const isIframeUrl = (url: string) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com');
  };

  const activeMediaData = activeIndex !== null ? gallery[activeIndex] : null;
  const activeMediaUrl = activeMediaData?.media?.url || '';
  const isActiveVideo = activeMediaData?.media?.mimeType?.startsWith('video/') || !!activeMediaData?.videoUrl;
  const isActiveIframe = !!activeMediaData?.videoUrl && isIframeUrl(activeMediaData.videoUrl);
  const activeVideoSrc = activeMediaData?.videoUrl || activeMediaUrl;

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex(prev => prev !== null ? (prev === gallery.length - 1 ? 0 : prev + 1) : null);
  };

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex(prev => prev !== null ? (prev === 0 ? gallery.length - 1 : prev - 1) : null);
  };

  return (
    <>
      <section className={styles.gallerySection}>
        <div className="container">
          <h2 className={styles.galleryTitle}>Project Gallery</h2>
          <div className={styles.galleryGrid}>
            {gallery.map((item: any, idx: number) => {
              const mediaUrl = item.media?.url || '';
              const isVideo = item.media?.mimeType?.startsWith('video/') || !!item.videoUrl;
              const isIframe = !!item.videoUrl && isIframeUrl(item.videoUrl);
              const videoSrc = item.videoUrl || mediaUrl;
              const sizeClass = styles[`gallery_${item.size || 'normal'}`] || '';

              return (
                <div 
                  key={idx} 
                  className={`${styles.galleryItem} ${sizeClass}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  {isVideo ? (
                    <div className={styles.videoThumbnailWrapper}>
                      {isIframe ? (
                        <iframe
                          src={item.videoUrl}
                          title={`Gallery video ${idx + 1}`}
                          className={styles.galleryMedia}
                          style={{ pointerEvents: 'none' }} 
                          allow="encrypted-media"
                        />
                      ) : (
                        <video
                          src={videoSrc}
                          className={styles.galleryMedia}
                          style={{ pointerEvents: 'none' }}
                        />
                      )}
                      <div className={styles.playBadge}>
                        <div className={styles.playIcon}></div>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={mediaUrl}
                      alt={item.media?.alt || `Gallery image ${idx + 1}`}
                      width={item.media?.width || 1200}
                      height={item.media?.height || 800}
                      className={styles.galleryMedia}
                      style={{ pointerEvents: 'none' }} // to prevent image dragging intercepting clicks
                    />
                  )}
                  {/* hover overlay hint */}
                  <div className={styles.galleryItemHover}>
                    <span className={styles.galleryItemHoverIcon}>⛶</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {activeIndex !== null && (
        <div className={styles.lightbox} onClick={() => setActiveIndex(null)}>
          <button className={styles.closeLightbox} onClick={(e) => {
            e.stopPropagation();
            setActiveIndex(null);
          }}>×</button>
          
          {gallery.length > 1 && (
            <>
              <button className={`${styles.lightboxNav} ${styles.lightboxPrev}`} onClick={goPrev}>‹</button>
              <button className={`${styles.lightboxNav} ${styles.lightboxNext}`} onClick={goNext}>›</button>
            </>
          )}
          
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            {isActiveVideo ? (
              isActiveIframe ? (
                <iframe
                  src={activeVideoSrc}
                  className={styles.lightboxMediaIframe}
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                />
              ) : (
                <video
                  src={activeVideoSrc}
                  controls
                  autoPlay
                  className={styles.lightboxMediaVideo}
                />
              )
            ) : (
              <Image
                src={activeMediaUrl}
                alt="Enlarged gallery view"
                fill
                className={styles.lightboxMediaImage}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
