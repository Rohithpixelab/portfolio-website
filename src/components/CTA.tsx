import styles from './CTA.module.css';

export default function CTA() {
  return (
    <section id="contact" className={`section ${styles.ctaSection}`}>
      <div className={`container ${styles.container}`}>
        <h2 className={styles.title}>
          Let's build<br />
          <span className="text-gradient">something great</span>
        </h2>
        <p className={styles.desc}>
          Ready to elevate your digital presence? Let's talk about your next project.
        </p>
        <div className={styles.actions}>
          <a href="mailto:hello@example.com" className="btn btn-primary">Hire Me</a>
          <a href="#work" className="btn btn-secondary">See Work</a>
        </div>
      </div>
    </section>
  );
}
