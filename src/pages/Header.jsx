import { NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  const routes = [
    { path: "/", label: "Home" },
    { path: "/news", label: "News" },
    { path: "/about", label: "About Us" },
    { path: "/contacts", label: "Contact" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          <img src="/images/Logo.svg" alt="MuirEolais" />
        </a>

        <nav className={styles.nav}>
          {routes.map((route) => (
            <NavLink
              key={route.label}
              to={route.path}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              {route.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.right}>
          <div className={styles.search}>
            <input type="text" placeholder="Search platform, certificates..." />
            <span>⌕</span>
          </div>

          <button className={styles.loginButton} onClick={() => navigate("/login")}>
            Log In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;