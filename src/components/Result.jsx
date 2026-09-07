function Result({
  test,
  answers
}) {

  const questions = test.questions;

  let correct = 0;
  let wrong = 0;
  let unattempted = 0;

  let positiveMarks = 0;
  let negativeMarks = 0;

  questions.forEach((question) => {

    const selectedAnswer = answers[question.id];

    if (!selectedAnswer) {
      unattempted++;
      return;
    }

    if (selectedAnswer === question.correctAnswer) {

      correct++;

      positiveMarks += test.marksPerQuestion;

    } else {

      wrong++;

      negativeMarks += test.negativeMarksPerQuestion;
    }
  });

  const attempted = correct + wrong;

  const score = positiveMarks - negativeMarks;

  const maximumMarks =
    questions.length * test.marksPerQuestion;

  const percentage =
    maximumMarks > 0
      ? (score / maximumMarks) * 100
      : 0;

  const accuracy =
    attempted > 0
      ? (correct / attempted) * 100
      : 0;

  const passed =
    percentage >= test.passingPercentage;

  return (
    <div className="result-page">

      <div className="result-card">

        <div className="result-header">

          <div className="result-title">
            Examination Completed
          </div>

          <div className="result-score">
            {score.toFixed(2)}
            <span> / {maximumMarks}</span>
          </div>

          <div
            className={`result-status ${
              passed
                ? "result-pass"
                : "result-fail"
            }`}
          >
            {passed ? "PASSED" : "FAILED"}
          </div>

        </div>

        <div className="result-summary">

          <div className="result-stat">
            <span>Total Questions</span>
            <strong>{questions.length}</strong>
          </div>

          <div className="result-stat">
            <span>Attempted</span>
            <strong>{attempted}</strong>
          </div>

          <div className="result-stat">
            <span>Correct</span>
            <strong>{correct}</strong>
          </div>

          <div className="result-stat">
            <span>Wrong</span>
            <strong>{wrong}</strong>
          </div>

          <div className="result-stat">
            <span>Unattempted</span>
            <strong>{unattempted}</strong>
          </div>

          <div className="result-stat">
            <span>Accuracy</span>
            <strong>{accuracy.toFixed(2)}%</strong>
          </div>

          <div className="result-stat">
            <span>Percentage</span>
            <strong>{percentage.toFixed(2)}%</strong>
          </div>

          <div className="result-stat">
            <span>Negative Marks</span>
            <strong>-{negativeMarks.toFixed(2)}</strong>
          </div>

        </div>

        {test.settings.showCorrectAnswers && (

          <div className="answer-analysis">

            <h2>
              Question Analysis
            </h2>

            {questions.map((question, index) => {

              const selectedAnswer =
                answers[question.id];

              const isCorrect =
                selectedAnswer ===
                question.correctAnswer;

              const isUnattempted =
                !selectedAnswer;

              return (

                <div
                  key={question.id}
                  className="analysis-item"
                >

                  <div className="analysis-question">

                    <strong>
                      Q{index + 1}.
                    </strong>

                    <span>
                      {question.question}
                    </span>

                  </div>

                  <div className="analysis-result">

                    {isUnattempted && (
                      <span className="analysis-unattempted">
                        Unattempted
                      </span>
                    )}

                    {!isUnattempted && isCorrect && (
                      <span className="analysis-correct">
                        ✓ Correct
                      </span>
                    )}

                    {!isUnattempted && !isCorrect && (
                      <span className="analysis-wrong">
                        ✗ Wrong
                      </span>
                    )}

                  </div>

                  {test.settings.showCorrectAnswers && (

                    <div className="analysis-details">

                      <div>
                        Your Answer:{" "}
                        <strong>
                          {selectedAnswer || "Not Attempted"}
                        </strong>
                      </div>

                      <div>
                        Correct Answer:{" "}
                        <strong>
                          {question.correctAnswer}
                        </strong>
                      </div>

                    </div>

                  )}

                </div>

              );
            })}

          </div>

        )}

      </div>

    </div>
  );
}

export default Result;