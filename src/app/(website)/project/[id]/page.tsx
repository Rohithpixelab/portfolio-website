import { getPayload } from 'payload';
import configPromise from '../../../../payload.config';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
import ProjectGallery from './ProjectGallery';
import styles from './ProjectPage.module.css';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const payload = await getPayload({ config: configPromise });

  // Fetch the current project with its cover media and gallery media populated
  const project = await payload.findByID({
    collection: 'projects',
    id,
    depth: 2,
  }).catch(() => null);

  if (!project) {
    notFound();
  }

  // Fetch all projects for the "next project" navigation
  const allProjects = await payload.find({
    collection: 'projects',
    limit: 100,
    sort: 'createdAt',
  });

  // Determine the next project in the list
  const currentIndex = allProjects.docs.findIndex((p: any) => String(p.id) === String(id));
  const nextProject = allProjects.docs[(currentIndex + 1) % allProjects.docs.length];

  // Cover media
  const coverUrl = (project as any).coverMedia?.url || '';
  const isCoverVideo = (project as any).coverMedia?.mimeType?.startsWith('video/');

  // Tech stack parsing (comma separated strings)
  const parseList = (str?: string) =>
    str ? str.split(',').map((s: string) => s.trim()).filter(Boolean) : [];

  const designTools = parseList((project as any).techStack?.designTools);
  const development = parseList((project as any).techStack?.development);
  const captureMedia = parseList((project as any).techStack?.captureMedia);
  const techQuote = (project as any).techStack?.quote || '';

  // External link
  const externalLink = (project as any).externalLink || '';
  const externalLinkLabel = (project as any).externalLinkLabel || 'View Live Project';

  // Base Gallery items (array block)
  const baseGallery: any[] = (project as any).gallery || [];
  
  // Bulk Upload Gallery items (hasMany relationship)
  const bulkGallery: any[] = (project as any).bulkGallery || [];

  // Merge both into a single format for the renderer
  const combinedGallery = [
    ...baseGallery,
    ...bulkGallery.map(mediaDoc => ({
      media: mediaDoc,
      videoUrl: null,
      size: 'normal'
    }))
  ];

  // Next project cover
  const nextCoverUrl = (nextProject as any)?.coverMedia?.url || '';
  const isNextCoverVideo = (nextProject as any)?.coverMedia?.mimeType?.startsWith('video/');

  return (
    <main className={styles.page}>
      <Navbar />

      {/* ─── HERO ─── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          {isCoverVideo ? (
            <video
              src={coverUrl}
              autoPlay
              loop
              muted
              playsInline
              className={styles.heroMedia}
            />
          ) : coverUrl ? (
            <Image
              src={coverUrl}
              alt={(project as any).title}
              fill
              priority
              className={styles.heroMedia}
            />
          ) : null}
          <div className={styles.heroOverlay} />
        </div>

        <div className={`container ${styles.heroContent}`}>
          {(project as any).category && (
            <span className={styles.categoryBadge}>{(project as any).category}</span>
          )}
          <h1 className={styles.heroTitle}>{(project as any).title}</h1>

          <div className={styles.metaRow}>
            {(project as any).role && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Role</span>
                <span className={styles.metaValue}>{(project as any).role}</span>
              </div>
            )}
            {(project as any).date && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Date</span>
                <span className={styles.metaValue}>{(project as any).date}</span>
              </div>
            )}
            {(project as any).client && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Client</span>
                <span className={styles.metaValue}>{(project as any).client}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── ABOUT + TECH STACK ─── */}
      <section className={styles.aboutSection}>
        <div className={`container ${styles.aboutGrid}`}>
          {/* Left — Heading & Description */}
          <div className={styles.aboutLeft}>
            {(project as any).heading && (
              <h2 className={styles.aboutHeading}>
                {(project as any).heading.split('\n').map((line: string, i: number) => (
                  <span key={i}>
                    {line}
                    {i < (project as any).heading.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </h2>
            )}
            {(project as any).description && (
              <div className={styles.aboutDescription}>
                {(project as any).description.split('\n\n').map((para: string, i: number) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}

            {externalLink && (
              <div className={styles.externalLinkContainer}>
                <a href={externalLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.85rem 2rem' }}>
                  {externalLinkLabel}
                  <span style={{ marginLeft: '0.6rem', fontSize: '1.2em' }}>↗</span>
                </a>
              </div>
            )}
          </div>

          {/* Right — Tech Stack Card */}
          {(designTools.length > 0 || development.length > 0 || captureMedia.length > 0 || techQuote) && (
            <div className={styles.techCard}>
              <h3 className={styles.techCardTitle}>
                <span className={styles.techIcon}>⚡</span> Technical Stack
              </h3>

              {designTools.length > 0 && (
                <div className={styles.techGroup}>
                  <span className={styles.techGroupLabel}>Design Tools</span>
                  <div className={styles.techPills}>
                    {designTools.map((tool: string, i: number) => (
                      <span key={i} className={styles.pill}>{tool}</span>
                    ))}
                  </div>
                </div>
              )}

              {development.length > 0 && (
                <div className={styles.techGroup}>
                  <span className={styles.techGroupLabel}>Development</span>
                  <div className={styles.techPills}>
                    {development.map((tool: string, i: number) => (
                      <span key={i} className={styles.pill}>{tool}</span>
                    ))}
                  </div>
                </div>
              )}

              {captureMedia.length > 0 && (
                <div className={styles.techGroup}>
                  <span className={styles.techGroupLabel}>Capture & Media</span>
                  <div className={styles.techPills}>
                    {captureMedia.map((tool: string, i: number) => (
                      <span key={i} className={styles.pill}>{tool}</span>
                    ))}
                  </div>
                </div>
              )}

              {techQuote && (
                <blockquote className={styles.techQuote}>
                  &ldquo;{techQuote}&rdquo;
                </blockquote>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ─── IMPACT GALLERY ─── */}
      <ProjectGallery gallery={combinedGallery} />

      {/* ─── NEXT PROJECT ─── */}
      {nextProject && String(nextProject.id) !== String(id) && (
        <section className={styles.nextSection}>
          <Link href={`/project/${nextProject.id}`} className={styles.nextLink}>
            <div className={styles.nextBg}>
              {isNextCoverVideo ? (
                <video
                  src={nextCoverUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={styles.nextMedia}
                />
              ) : nextCoverUrl ? (
                <Image
                  src={nextCoverUrl}
                  alt={(nextProject as any).title}
                  fill
                  className={styles.nextMedia}
                />
              ) : null}
              <div className={styles.nextOverlay} />
            </div>
            <div className={`container ${styles.nextContent}`}>
              <span className={styles.nextLabel}>Next Project</span>
              <h2 className={styles.nextTitle}>{(nextProject as any).title}</h2>
              <span className={styles.nextArrow}>→</span>
            </div>
          </Link>
        </section>
      )}

      <Footer />
    </main>
  );
}
