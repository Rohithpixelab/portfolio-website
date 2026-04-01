import styles from './Protocol.module.css';

export default function Protocol() {
  const steps = [
    { num: "01", title: "Discovery", desc: "Understanding your goals and vision" },
    { num: "02", title: "Design", desc: "Creating the visual aesthetics and UX" },
    { num: "03", title: "Dev", desc: "Building the solution with modern tech" },
    { num: "04", title: "Launch", desc: "Deploying and delivering the final product" }
  ];

  return (
    <section className={`section ${styles.protocolSection}`}>
      <div className="container">
        <h2 className={styles.sectionTitle}>The Protocol</h2>
        <div className={styles.timeline}>
          {steps.map((step, idx) => (
            <div key={idx} className={styles.step}>
              <div className={styles.marker}>{step.num}</div>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.desc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
