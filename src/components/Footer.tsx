import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.logo}>Rohith S.</div>
        <div className={styles.copy}>
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>
        <div className={styles.socials}>
          <a href="#" className={styles.link}>Twitter</a>
          <a href="#" className={styles.link}>LinkedIn</a>
          <a href="#" className={styles.link}>Dribbble</a>
          <a href="#" className={styles.link}>GitHub</a>
        </div>
      </div>
    </footer>
  );
}
