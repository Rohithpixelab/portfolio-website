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
          <a href="https://wa.me/919747658876?text=Hi%20Rohith,%20I%20would%20like%20to%20hire%20you%20for%20a%20project!" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Connect now</a>
        </div>
      </div>
    </nav>
  );
}
