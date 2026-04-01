import Image from 'next/image';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <section id="about" className={`section ${styles.experienceSection}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.imageContainer}>
          <Image src="/designer_portrait.png" alt="Designer Portrait" fill className={styles.image} />
        </div>
        <div className={styles.content}>
          <p className={styles.label}>Who I Am</p>
          <h2 className={styles.title}>Visual Experience Designer.</h2>
          <p className={styles.desc}>
            I bridge the gap between design and functionality. I create digital products, 
            websites, and brand identities that stand out.
          </p>
          <p className={styles.desc}>
            I believe that great design is not just about looking good, it's about making a 
            meaningful impact. Let's work together to bring your vision to life.
          </p>
          <div className={styles.stats}>
            <div>
              <h4 className={styles.statNum}>120+</h4>
              <p className={styles.statLabel}>Projects Completed</p>
            </div>
            <div>
              <h4 className={styles.statNum}>15</h4>
              <p className={styles.statLabel}>Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
