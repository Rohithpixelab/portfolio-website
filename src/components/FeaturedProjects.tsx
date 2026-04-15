import Image from 'next/image';
import Link from 'next/link';
import styles from './FeaturedProjects.module.css';
import projectsData from '../data/projects.json';
import { getPayload } from 'payload';
import configPromise from '../payload.config';

export default async function FeaturedProjects() {
  let projects: any[] = [];
  let hasMore = false;
  try {
    const payload = await getPayload({ config: configPromise });
    const docs = await payload.find({
      collection: 'projects',
      where: {
        showOnHome: {
          equals: true,
        },
      },
      limit: 4,
    });
    // Payload docs fetched successfully
    console.log(`Fetched ${docs.docs.length} featured projects from CMS`);
    projects = docs.docs || [];
    hasMore = (docs.totalDocs || 0) > 4;
  } catch (error) {
    // Fallback if Supabase/Database is not yet connected
    console.error("Payload CMS connection error:", error);
    projects = [];
    hasMore = projectsData.length > 4;
  }

  // Use fallback if the CMS is connected but empty
  const displayProjects = (projects && projects.length > 0) ? projects : projectsData.slice(0, 4);
  if (!projects || projects.length === 0) hasMore = projectsData.length > 4;

  return (
    <section id="work" className={`section ${styles.projectsSection}`}>
      <div className="container">
        <p className={styles.label}>Selected Work</p>
        <h2 className="section-title">Featured Projects</h2>
        <div className={styles.grid}>
          {displayProjects.map((p: any, idx: number) => {
            const cssClass = styles[p.class] || '';
            const projectId = p.id || idx;
            
            // Extract the secure Media URL
            // Payload 3.0 provides absolute URLs for S3 and relative for local media
            const srcUrl = p.coverMedia?.url || p.img || '';
            
            // Check if it's a raw video file from Payload, or an external link
            const isPayloadVideo = p.coverMedia?.mimeType?.startsWith('video/');
            const isExternalVideo = false; // We moved this to the gallery array for details pages!

            // Only CMS projects have a valid detail page
            const hasDetailPage = !!p.coverMedia;
            const CardWrapper = hasDetailPage
              ? ({ children }: { children: React.ReactNode }) => (
                  <Link href={`/project/${projectId}`} className={`${styles.card} ${cssClass}`}>
                    {children}
                  </Link>
                )
              : ({ children }: { children: React.ReactNode }) => (
                  <div className={`${styles.card} ${cssClass}`}>
                    {children}
                  </div>
                );
            
            return (
              <CardWrapper key={projectId}>
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
              </CardWrapper>
            );
          })}
        </div>
        <div className={styles.moreContainer}>
          <Link href="/works" className="btn btn-secondary">
            View all works
          </Link>
        </div>
      </div>
    </section>
  );
}
