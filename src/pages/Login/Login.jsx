import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../../API/post/login";
import styles from "../../styles/Login.module.css";

const Login = () => {
  const navigate = useNavigate();

  const [selectedPortal, setSelectedPortal] = useState("crew");
  const [step, setStep] = useState("portal");
  const [error, setError] = useState(false);

  const [showCrewPassword, setShowCrewPassword] = useState(false);
  const [showCompanyCode, setShowCompanyCode] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
    email: "",
    code: "",
  });

  const portalConfig = {
    crew: {
      overline: "Crew portal",
      title: "Crew learning",
      text: "Continue assigned safety training and view your progress.",
      route: "/profile",
    },
    company: {
      overline: "Company portal",
      title: "Company access",
      text: "Sign in using your company email and access code.",
      route: "/company/dashboard",
    },
  };

  const currentPortal = portalConfig[selectedPortal];

  const handlePortalContinue = () => {
    setError(false);
    setStep("login");
  };

  const handleLoginContinue = async () => {
    const token = await login({
      loginType: selectedPortal,
      formData,
    });

    if (!token) {
      setError(true);
      return;
    }

    setError(false);
    navigate(currentPortal.route);
  };

  const handleBack = () => {
    setStep("portal");
    setError(false);
    setShowCrewPassword(false);
    setShowCompanyCode(false);

    setFormData({
      fullName: "",
      password: "",
      email: "",
      code: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError(false);
  };

  return (
      <div className={styles.pageInner}>
        <section className={styles.brandPanel}>
          <div className={styles.logoWrapper} onClick={() => navigate("/")}>
            <img
              src="/images/Muir_icon.svg"
              alt="Muireolais logo"
              className={styles.brandLogo}
            />
          </div>

          <div>
            <span className={styles.brandOverline}>Muireolais</span>
            <h1 className={styles.brandTitle}>
              Maritime safety training, made clear.
            </h1>
            <p className={styles.brandText}>
              Access fleet management tools or continue assigned safety learning
              from one secure platform.
            </p>
          </div>

          <div className={styles.brandStats}>
            <div className={styles.brandStat}>
              <b>24/7</b>
              <span>Learning access</span>
            </div>

            <div className={styles.brandStat}>
              <b>QHSE</b>
              <span>Safety focused</span>
            </div>

            <div className={styles.brandStat}>
              <b>Fleet</b>
              <span>Company ready</span>
            </div>
          </div>
        </section>

        <section className={styles.loginCard}>
          {step === "portal" ? (
            <>
              <div className={styles.cardHeader}>
                <span className={styles.cardOverline}>Welcome back</span>
                <h2 className={styles.cardTitle}>Choose your portal</h2>
                <p className={styles.cardText}>
                  Select the workspace you want to enter.
                </p>
              </div>

              <div className={styles.portalList}>
                <button
                  type="button"
                  className={`${styles.portalButton} ${
                    selectedPortal === "crew" ? styles.portalActive : ""
                  }`}
                  onClick={() => setSelectedPortal("crew")}
                >
                  <span className={styles.portalIcon}>👨‍✈️</span>

                  <span className={styles.portalText}>
                    <span className={styles.portalTitle}>Crew Portal</span>
                    <span className={styles.portalHint}>
                      Courses, progress, certificates
                    </span>
                  </span>

                  <span className={styles.portalCheck}>
                    {selectedPortal === "crew" ? "✓" : ""}
                  </span>
                </button>

                <button
                  type="button"
                  className={`${styles.portalButton} ${
                    selectedPortal === "company" ? styles.portalActive : ""
                  }`}
                  onClick={() => setSelectedPortal("company")}
                >
                  <span className={styles.portalIcon}>🏢</span>

                  <span className={styles.portalText}>
                    <span className={styles.portalTitle}>Company Portal</span>
                    <span className={styles.portalHint}>
                      Fleet, crew overview, subscriptions
                    </span>
                  </span>

                  <span className={styles.portalCheck}>
                    {selectedPortal === "company" ? "✓" : ""}
                  </span>
                </button>
              </div>

              <button
                type="button"
                className={styles.continueButton}
                onClick={handlePortalContinue}
              >
                Continue
              </button>

              <p className={styles.footerText}>
                Masters can manage assigned crew after signing in through the
                relevant portal.
              </p>
            </>
          ) : (
            <>
              <div className={styles.cardHeader}>
                <span className={styles.cardOverline}>
                  {currentPortal.overline}
                </span>
                <h2 className={styles.cardTitle}>{currentPortal.title}</h2>
                <p className={styles.cardText}>{currentPortal.text}</p>
              </div>

              <form className={styles.loginForm}>
                {selectedPortal === "crew" ? (
                  <>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      maxLength={50}
                      className={`${styles.loginInput} ${
                        error ? styles.inputError : ""
                      }`}
                    />

                    <div
                      className={`${styles.passwordField} ${
                        error ? styles.inputError : ""
                      }`}
                    >
                      <input
                        type={showCrewPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        maxLength={20}
                      />

                      <button
                        type="button"
                        className={styles.eyeButton}
                        onClick={() => setShowCrewPassword((prev) => !prev)}
                        aria-label={
                          showCrewPassword ? "Hide password" : "Show password"
                        }
                      >
                        <img
                          src={
                            showCrewPassword
                              ? "/images/eye-on.svg"
                              : "/images/eye-off.svg"
                          }
                          alt=""
                        />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <input
                      type="email"
                      name="email"
                      placeholder="Company email"
                      value={formData.email}
                      onChange={handleChange}
                      maxLength={50}
                      className={`${styles.loginInput} ${
                        error ? styles.inputError : ""
                      }`}
                    />

                    <div
                      className={`${styles.passwordField} ${
                        error ? styles.inputError : ""
                      }`}
                    >
                      <input
                        type={showCompanyCode ? "text" : "password"}
                        name="code"
                        placeholder="Unique access code"
                        value={formData.code}
                        onChange={handleChange}
                      />

                      <button
                        type="button"
                        className={styles.eyeButton}
                        onClick={() => setShowCompanyCode((prev) => !prev)}
                        aria-label={
                          showCompanyCode
                            ? "Hide access code"
                            : "Show access code"
                        }
                      >
                        <img
                          src={
                            showCompanyCode
                              ? "/images/eye-on.svg"
                              : "/images/eye-off.svg"
                          }
                          alt=""
                        />
                      </button>
                    </div>
                  </>
                )}

                {error && (
                  <div className={styles.errorText}>
                    Incorrect credentials. Please try again.
                  </div>
                )}
              </form>

              <div className={styles.loginActions}>
                <button
                  type="button"
                  className={styles.backButton}
                  onClick={handleBack}
                >
                  Back
                </button>

                <button
                  type="button"
                  className={styles.continueButton}
                  onClick={handleLoginContinue}
                >
                  Continue
                </button>
              </div>
            </>
          )}
        </section>
      </div>
  );
};

export default Login;
