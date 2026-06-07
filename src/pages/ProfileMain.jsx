import styles from "../styles/ProfileMain.module.css";

const profileData = {
  name: "John",
  surname: "Doe",
  rank: "Master",
  dateOfBirth: "01.01.1970",
  signOn: "25.10.2025",
  signOff: "24.02.2026",
  get Initials() {
    return (this.name.charAt(0) + this.surname.charAt(0)).toUpperCase();
  },
};

const recentlyViewedCourses = [
  {
    title: "Offshore Induction",
    category: "Safety",
    progress: 50,
    duration: "45 min",
    modules: 4,
    exam: 1,
  },
  {
    title: "Fire Safety Procedures",
    category: "Emergency",
    progress: 100,
    duration: "35 min",
    modules: 3,
    exam: 1,
  },
  {
    title: "Man Overboard Response",
    category: "Operations",
    progress: 25,
    duration: "40 min",
    modules: 4,
    exam: 1,
  },
];

const ProfileMain = () => {
  return (
    <div className={styles.page}>
      <section className={styles.heroCard}>
        <div className={styles.profileTop}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>{profileData.Initials}</div>
            <span className={styles.statusBadge}>Active crew</span>
          </div>

          <div className={styles.profileInfo}>
            <span className={styles.overline}>Crew Member Profile</span>
            <h2 className={styles.name}>{profileData.name} {profileData.surname}</h2>
            <p className={styles.role}>Master · Offshore assigned training</p>
          </div>

          <div className={styles.quickStats}>
            <div className={styles.quickStat}>
              <span>Courses</span>
              <b>8</b>
            </div>

            <div className={styles.quickStat}>
              <span>Completed</span>
              <b>5</b>
            </div>

            <div className={styles.quickStat}>
              <span>Avg. score</span>
              <b>88%</b>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.detailsGrid}>
        <div className={styles.infoCard}>
          <h3 className={styles.sectionTitle}>Personal Details</h3>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span>Name</span>
              <b>{profileData.name}</b>
            </div>

            <div className={styles.infoItem}>
              <span>Surname</span>
              <b>{profileData.surname}</b>
            </div>

            <div className={styles.infoItem}>
              <span>Rank</span>
              <b>{profileData.rank}</b>
            </div>

            <div className={styles.infoItem}>
              <span>Date of Birth</span>
              <b>{profileData.dateOfBirth}</b>
            </div>

            <div className={styles.infoItem}>
              <span>Sign on</span>
              <b>{profileData.signOn}</b>
            </div>

            <div className={styles.infoItem}>
              <span>Sign off</span>
              <b>{profileData.signOff}</b>
            </div>
          </div>
        </div>

        <div className={styles.infoCard}>
          <h3 className={styles.sectionTitle}>Training Summary</h3>

          <div className={styles.trainingList}>
            <div className={styles.trainingRow}>
              <span>Overall progress</span>
              <b>63%</b>
            </div>

            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: "63%" }} />
            </div>

            <div className={styles.trainingRow}>
              <span>Certificates valid</span>
              <b>4</b>
            </div>

            <div className={styles.trainingRow}>
              <span>Pending courses</span>
              <b>3</b>
            </div>

            <div className={styles.trainingRow}>
              <span>Next expiry</span>
              <b>24.02.2026</b>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.coursesSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>Recently viewed courses</h3>
            <p className={styles.sectionSubtitle}>
              Continue learning from where you left off.
            </p>
          </div>

          <button type="button" className={styles.viewAllButton}>
            View all courses
          </button>
        </div>

        <div className={styles.courseGrid}>
          {recentlyViewedCourses.map((course) => (
            <article key={course.title} className={styles.courseCard}>
              <div className={styles.courseImage}>
                <span>{course.category}</span>
              </div>

              <div className={styles.courseBody}>
                <h4 className={styles.courseTitle}>{course.title}</h4>

                <div className={styles.tags}>
                  <span>#{course.category}</span>
                  <span>#Maritime</span>
                </div>

                <div className={styles.courseMeta}>
                  <span>{course.duration}</span>
                  <span>{course.modules} modules</span>
                  <span>{course.exam} exam</span>
                </div>

                <div className={styles.courseProgressHeader}>
                  <span>Progress</span>
                  <b>{course.progress}%</b>
                </div>

                <div className={styles.courseProgressTrack}>
                  <div
                    className={styles.courseProgressFill}
                    style={{ width: `${course.progress}%` }}
                  >
                    <div
                      className={styles.courseProgressGradient}
                      style={{
                        width:
                          course.progress > 0
                            ? `${100 / (course.progress / 100)}%`
                            : "100%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfileMain;