import { getPayload } from 'payload';
import configPromise from '../../../payload.config';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import styles from './Works.module.css';
import projectsData from '../../../data/projects.json';

export const dynamic = 'force-dynamic';

export default async function WorksPage() {
  let projects: any[] = [];
  
  try {
    const payload = await getPayload({ config: configPromise });
    const docs = await payload.find({
      collection: 'projects',
      limit: 100, // Fetch up to 100 projects
      sort: '-createdAt' // Optional sorting, can be adjusted
    });
    // Payload docs fetched successfully
    projects = docs.docs || [];
  } catch (error) {
    // Fallback if Supabase/Database is not yet connected
    console.error("Payload CMS connection error:", error);
    projects = [];
  }

  // Use fallback if the CMS is connected but empty
  const displayProjects = (projects && projects.length > 0) ? projects : projectsData;

  return (
    <main className={styles.page}>
      <Navbar />
      
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>All Works</h1>
          <p className={styles.subtitle}>A collection of all my recent projects and case studies.</p>
        </header>

        <div className={styles.grid}>
          {displayProjects.map((p: any, idx: number) => {
            const projectId = p.id || idx;
            
            // Extract the secure Media URL
            // Payload 3.0 provides absolute URLs for S3 and relative for local media
            const srcUrl = p.coverMedia?.url || p.img || '';
            
            // Check if it's a raw video file from Payload
            const isPayloadVideo = p.coverMedia?.mimeType?.startsWith('video/');

            // Only CMS projects have a valid detail page
            const hasDetailPage = !!p.coverMedia;
            const CardWrapper = hasDetailPage
              ? ({ children }: { children: React.ReactNode }) => (
                  <Link href={`/project/${projectId}`} className={styles.card}>
                    {children}
                  </Link>
                )
              : ({ children }: { children: React.ReactNode }) => (
                  <div className={styles.card}>
                    {children}
                  </div>
                );
            
            return (
              <CardWrapper key={projectId}>
                {isPayloadVideo ? (
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
      </div>

      <Footer />
    </main>
  );
}
