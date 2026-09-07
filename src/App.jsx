import { useState } from "react";

import Exam from "./components/Exam";
import Result from "./components/Result";

import pythonTest from "./data/pythonTest";

function App() {

  const [screen, setScreen] =
    useState("instructions");

  const [examResult, setExamResult] =
    useState(null);


  const startExam = () => {

    setScreen("exam");

  };


  const completeExam = (result) => {

    setExamResult(result);

    setScreen("result");

  };


  if (screen === "instructions") {

    return (

      <div className="instructions-page">

        <div className="instructions-card">

          <div className="instructions-header">

            <h1>
              {pythonTest.title}
            </h1>

            <p>
              {pythonTest.description}
            </p>

          </div>


          <div className="exam-information">

            <div className="info-item">

              <span>
                Total Questions
              </span>

              <strong>
                {pythonTest.questions.length}
              </strong>

            </div>


            <div className="info-item">

              <span>
                Duration
              </span>

              <strong>
                {pythonTest.durationMinutes}
                {" "}
                Minutes
              </strong>

            </div>


            <div className="info-item">

              <span>
                Maximum Marks
              </span>

              <strong>
                {
                  pythonTest.questions.length *
                  pythonTest.marksPerQuestion
                }
              </strong>

            </div>


            <div className="info-item">

              <span>
                Negative Marking
              </span>

              <strong>
                -
                {pythonTest.negativeMarksPerQuestion}
              </strong>

            </div>

          </div>


          <div className="instructions-section">

            <h2>
              Instructions
            </h2>

            <ol>

              {pythonTest.instructions.map(
                (instruction, index) => (

                  <li key={index}>
                    {instruction}
                  </li>

                )
              )}

            </ol>

          </div>


          <div className="start-section">

            <button
              className="start-button"
              onClick={startExam}
            >
              Start Examination
            </button>

          </div>

        </div>

      </div>

    );

  }


  if (screen === "exam") {

    return (

      <Exam
        test={pythonTest}
        onExamComplete={completeExam}
      />

    );

  }


  if (screen === "result") {

    return (

      <Result
        test={pythonTest}
        answers={examResult.answers}
      />

    );

  }


  return null;
}

export default App;

