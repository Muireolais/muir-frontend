import styles from "../styles/ProfileSidebar.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const token = localStorage.getItem("accessToken");
  const role = token ? jwtDecode(token).role : null;

  const navItems = [
    {
      label: "Profile",
      path: "/profile",
      hint: "Personal details",
      icon: "👤",
    },
    {
      label: "My Courses",
      path: "/profile/courses",
      hint: "Assigned learning",
      icon: "📘",
    },
    {
      label: "Progress",
      path: "/profile/statistic",
      hint: "Training overview",
      icon: "📈",
    },
    {
      label: "Certificates",
      path: "/profile/certificates",
      hint: "My documents",
      icon: "🏅",
    },
    {
      label: "Settings",
      path: "/profile/settings",
      hint: "Account options",
      icon: "⚙️",
    },

    ...(role === "master"
      ? [
          {
            label: "Crew Management",
            path: "/profile/crew-management",
            hint: "Manage assigned crew",
            icon: "👥",
          },
        ]
      : []),
  ];

  return (
    <aside className={styles.container}>
      <div className={styles.logoBlock}>
        <button
          type="button"
          className={styles.logoButton}
          onClick={() => navigate("/")}
          aria-label="Go to homepage"
        >
          <div className={styles.logo} />
        </button>

        <div className={styles.brandText}>
          <span className={styles.brandTitle}>Muireolais</span>
          <span className={styles.brandSubtitle}>Crew Portal</span>
        </div>
      </div>

      <div className={styles.sectionTitle}>Learning</div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const active = pathname === item.path;

          return (
            <button
              key={item.path}
              type="button"
              className={`${styles.navItem} ${active ? styles.active : ""}`}
              onClick={() => navigate(item.path)}
            >
              <span className={styles.iconWrap}>{item.icon}</span>

              <span className={styles.navText}>
                <span className={styles.navMain}>{item.label}</span>
                <span className={styles.navHint}>{item.hint}</span>
              </span>
            </button>
          );
        })}
      </nav>

      <div className={styles.statusBox}>
        <span className={styles.statusLabel}>Current course</span>
        <span className={styles.statusTitle}>Offshore Induction</span>
        <span className={styles.statusMeta}>3 of 6 lessons completed</span>

        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: "50%" }} />
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
