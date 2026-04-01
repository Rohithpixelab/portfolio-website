import Image from 'next/image';
import styles from './FeaturedProjects.module.css';
import projectsData from '../data/projects.json';
import { getPayload } from 'payload';
import configPromise from '../payload.config';

export default async function FeaturedProjects() {
  let projects = [];
  
  try {
    const payload = await getPayload({ config: configPromise });
    const docs = await payload.find({
      collection: 'projects',
      limit: 10,
    });
    // Payload docs fetched successfully
    projects = docs.docs;
  } catch (error) {
    // Fallback if Supabase/Database is not yet connected
    console.log("Payload CMS not connected yet. Serving hardcoded projects.");
    projects = projectsData;
  }

  // Use fallback if the CMS is connected but empty
  const displayProjects = projects.length > 0 ? projects : projectsData;

  return (
    <section id="work" className={`section ${styles.projectsSection}`}>
      <div className="container">
        <p className={styles.label}>Selected Work</p>
        <h2 className="section-title">Featured Projects</h2>
        <div className={styles.grid}>
          {displayProjects.map((p: any, idx: number) => {
            const cssClass = styles[p.class] || '';
            const projectId = p.id || idx;
            
            // Extract the secure Media URL, falling back to older direct paths (like the initial JSON data)
            const srcUrl = p.coverMedia?.url || p.img || '';
            
            // Check if it's a raw video file from Payload, or an external link
            const isPayloadVideo = p.coverMedia?.mimeType?.startsWith('video/');
            const isExternalVideo = false; // We moved this to the gallery array for details pages!
            
            return (
              <div key={projectId} className={`${styles.card} ${cssClass}`}>
                {isPayloadVideo || isExternalVideo ? (
                  <video 
                    src={srcUrl} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className={styles.image} 
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                ) : (
                  <Image src={srcUrl} alt={p.title} fill className={styles.image} />
                )}
                <div className={styles.overlay}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
