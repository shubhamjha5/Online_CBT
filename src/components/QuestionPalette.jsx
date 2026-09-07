function QuestionPalette({
  questions,
  currentQuestionIndex,
  answers,
  markedForReview,
  onQuestionSelect
}) {

  const getQuestionStatus = (index) => {

    const questionId = questions[index].id;

    const answered = answers[questionId] !== null &&
      answers[questionId] !== undefined;

    const marked = markedForReview.includes(questionId);

    if (answered && marked) {
      return "palette-answered-review";
    }

    if (marked) {
      return "palette-review";
    }

    if (answered) {
      return "palette-answered";
    }

    if (index === currentQuestionIndex) {
      return "palette-current";
    }

    return "palette-unanswered";
  };

  return (
    <div className="palette-container">

      <div className="palette-title">
        Question Palette
      </div>

      <div className="palette-grid">

        {questions.map((question, index) => (

          <button
            key={question.id}
            className={`palette-button ${getQuestionStatus(index)}`}
            onClick={() => onQuestionSelect(index)}
          >
            {question.id}
          </button>

        ))}

      </div>

      <div className="palette-legend">

        <div className="legend-item">
          <span className="legend-box answered"></span>
          Answered
        </div>

        <div className="legend-item">
          <span className="legend-box unanswered"></span>
          Not Answered
        </div>

        <div className="legend-item">
          <span className="legend-box review"></span>
          Marked for Review
        </div>

      </div>

    </div>
  );
}

export default QuestionPalette;