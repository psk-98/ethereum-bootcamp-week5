import Link from "next/link"
import styles from "../../styles/Nav.module.css"

export default function Nav() {
  return (
    <div className={styles.nav}>
      <div className={styles.logo}>Escrow</div>
      <div className={styles.navLinks}>
        <Link href="/" className={styles.navLink}>
          New Contract
        </Link>
        <Link href="/status" className={styles.navLink}>
          Existing Contract
        </Link>
      </div>
    </div>
  )
}
