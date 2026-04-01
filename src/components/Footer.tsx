import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.logo}>Rohith S.</div>
        <div className={styles.copy}>
          &copy; {new Date().getFullYear()} All rights reserved Pixelab Medias.
        </div>
        <div className={styles.socials}>
          <a href="https://github.com/Rohithpixelab" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
          <a href="https://www.linkedin.com/in/ux-rohiths/" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
          <a href="https://www.instagram.com/ux.rohith/" target="_blank" rel="noopener noreferrer" className={styles.link}>Instagram</a>
        </div>
      </div>
    </footer>
  );
}
