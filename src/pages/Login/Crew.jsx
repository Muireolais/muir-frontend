import { useState } from "react";
import styles from "../../styles/Pages.module.css";
import { useNavigate } from "react-router-dom";
import login from "../../API/post/login";

const Crew = () => {
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState("crew");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await login({
      loginType,
      fullName,
      password,
    });

    if (token) {
      navigate("/profile");
    } else {
      setError(true);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError(false);
  };

  const inputClass = `${styles.input} ${error ? styles.incorrect : ""}`;

  return (
    <div className={styles.pageCenter}>
      <div className={styles.card}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <span className={styles.overline}>Crew Portal</span>
            <h2>Crew learning</h2>
            <p>Continue assigned safety training and view your progress.</p>
          </div>

          <input
            type="text"
            value={fullName}
            onChange={handleInputChange(setFullName)}
            placeholder="Full name"
            className={`${styles.input} ${error ? styles.incorrect : ""}`}
          />

          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleInputChange(setPassword)}
              placeholder="Password"
              className={`${styles.input} ${error ? styles.incorrect : ""}`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.eyeButton}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          {error && (
            <div className={styles.errorBox}>Incorrect login or password</div>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className={styles.backButton}
            >
              Back
            </button>

            <button type="submit" className={styles.loginButton}>
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Crew;
