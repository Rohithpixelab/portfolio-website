import styles from './Services.module.css';

export default function Services() {
  const services = [
    { title: "UI/UX Design", desc: "Crafting intuitive and engaging user interfaces that solve problems.", icon: "🎨" },
    { title: "Photography", desc: "Capturing moments and products with professional lighting and care.", icon: "📸" },
    { title: "Videography", desc: "Cinematic story telling through high quality video production.", icon: "🎬" },
    { title: "Web Development", desc: "Building fast, responsive, and modern websites optimized for performance.", icon: "💻" }
  ];

  return (
    <section id="services" className={`section ${styles.servicesSection}`}>
      <div className="container">
        <p className={styles.label}>Expertise</p>
        <h2 className="section-title">Services Rendered</h2>
        <div className={styles.grid}>
          {services.map((s, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.icon}>{s.icon}</div>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.desc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
