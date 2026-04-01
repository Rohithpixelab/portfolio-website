import Image from 'next/image';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <section id="about" className={`section ${styles.experienceSection}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.imageContainer}>
          <Image src="/experience_portrait.jpg" alt="Experience Designer" fill className={styles.image} />
        </div>
        <div className={styles.content}>
          <p className={styles.label}>Who I Am</p>
          <h2 className={styles.title}>Visual Experience Designer.</h2>
          <p className={styles.desc}>
            I’m a UI/UX designer and digital creator focused on building high-impact products and visuals.
          </p>
          <p className={styles.desc}>
            I work at the intersection of:<br />
            &bull; Design (UI/UX)<br />
            &bull; Visual storytelling (Photo &amp; Video)<br />
            &bull; Product building (AI tools, CRM systems)
          </p>
          <p className={styles.desc}>
            I don’t just design screens — I design how businesses operate, scale, and communicate.
          </p>
        </div>
      </div>
    </section>
  );
}
