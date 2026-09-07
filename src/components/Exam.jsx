import { useCallback, useState } from "react";

import Question from "./Question";
import Timer from "./Timer";
import QuestionPalette from "./QuestionPalette";

function Exam({
  test,
  onExamComplete
}) {

  const questions = test.questions;

  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(0);

  const [answers, setAnswers] = useState({});

  const [markedForReview, setMarkedForReview] =
    useState([]);

  const [showSubmitModal, setShowSubmitModal] =
    useState(false);

  const currentQuestion =
    questions[currentQuestionIndex];

  const selectAnswer = (answer) => {

    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [currentQuestion.id]: answer
    }));
  };

  const clearResponse = () => {

    setAnswers((previousAnswers) => {

      const updatedAnswers = {
        ...previousAnswers
      };

      delete updatedAnswers[currentQuestion.id];

      return updatedAnswers;
    });
  };

  const toggleMarkForReview = () => {

    setMarkedForReview((previous) => {

      if (previous.includes(currentQuestion.id)) {

        return previous.filter(
          (id) => id !== currentQuestion.id
        );

      }

      return [
        ...previous,
        currentQuestion.id
      ];
    });
  };

  const goToNextQuestion = () => {

    if (
      currentQuestionIndex <
      questions.length - 1
    ) {

      setCurrentQuestionIndex(
        currentQuestionIndex + 1
      );

    }
  };

  const goToPreviousQuestion = () => {

    if (currentQuestionIndex > 0) {

      setCurrentQuestionIndex(
        currentQuestionIndex - 1
      );

    }
  };

  const goToQuestion = (index) => {

    setCurrentQuestionIndex(index);
  };

  const submitExam = useCallback(() => {

    onExamComplete({
      answers,
      markedForReview
    });

  }, [
    answers,
    markedForReview,
    onExamComplete
  ]);

  const handleTimeUp = useCallback(() => {

    submitExam();

  }, [submitExam]);

  const attemptedCount =
    Object.keys(answers).length;

  return (
    <div className="exam-page">

      <header className="exam-header">

        <div className="exam-title">

          <div className="exam-name">
            {test.title}
          </div>

          <div className="exam-progress">
            Question{" "}
            {currentQuestionIndex + 1}
            {" "}
            of{" "}
            {questions.length}
          </div>

        </div>

        <Timer
          durationMinutes={test.durationMinutes}
          onTimeUp={handleTimeUp}
        />

      </header>


      <main className="exam-content">

        <section className="question-section">

          <Question
            question={currentQuestion}
            selectedAnswer={
              answers[currentQuestion.id]
            }
            onAnswerSelect={selectAnswer}
          />


          <div className="question-actions">

            <button
              className="secondary-button"
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>


            {test.settings.allowClearResponse && (

              <button
                className="secondary-button"
                onClick={clearResponse}
              >
                Clear Response
              </button>

            )}


            {test.settings.allowMarkForReview && (

              <button
                className={`review-button ${
                  markedForReview.includes(
                    currentQuestion.id
                  )
                    ? "review-active"
                    : ""
                }`}
                onClick={toggleMarkForReview}
              >
                {markedForReview.includes(
                  currentQuestion.id
                )
                  ? "Unmark Review"
                  : "Mark for Review"}
              </button>

            )}


            <button
              className="primary-button"
              onClick={goToNextQuestion}
              disabled={
                currentQuestionIndex ===
                questions.length - 1
              }
            >
              Save & Next
            </button>

          </div>

        </section>


        <aside className="exam-sidebar">

          <QuestionPalette
            questions={questions}
            currentQuestionIndex={
              currentQuestionIndex
            }
            answers={answers}
            markedForReview={
              markedForReview
            }
            onQuestionSelect={
              goToQuestion
            }
          />


          <div className="sidebar-summary">

            <div>
              Attempted
              <strong>
                {attemptedCount}
              </strong>
            </div>

            <div>
              Remaining
              <strong>
                {questions.length -
                  attemptedCount}
              </strong>
            </div>

          </div>


          <button
            className="submit-button"
            onClick={() =>
              setShowSubmitModal(true)
            }
          >
            Submit Test
          </button>

        </aside>

      </main>


      {showSubmitModal && (

        <div className="modal-overlay">

          <div className="submit-modal">

            <h2>
              Submit Examination?
            </h2>

            <p>
              Are you sure you want to submit
              the examination?
            </p>

            <div className="submission-summary">

              <div>
                Attempted:
                <strong>
                  {attemptedCount}
                </strong>
              </div>

              <div>
                Unattempted:
                <strong>
                  {questions.length -
                    attemptedCount}
                </strong>
              </div>

              <div>
                Marked for Review:
                <strong>
                  {markedForReview.length}
                </strong>
              </div>

            </div>

            <div className="modal-actions">

              <button
                className="secondary-button"
                onClick={() =>
                  setShowSubmitModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="submit-button"
                onClick={submitExam}
              >
                Submit
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Exam;