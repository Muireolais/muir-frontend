import styles from "./CourseCard.module.css";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const progress = course.progress || 0;

  const getStatusClass = () => {
    if (course.status === "Completed") return styles.statusCompleted;
    if (course.status === "In progress") return styles.statusInProgress;
    if (course.status === "Assigned") return styles.statusAssigned;
    return styles.statusNotStarted;
  };

  const getButtonClass = () => {
    if (course.status === "Completed") return styles.buttonCompleted;
    if (course.status === "In progress") return styles.buttonContinue;
    if (course.status === "Assigned") return styles.buttonAssigned;
    return styles.buttonStart;
  };

  const buttonText =
    course.status === "Completed"
      ? "Review Course"
      : progress === 0
        ? "Start Course"
        : "Continue";

  return (
    <article className={styles.card}>
      <div
        className={styles.image}
        style={
          course.image
            ? {
                backgroundImage: `linear-gradient(180deg, rgba(10, 25, 60, 0.06), rgba(10, 25, 60, 0.5)), url(${course.image})`,
              }
            : undefined
        }
      >
        <span className={styles.category}>{course.category}</span>
        <span className={`${styles.status} ${getStatusClass()}`}>
          {course.status === "Completed" ? "✔ Completed" : course.status}
        </span>
      </div>

      <div className={styles.body}>
        <h4 className={styles.title}>{course.title}</h4>
        <p className={styles.description}>{course.description}</p>

        <div className={styles.tags}>
          <span>#{course.category}</span>
          <span>#Maritime</span>
          <span>#Safety</span>
        </div>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>⏱</span>
            {course.duration}
          </span>

          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>📚</span>
            {course.modules} modules
          </span>

          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>📝</span>
            {course.exams} exam
          </span>
        </div>

        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>Progress</span>
          <span className={styles.progressValue}>{progress}%</span>
        </div>

        <div className={styles.progressTrack}>
          <div
            className={`${styles.progressFill} ${
              progress >= 100 ? styles.progressFillCompleted : ""
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          type="button"
          onClick={course.link ? () => navigate(course.link) : undefined}
          className={`${styles.continueButton} ${getButtonClass()}`}
        >
          {buttonText}
        </button>
      </div>
    </article>
  );
};

export default CourseCard;
