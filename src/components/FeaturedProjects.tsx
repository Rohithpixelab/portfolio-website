import Image from 'next/image';
import styles from './FeaturedProjects.module.css';
import projectsData from '../data/projects.json';

export default function FeaturedProjects() {
  return (
    <section id="work" className={`section ${styles.projectsSection}`}>
      <div className="container">
        <p className={styles.label}>Selected Work</p>
        <h2 className="section-title">Featured Projects</h2>
        <div className={styles.grid}>
          {projectsData.map((p) => {
            const cssClass = styles[p.class] || '';
            return (
              <div key={p.id} className={`${styles.card} ${cssClass}`}>
                <Image src={p.img} alt={p.title} fill className={styles.image} />
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
