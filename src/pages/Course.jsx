import { useEffect, useMemo, useState } from "react";
import styles from "../styles/Course.module.css";
import { useParams, Navigate } from "react-router-dom";

const ALLOWED_COURSE_SLUG = "enclosed_space";

const courseData = {
  id: "ENC-SPACE101",
  title: "External pump usage (Dräger X-am Pump)",
  subtitle: "Enclosed space entry gas sampling lesson",
  language: "English",
  averageScore: 0,
  estimatedDuration: "5 min",
  modules: [
    {
      id: "module-1",
      number: 1,
      title: "External pump usage (Dräger X-am Pump)",
      status: "current",
      steps: [
        {
          id: "m1-step-1",
          number: 1,
          title: "External pump usage Lesson content",
          type: "reading",
          duration: "<1 min",
          status: "current",
          description:
            "This lesson covers correct use of the external pump for remote gas sampling before enclosed space entry.",
          content:
            "This lesson covers correct use of the external pump for remote gas sampling before enclosed space entry.\n\nCovers:\n\nPre-checks:\nCheck the tubing, filter, tight connections, and pump flow before use. The hose must not be blocked, damaged, leaking, or loosely connected.\n\nSampling:\nUse the external pump to sample the atmosphere remotely before entry. Test the top, middle, and bottom of the enclosed space to get a representative atmosphere reading.\n\nTiming:\nAllow enough time for the sample to travel through the tubing before relying on the reading. As a practical guide, wait approximately 1 second per meter of tubing for a stable reading.\n\nCommon errors:\nCommon mistakes include blocked hose, leaks, rushing the measurement, and failing to sample different levels of the space.\n\nObjective:\nEnsure reliable readings before entry.",
        },
        {
          id: "m1-step-2",
          number: 2,
          title: "External pump usage video",
          type: "video",
          duration: "2 min",
          status: "locked",
          description:
            "Watch the external pump usage demonstration before completing the knowledge check.",
          video: "https://www.youtube.com/embed/hqHZuXNv_FE",
        },
        {
          id: "m1-step-3",
          number: 3,
          title: "External pump usage quiz",
          type: "quiz",
          duration: "2 min",
          status: "locked",
          description:
            "Answer questions about correct external pump use before enclosed space entry.",
          questions: [
            {
              id: "q1",
              question: "Why is an external pump used with a gas detector?",
              options: [
                "To increase battery life",
                "To sample atmosphere remotely before entry",
                "To speed up calibration",
                "To reduce maintenance",
              ],
              correctIndex: 1,
            },
            {
              id: "q2",
              question: "What must be checked before using the external pump?",
              options: [
                "Detector color and casing",
                "Tubing condition and no blockage in line",
                "Vessel heading",
                "Crew PPE color",
              ],
              correctIndex: 1,
            },
            {
              id: "q3",
              question: "How should sampling be carried out with tubing?",
              options: [
                "Take reading immediately",
                "Wait enough time for sample to travel, approximately 1 second per meter",
                "Shake the detector",
                "Increase alarm limits",
              ],
              correctIndex: 1,
            },
          ],
        },
        {
          id: "m1-step-4",
          number: 4,
          title: "External pump usage result",
          type: "result",
          duration: "—",
          status: "locked",
          result: {
            passed: false,
            score: 0,
            required: 80,
            timeSpent: "00:05:00",
            attemptsUsed: 0,
          },
        },
      ],
    },
  ],
};

