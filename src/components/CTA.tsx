import styles from './CTA.module.css';

export default function CTA() {
  return (
    <section id="contact" className={`section ${styles.ctaSection} dotted-bg`}>
      <div className={`container ${styles.container}`}>
        <h2 className={styles.title}>
          Let's build<br />
          <span className="text-gradient">something great</span>
        </h2>
        <p className={styles.desc}>
          Whether it’s a product, website, system, or visual story — I design, build, and bring it to life.
        </p>
        <div className={styles.actions}>
          <a href="https://wa.me/919747658876?text=Hi%20Rohith,%20I%20would%20like%20to%20hire%20you%20for%20a%20project!" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Connect now</a>
          <a href="#work" className="btn btn-secondary">See Work</a>
        </div>
      </div>
    </section>
  );
}
