import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroShade}></div>

        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>Maritime Training Platform</div>

            <h1 className={styles.title}>
              Empowering Maritime Professionals Worldwide
            </h1>

            <p className={styles.subtitle}>
              MuirEolais helps maritime companies manage crew training,
              certification, compliance, and fleet learning performance through
              one secure contract-based platform.
            </p>

            <div className={styles.actions}>
              <a href="/contacts" className={styles.primaryButton}>
                Book a Demo
                <span>→</span>
              </a>

              <a href="/contacts" className={styles.secondaryButton}>
                Talk to Sales
                <span>👥</span>
              </a>
            </div>

            <div className={styles.accessNote}>
              <span></span>
              Crew access is activated after company onboarding
            </div>
          </div>
        </div>

        <div className={styles.statsWrap}>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <div className={styles.statIcon}>📖</div>
              <div>
                <strong>250+</strong>
                <span>Training Modules</span>
              </div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statIcon}>👥</div>
              <div>
                <strong>25K+</strong>
                <span>Professionals Trained</span>
              </div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statIcon}>🚢</div>
              <div>
                <strong>500+</strong>
                <span>Partner Vessels</span>
              </div>
            </div>

            <div className={styles.statItem}>
              <div className={styles.statIcon}>🌍</div>
              <div>
                <strong>40+</strong>
                <span>Countries</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <div className={styles.featureGrid}>
          <article className={styles.featureCard}>
            <div className={styles.featureIcon}>🔒</div>
            <div>
              <h3>Contract-Based Access</h3>
              <p>Secure company-controlled access for your entire fleet.</p>
              <a href="/contacts">Learn more →</a>
            </div>
          </article>

          <article className={styles.featureCard}>
            <div className={styles.featureIcon}>🎓</div>
            <div>
              <h3>Crew Training Management</h3>
              <p>
                Assign courses, track progress, and build a skilled workforce.
              </p>
              <a href="/contacts">Learn more →</a>
            </div>
          </article>

          <article className={styles.featureCard}>
            <div className={styles.featureIcon}>📋</div>
            <div>
              <h3>Certificates & Compliance</h3>
              <p>
                Issue, monitor, and renew certificates with full visibility.
              </p>
              <a href="/contacts">Learn more →</a>
            </div>
          </article>

          <article className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <div>
              <h3>Company Analytics</h3>
              <p>Gain insights and reports to improve training performance.</p>
              <a href="/contacts">Learn more →</a>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.infoSection}>
        <div className={styles.howItWorks}>
          <h2>How it works</h2>

          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepIcon}>
                🏢
                <div className={styles.stepNumber}>1</div>
              </div>
              <h3>Company Onboarding</h3>
              <p>
                We set up your company contract, fleet access, and private
                platform environment.
              </p>
            </div>

            <div className={styles.stepLine}></div>

            <div className={styles.step}>
              <div className={styles.stepIcon}>
                👥
                <div className={styles.stepNumber}>2</div>
              </div>
              <h3>Assign & Train</h3>
              <p>Assign training to crew and monitor progress in real time.</p>
            </div>

            <div className={styles.stepLine}></div>

            <div className={styles.step}>
              <div className={styles.stepIcon}>
                🧾
                <div className={styles.stepNumber}>3</div>
              </div>
              <h3>Certify & Comply</h3>
              <p>
                Certificates are issued, compliance is maintained, and your
                fleet stays ready.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.companyPanel}>
          <div>
            <h2>Built for fleet training control</h2>

            <ul>
              <li>Centralize training across all vessels and departments</li>
              <li>Ensure compliance with international maritime standards</li>
              <li>Track progress, certifications, and renewals in one place</li>
              <li>Secure, private, and accessible from anywhere</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.cta}>
          <div className={styles.ctaIcon}>
            <img src="/images/homeShield.png" alt="" />
          </div>

          <div className={styles.ctaText}>
            <h2>Ready to strengthen your fleet?</h2>
            <p>
              Bring maritime training, certificates, and compliance into one
              secure platform.
            </p>
          </div>

          <div className={styles.ctaActions}>
            <a href="/contacts" className={styles.ctaPrimary}>
              Contact MuirEolais
              <span>→</span>
            </a>

            <a href="/contacts" className={styles.ctaSecondary}>
              Book a Demo
              <span>👥</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
