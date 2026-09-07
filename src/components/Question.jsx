import React from "react";

function Question({ question, selectedAnswer, onAnswerSelect }) {
  if (!question) return null;

  return (
    <div className="question-container">
      <div className="question-number">Question {question.id}</div>

      <div className="question-text">{question.question}</div>

      <div className="options-container">
        {question.options.map((opt) => {
          const selected = selectedAnswer === opt.id;

          return (
            <label
              key={opt.id}
              className={`option ${selected ? "option-selected" : ""}`}
              onClick={() => onAnswerSelect(opt.id)}
            >
              <input
                type="radio"
                name={`q-${question.id}`}
                checked={selected}
                readOnly
              />

              <div className="option-letter">{opt.id}</div>

              <div className="option-text">{opt.text}</div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default Question;