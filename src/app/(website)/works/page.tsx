import { getPayload } from 'payload';
import configPromise from '../../../payload.config';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import styles from './Works.module.css';
import projectsData from '../../../data/projects.json';

export default async function WorksPage() {
  let projects: any[] = [];
  
  try {
    const payload = await getPayload({ config: configPromise });
    const docs = await payload.find({
      collection: 'projects',
      limit: 100, // Fetch up to 100 projects
      sort: '-createdAt', // Optional sorting, can be adjusted
      depth: 1, // Ensure relationships like coverMedia are populated
    });
    // Payload docs fetched successfully
    projects = docs.docs;
  } catch (error) {
    // Fallback if Supabase/Database is not yet connected
    console.error("Payload CMS connection error:", error);
    console.log("Serving hardcoded projects as fallback.");
    projects = projectsData;
  }

  // Use fallback if the CMS is connected but empty
  const displayProjects = projects.length > 0 ? projects : projectsData;

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
            // Ensure we handle both absolute URLs (S3) and relative URLs (local/dev)
            let srcUrl = p.coverMedia?.url || p.img || '';
            const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
            
            if (srcUrl.startsWith('/') && !srcUrl.startsWith('//')) {
              srcUrl = `${serverUrl}${srcUrl}`;
            }
            
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
