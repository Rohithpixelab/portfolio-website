import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          Rohith S
        </Link>
        <div className={styles.links}>
          <Link href="#work" className={styles.link}>Work</Link>
          <Link href="#about" className={styles.link}>About</Link>
          <Link href="#contact" className={styles.link}>Contact</Link>
        </div>
        <div className={styles.actions}>
          <a href="#contact" className="btn btn-primary">Hire Me</a>
        </div>
      </div>
    </nav>
  );
}
