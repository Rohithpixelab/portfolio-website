import Image from 'next/image';
import styles from './VisualVoid.module.css';

export default function VisualVoid() {
  const images = [
    "/project_aurora.png",
    "/project_synth.png",
    "/project_vector.png",
    "/project_city.png"
  ];
  return (
    <section className={`section ${styles.voidSection}`}>
      <div className="container">
        <h2 className={styles.voidTitle}>The Visual Void</h2>
        <div className={styles.gallery}>
          {images.map((src, i) => (
            <div key={i} className={styles.imageWrapper}>
              <Image src={src} alt="Visual" fill className={styles.image} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
