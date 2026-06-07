import styles from "../styles/CompanyPageHeader.module.css";

const CompanyPageHeader = () => {
  return (
    <header className={styles.container}>
      <div className={styles.leftBlock}>
        <span className={styles.pageOverline}>Company</span>
        <div className={styles.pageTitleRow}>
          <h1 className={styles.pageTitle}>Fleet Management</h1>
          <span className={styles.pageBadge}>13 vessels</span>
        </div>
      </div>

      <div className={styles.rightBlock}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Notifications"
        >
          <span className={styles.notificationIcon} />
        </button>

        <button
          type="button"
          className={styles.profileButton}
          aria-label="Profile"
        >
          <span className={styles.avatarCircle}>M</span>

          <span className={styles.profileMeta}>
            <span className={styles.profileName}>Dixstone</span>
            <span className={styles.profileRole}>Company account</span>
          </span>
        </button>
      </div>
    </header>
  );
};

export default CompanyPageHeader;