import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={`section ${styles.hero}`}>
      <div className={styles.grid} />
      
      <div className={`container ${styles.container} ${styles.content}`}>
        <div className={styles.badge}>
          ROHITH S
        </div>
        <h1 className={styles.title}>
          I design and create <span className="text-gradient">digital experiences</span> that look good and perform.
        </h1>
        <p className={styles.subtitle}>
          UI/UX Designer &bull; Web Developer &bull; Photographer &bull; Editor
        </p>
        <div className={styles.actions}>
          <a href="#contact" className="btn btn-primary">Hire Me</a>
          <a href="#work" className="btn btn-secondary">See Work</a>
        </div>
      </div>
    </section>
  );
}