const Course = () => {
  const { courseSlug } = useParams();
  const isAllowedCourse = courseSlug === ALLOWED_COURSE_SLUG;

  const [modules, setModules] = useState(courseData.modules);
  const [currentModuleId, setCurrentModuleId] = useState("module-1");
  const [currentStepId, setCurrentStepId] = useState("m1-step-1");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [attemptsUsed, setAttemptsUsed] = useState(0);

  const currentModule =
    modules.find((module) => module.id === currentModuleId) || modules[0];

  const currentStep =
    currentModule.steps.find((step) => step.id === currentStepId) ||
    currentModule.steps[0];

  const currentModuleIndex = modules.findIndex((m) => m.id === currentModule.id);

  const currentStepIndex = currentModule.steps.findIndex(
    (s) => s.id === currentStep.id
  );

  const totalSteps = modules.reduce(
    (sum, module) => sum + module.steps.length,
    0
  );

  const completedSteps = modules.reduce(
    (sum, module) =>
      sum + module.steps.filter((step) => step.status === "completed").length,
    0
  );

  const progressPercent = Math.round((completedSteps / totalSteps) * 100);

  useEffect(() => {
    setCurrentQuestionIndex(0);
  }, [currentStepId]);

  const selectModule = (moduleId) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) return;

    setCurrentModuleId(moduleId);

    const firstAvailableStep =
      module.steps.find((step) => step.status !== "locked") || module.steps[0];

    setCurrentStepId(firstAvailableStep.id);
  };

  const selectStep = (stepId) => {
    setCurrentStepId(stepId);
  };

  const goPrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepId(currentModule.steps[currentStepIndex - 1].id);
      return;
    }

    if (currentModuleIndex > 0) {
      const prevModule = modules[currentModuleIndex - 1];
      setCurrentModuleId(prevModule.id);
      setCurrentStepId(prevModule.steps[prevModule.steps.length - 1].id);
    }
  };

  const goNextStep = () => {
    if (currentStepIndex < currentModule.steps.length - 1) {
      setCurrentStepId(currentModule.steps[currentStepIndex + 1].id);
      return;
    }

    if (currentModuleIndex < modules.length - 1) {
      const nextModule = modules[currentModuleIndex + 1];

      setCurrentModuleId(nextModule.id);

      const firstAvailableStep =
        nextModule.steps.find((step) => step.status !== "locked") ||
        nextModule.steps[0];

      setCurrentStepId(firstAvailableStep.id);
    }
  };

  const markCompleteAndNext = () => {
    const updatedModules = modules.map((module) => {
      if (module.id !== currentModule.id) return module;

      const updatedSteps = module.steps.map((step, index) => {
        if (step.id === currentStep.id) {
          return { ...step, status: "completed" };
        }

        if (index === currentStepIndex + 1 && step.status === "locked") {
          return { ...step, status: "current" };
        }

        return step;
      });

      const moduleStatus = updatedSteps.every((s) => s.status === "completed")
        ? "completed"
        : updatedSteps.some((s) => s.status === "current")
        ? "current"
        : module.status;

      return {
        ...module,
        status: moduleStatus,
        steps: updatedSteps,
      };
    });

    setModules(updatedModules);
    goNextStep();
  };

  const quizQuestion =
    currentStep.type === "quiz"
      ? currentStep.questions[currentQuestionIndex]
      : null;

  const currentQuizResult = useMemo(() => {
    if (currentStep.type !== "quiz") return null;

    const totalQuestions = currentStep.questions.length;

    const correctAnswers = currentStep.questions.filter(
      (question) => selectedAnswers[question.id] === question.correctIndex
    ).length;

    const answeredQuestions = currentStep.questions.filter(
      (question) => selectedAnswers[question.id] !== undefined
    ).length;

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const required = 80;

    return {
      passed: score >= required,
      score,
      required,
      correctAnswers,
      totalQuestions,
      answeredQuestions,
      allAnswered: answeredQuestions === totalQuestions,
      timeSpent: "00:05:00",
      attemptsUsed: attemptsUsed + 1,
    };
  }, [currentStep, selectedAnswers, attemptsUsed]);

  const handleAnswerSelect = (questionId, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const submitQuiz = () => {
    if (!currentQuizResult || !currentQuizResult.allAnswered) return;

    const nextAttemptsUsed = attemptsUsed + 1;

    const updatedModules = modules.map((module) => {
      if (module.id !== currentModule.id) return module;

      const updatedSteps = module.steps.map((step, index) => {
        if (step.id === currentStep.id) {
          return {
            ...step,
            status: "completed",
          };
        }

        if (index === currentStepIndex + 1 && step.type === "result") {
          return {
            ...step,
            status: "current",
            result: {
              passed: currentQuizResult.passed,
              score: currentQuizResult.score,
              required: currentQuizResult.required,
              timeSpent: currentQuizResult.timeSpent,
              attemptsUsed: nextAttemptsUsed,
            },
          };
        }

        return step;
      });

      return {
        ...module,
        status: updatedSteps.every((step) => step.status === "completed")
          ? "completed"
          : "current",
        steps: updatedSteps,
      };
    });

    setAttemptsUsed(nextAttemptsUsed);
    setModules(updatedModules);

    const resultStep = currentModule.steps[currentStepIndex + 1];

    if (resultStep?.type === "result") {
      setCurrentStepId(resultStep.id);
    }
  };

  const retryQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);

    const updatedModules = modules.map((module) => {
      if (module.id !== currentModule.id) return module;

      const updatedSteps = module.steps.map((step) => {
        if (step.type === "quiz") {
          return {
            ...step,
            status: "current",
          };
        }

        if (step.type === "result") {
          return {
            ...step,
            status: "locked",
            result: {
              ...step.result,
              passed: false,
              score: 0,
              attemptsUsed,
            },
          };
        }

        return step;
      });

      return {
        ...module,
        status: "current",
        steps: updatedSteps,
      };
    });

    setModules(updatedModules);
    setCurrentStepId("m1-step-3");
  };

  const renderGradientProgress = (score) => (
    <div className={styles.resultProgressTrack}>
      <div className={styles.resultProgressFill} style={{ width: `${score}%` }}>
        <div
          className={styles.resultProgressGradient}
          style={{
            width: score > 0 ? `${100 / (score / 100)}%` : "100%",
          }}
        />
      </div>
    </div>
  );

  const renderStepContent = () => {
    if (currentStep.type === "reading") {
      return (
        <div className={styles.lessonCard}>
          <div className={styles.lessonCardHeader}>
            <div>
              <div className={styles.lessonMetaTop}>
                <span className={styles.lessonCounter}>
                  Module {currentModule.number} · Step {currentStep.number} of{" "}
                  {currentModule.steps.length}
                </span>

                <span className={styles.lessonDurationBadge}>
                  {currentStep.duration}
                </span>
              </div>

              <h2 className={styles.lessonTitle}>
                {currentModule.title} — {currentStep.title}
              </h2>

              <p className={styles.lessonType}>Reading lesson</p>
            </div>

            <div className={styles.lessonNav}>
              <button
                type="button"
                className={styles.navButton}
                onClick={goPrevStep}
                disabled={currentModuleIndex === 0 && currentStepIndex === 0}
              >
                Previous
              </button>

              <button
                type="button"
                className={styles.navButtonPrimary}
                onClick={goNextStep}
              >
                Next
              </button>
            </div>
          </div>

          <p className={styles.lessonDescription}>{currentStep.description}</p>

          <div className={styles.readingBlock}>
            <h3 className={styles.readingHeading}>Lesson content</h3>
            <p className={styles.readingText}>{currentStep.content}</p>
          </div>

          <div className={styles.bottomActions}>
            <button
              type="button"
              className={styles.secondaryAction}
              onClick={goPrevStep}
              disabled={currentModuleIndex === 0 && currentStepIndex === 0}
            >
              Previous Step
            </button>

            <button
              type="button"
              className={styles.primaryAction}
              onClick={markCompleteAndNext}
            >
              Mark Complete & Next
            </button>
          </div>
        </div>
      );
    }

    if (currentStep.type === "video") {
      return (
        <div className={styles.lessonCard}>
          <div className={styles.lessonCardHeader}>
            <div>
              <div className={styles.lessonMetaTop}>
                <span className={styles.lessonCounter}>
                  Module {currentModule.number} · Step {currentStep.number} of{" "}
                  {currentModule.steps.length}
                </span>

                <span className={styles.lessonDurationBadge}>
                  {currentStep.duration}
                </span>
              </div>

              <h2 className={styles.lessonTitle}>
                {currentModule.title} — {currentStep.title}
              </h2>

              <p className={styles.lessonType}>Video lesson</p>
            </div>

            <div className={styles.lessonNav}>
              <button
                type="button"
                className={styles.navButton}
                onClick={goPrevStep}
                disabled={currentModuleIndex === 0 && currentStepIndex === 0}
              >
                Previous
              </button>

              <button
                type="button"
                className={styles.navButtonPrimary}
                onClick={goNextStep}
              >
                Next
              </button>
            </div>
          </div>

          <p className={styles.lessonDescription}>{currentStep.description}</p>

          <div className={styles.videoWrap}>
            <iframe
              className={styles.video}
              src={currentStep.video}
              title={currentStep.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className={styles.bottomActions}>
            <button
              type="button"
              className={styles.secondaryAction}
              onClick={goPrevStep}
              disabled={currentModuleIndex === 0 && currentStepIndex === 0}
            >
              Previous Step
            </button>

            <button
              type="button"
              className={styles.primaryAction}
              onClick={markCompleteAndNext}
            >
              Mark Complete & Next
            </button>
          </div>
        </div>
      );
    }

    if (currentStep.type === "quiz") {
      return (
        <div className={styles.lessonCard}>
          <div className={styles.lessonCardHeader}>
            <div>
              <div className={styles.lessonMetaTop}>
                <span className={styles.lessonCounter}>
                  Module {currentModule.number} · Quiz
                </span>

                <span className={styles.lessonDurationBadge}>
                  {currentStep.duration}
                </span>
              </div>

              <h2 className={styles.lessonTitle}>
                {currentModule.title} — {currentStep.title}
              </h2>

              <p className={styles.lessonType}>Quiz</p>
            </div>

            <div className={styles.lessonNav}>
              <button
                type="button"
                className={styles.navButton}
                onClick={goPrevStep}
                disabled={currentModuleIndex === 0 && currentStepIndex === 0}
              >
                Previous
              </button>
            </div>
          </div>

          <p className={styles.lessonDescription}>{currentStep.description}</p>

          <div className={styles.quizQuestionNav}>
            {currentStep.questions.map((question, index) => (
              <button
                key={question.id}
                type="button"
                className={`${styles.questionTab} ${
                  index === currentQuestionIndex ? styles.questionTabActive : ""
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                Q{index + 1}
              </button>
            ))}
          </div>

          <div className={styles.quizQuestionCard}>
            <div className={styles.quizQuestionHeader}>
              <span className={styles.quizQuestionCounter}>
                Question {currentQuestionIndex + 1} of{" "}
                {currentStep.questions.length}
              </span>
            </div>

            <h3 className={styles.quizQuestionTitle}>{quizQuestion.question}</h3>

            <div className={styles.quizOptions}>
              {quizQuestion.options.map((option, optionIndex) => (
                <label key={option} className={styles.quizOption}>
                  <input
                    type="radio"
                    name={quizQuestion.id}
                    checked={selectedAnswers[quizQuestion.id] === optionIndex}
                    onChange={() =>
                      handleAnswerSelect(quizQuestion.id, optionIndex)
                    }
                  />

                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.bottomActions}>
            <button
              type="button"
              className={styles.secondaryAction}
              onClick={() =>
                setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
              }
              disabled={currentQuestionIndex === 0}
            >
              Previous Question
            </button>

            {currentQuestionIndex < currentStep.questions.length - 1 ? (
              <button
                type="button"
                className={styles.primaryAction}
                onClick={() =>
                  setCurrentQuestionIndex((prev) =>
                    Math.min(prev + 1, currentStep.questions.length - 1)
                  )
                }
              >
                Next Question
              </button>
            ) : (
              <button
                type="button"
                className={styles.primaryAction}
                onClick={submitQuiz}
                disabled={!currentQuizResult?.allAnswered}
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      );
    }

    if (currentStep.type === "result") {
      return (
        <div className={styles.lessonCard}>
          <div className={styles.lessonCardHeader}>
            <div>
              <div className={styles.lessonMetaTop}>
                <span className={styles.lessonCounter}>
                  Module {currentModule.number} · Result
                </span>

                <span className={styles.lessonDurationBadge}>Summary</span>
              </div>

              <h2 className={styles.lessonTitle}>
                {currentModule.title} — {currentStep.title}
              </h2>

              <p className={styles.lessonType}>Result</p>
            </div>
          </div>

          <div className={styles.resultBox}>
            <div className={styles.resultTop}>
              <div
                className={`${styles.resultIllustration} ${
                  currentStep.result.passed
                    ? styles.resultIllustrationPassed
                    : styles.resultIllustrationFailed
                }`}
              >
                {currentStep.result.passed ? "✅" : "📋"}
              </div>

              <div className={styles.resultSummary}>
                <h3 className={styles.resultTitle}>
                  {currentStep.result.passed
                    ? "You passed."
                    : "You didn't pass."}
                </h3>

                <p className={styles.resultText}>
                  Review your result and score before moving to the next module.
                </p>

                <div className={styles.resultStats}>
                  <div className={styles.resultStat}>
                    <span>Your score</span>
                    <b>{currentStep.result.score}%</b>
                  </div>

                  <div className={styles.resultStat}>
                    <span>Score to achieve</span>
                    <b>{currentStep.result.required}%</b>
                  </div>

                  <div className={styles.resultStat}>
                    <span>Time spent</span>
                    <b>{currentStep.result.timeSpent}</b>
                  </div>

                  <div className={styles.resultStat}>
                    <span>Attempts used</span>
                    <b>{currentStep.result.attemptsUsed}</b>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.resultProgressBlock}>
              <div className={styles.resultProgressHeader}>
                <span>Your score</span>
                <span>{currentStep.result.score}%</span>
              </div>

              {renderGradientProgress(currentStep.result.score)}
            </div>

            <div className={styles.bottomActions}>
              <button
                type="button"
                className={styles.secondaryAction}
                onClick={goPrevStep}
              >
                Review Answers
              </button>

              {currentStep.result.passed ? (
                <button
                  type="button"
                  className={styles.primaryAction}
                  onClick={markCompleteAndNext}
                >
                  Continue Course
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.primaryAction}
                  onClick={retryQuiz}
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  if (!isAllowedCourse) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className={styles.page}>
      <aside className={styles.courseSidebar}>
        <div className={styles.courseHero}>
          <div className={styles.courseThumb}>⚓</div>

          <div className={styles.courseHeroMeta}>
            <h1 className={styles.courseTitle}>
              {courseData.id} — {courseData.title}
            </h1>

            <p className={styles.courseSubtitle}>{courseData.subtitle}</p>
          </div>
        </div>

        <div className={styles.courseStats}>
          <div className={styles.courseStatRow}>
            <span>Progress</span>
            <span>{progressPercent}%</span>
          </div>

          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className={styles.courseStatRow}>
            <span>Average score</span>
            <span>{courseData.averageScore}%</span>
          </div>

          <div className={styles.courseStatRow}>
            <span>Language</span>
            <span>{courseData.language}</span>
          </div>

          <div className={styles.courseStatRow}>
            <span>Duration</span>
            <span>{courseData.estimatedDuration}</span>
          </div>
        </div>

        <div className={styles.modulesMenu}>
          <div className={styles.menuSectionTitle}>Course Modules</div>

          <div className={styles.moduleList}>
            {modules.map((module) => {
              const isCurrentModule = module.id === currentModuleId;

              return (
                <button
                  key={module.id}
                  type="button"
                  className={`${styles.moduleItem} ${
                    isCurrentModule ? styles.moduleItemActive : ""
                  }`}
                  onClick={() => selectModule(module.id)}
                >
                  <div className={styles.moduleItemLeft}>
                    <span className={styles.moduleNumber}>{module.number}</span>

                    <div className={styles.moduleMeta}>
                      <span className={styles.moduleTitle}>
                        Module {module.number} · {module.title}
                      </span>

                      <span className={styles.moduleSub}>
                        {module.steps.length} steps
                      </span>
                    </div>
                  </div>

                  <span
                    className={`${styles.moduleState} ${
                      module.status === "completed"
                        ? styles.lessonCompleted
                        : module.status === "current"
                        ? styles.lessonCurrent
                        : styles.lessonLocked
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.lessonMenu}>
          <div className={styles.menuSectionTitle}>
            Module {currentModule.number} Steps
          </div>

          <div className={styles.lessonSectionItems}>
            {currentModule.steps.map((step) => {
              const isCurrent = step.id === currentStepId;

              return (
                <button
                  key={step.id}
                  type="button"
                  className={`${styles.lessonItem} ${
                    isCurrent ? styles.lessonItemActive : ""
                  }`}
                  onClick={() => selectStep(step.id)}
                >
                  <div className={styles.lessonItemLeft}>
                    <span className={styles.lessonNumber}>{step.number}</span>

                    <div className={styles.lessonItemMeta}>
                      <span className={styles.lessonItemTitle}>
                        Step {step.number} · {step.title}
                      </span>

                      <div className={styles.lessonItemBottom}>
                        <span className={styles.lessonItemType}>
                          {step.type === "video" && "Video"}
                          {step.type === "reading" && "Reading"}
                          {step.type === "quiz" && "Quiz"}
                          {step.type === "result" && "Result"}
                        </span>

                        <span className={styles.lessonItemDot}>•</span>

                        <span className={styles.lessonItemDuration}>
                          {step.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`${styles.lessonState} ${
                      step.status === "completed"
                        ? styles.lessonCompleted
                        : step.status === "current"
                        ? styles.lessonCurrent
                        : styles.lessonLocked
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <main className={styles.lessonContent}>{renderStepContent()}</main>
    </div>
  );
};

export default Course;