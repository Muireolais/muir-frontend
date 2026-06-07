import styles from "../styles/Courses.module.css";
import CourseCard from "../components/UI/CourseCard/CourseCard";

const topics = [
  {
    title: "Basic Safety",
    courses: [
      {
        title: "Enclosed Space Entry Training",
        description: "Correct external pump use, sampling checks, and safe enclosed space entry preparation.",
        category: "Safety",
        progress: 0,
        duration: "5 min",
        modules: 1,
        exams: 1,
        status: "Assigned",
        link: "/profile/courses/enclosed_space",
        image: "/images/enclosed_space.jpg",
      },
      {
        title: "Fire Safety Procedures",
        description: "Fire risks, alarm response, and firefighting equipment.",
        category: "Emergency",
        progress: 100,
        duration: "35 min",
        modules: 3,
        exams: 1,
        status: "Completed",
      },
      {
        title: "PPE and Safe Conduct",
        description: "Personal protective equipment and restricted areas.",
        category: "Safety",
        progress: 20,
        duration: "40 min",
        modules: 3,
        exams: 1,
        status: "In progress",
      },
    ],
  },
  {
    title: "Navigation",
    courses: [
      {
        title: "Bridge Watchkeeping",
        description: "Watch duties, lookout responsibilities, and reporting.",
        category: "Navigation",
        progress: 65,
        duration: "1h 20m",
        modules: 5,
        exams: 1,
        status: "In progress",
      },
      {
        title: "Collision Avoidance",
        description: "COLREG basics and safe navigation decision making.",
        category: "Navigation",
        progress: 0,
        duration: "55 min",
        modules: 4,
        exams: 1,
        status: "Not started",
      },
      {
        title: "Passage Planning",
        description: "Route planning, voyage preparation, and risk checks.",
        category: "Navigation",
        progress: 35,
        duration: "1h 05m",
        modules: 4,
        exams: 1,
        status: "In progress",
      },
    ],
  },
  {
    title: "Operations",
    courses: [
      {
        title: "Cargo Operations Safety",
        description: "Safe cargo handling, communication, and deck awareness.",
        category: "Operations",
        progress: 15,
        duration: "1h 10m",
        modules: 5,
        exams: 1,
        status: "Assigned",
      },
      {
        title: "Mooring Operations",
        description: "Line handling, snap-back zones, and safe team behaviour.",
        category: "Operations",
        progress: 80,
        duration: "50 min",
        modules: 4,
        exams: 1,
        status: "In progress",
      },
      {
        title: "Permit to Work",
        description: "Work permits, hazard controls, and operational approvals.",
        category: "Operations",
        progress: 0,
        duration: "30 min",
        modules: 3,
        exams: 1,
        status: "Not started",
      },
    ],
  },
  {
    title: "Emergency Preparedness",
    courses: [
      {
        title: "Man Overboard Response",
        description: "Immediate actions, bridge coordination, and recovery.",
        category: "Emergency",
        progress: 75,
        duration: "40 min",
        modules: 4,
        exams: 1,
        status: "In progress",
      },
      {
        title: "Abandon Ship Procedures",
        description: "Muster stations, survival craft, and evacuation basics.",
        category: "Emergency",
        progress: 0,
        duration: "50 min",
        modules: 4,
        exams: 1,
        status: "Assigned",
      },
      {
        title: "Emergency Communication",
        description: "Clear reporting chain, alarms, and radio communication.",
        category: "Emergency",
        progress: 45,
        duration: "35 min",
        modules: 3,
        exams: 1,
        status: "In progress",
      },
    ],
  },
];

const Courses = () => {
  return (
    <div className={styles.page}>
      <section className={styles.heroCard}>
        <div>
          <span className={styles.overline}>Crew Learning</span>
          <h2 className={styles.title}>My Courses</h2>
          <p className={styles.subtitle}>
            Continue assigned maritime safety training and track your course progress.
          </p>
        </div>

        <div className={styles.heroStats}>
          <div className={styles.stat}>
            <span>Assigned</span>
            <b>12</b>
          </div>
          <div className={styles.stat}>
            <span>Completed</span>
            <b>3</b>
          </div>
          <div className={styles.stat}>
            <span>In progress</span>
            <b>5</b>
          </div>
        </div>
      </section>

      {topics.map((topic) => (
        <section key={topic.title} className={styles.topicSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h3 className={styles.topicTitle}>{topic.title}</h3>
              <p className={styles.topicSubtitle}>
                {topic.courses.length} assigned courses
              </p>
            </div>

            <button type="button" className={styles.viewAllButton}>
              View topic
            </button>
          </div>

          <div className={styles.courseGrid}>
            {topic.courses.map((course) => (
              <CourseCard key={course.title} course={course} link={course.link} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Courses;