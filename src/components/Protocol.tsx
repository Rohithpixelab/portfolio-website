import styles from './Protocol.module.css';

export default function Protocol() {
  const steps = [
    { num: "01", title: "Understand", desc: "I study your business, users, and problems" },
    { num: "02", title: "Design", desc: "I craft intuitive, conversion-focused experiences" },
    { num: "03", title: "Build", desc: "From UI to functional systems" },
    { num: "04", title: "Scale", desc: "Optimize, automate, and improve continuously" }
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
