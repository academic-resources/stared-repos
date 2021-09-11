import React from "react";
import PropTypes from "prop-types";

function Results({ questions, handleReset }) {
  // Calculate the score from each question
  const score = questions.reduce((acc, q) => {
    if (q.result === "correct") {
      acc += 1;
    }
    return acc;
  }, 0);

  // Show review questions using CSS
  const handleClick = event => {
    event.target.classList.toggle("truncate");
    event.target.classList.toggle("show-some-text");
  };

  const scorePercentage = (score / questions.length) * 100;
  return (
    <div className="card grid-rows-results text-2xl gap-4 h-667 md:h-auto md:min-h-90vh bg-blue-100">
      <h3 className="text-4xl font-bold">
        You answered {score} of {questions.length} questions!
      </h3>
      {score / questions.length <= 0.5 && (
        <p className="self-center">
          That's {scorePercentage}%. You need practice!
        </p>
      )}
      {score / questions.length > 0.5 && score / questions.length <= 0.8 && (
        <p className="self-center">That's {scorePercentage}%. Pretty good!</p>
      )}
      {score / questions.length > 0.8 && (
        <p className="self-center">That's {scorePercentage}%. Excellent!</p>
      )}
      <h4 className="text-3xl self-center">Review</h4>
      <div className="overflow-auto border-4 p-3 rounded-lg border-gray-300 bg-white shadow-md">
        {questions.map(q => {
          return (
            <p
              key={q.question}
              className={`truncate ${q.result} m-3 text-left`}
              onClick={handleClick}
            >
              {q.question} {q.correct_answer}
            </p>
          );
        })}
      </div>
      <button className="btn btn-blue shadow-lg" onClick={handleReset}>
        Play Again!
      </button>
    </div>
  );
}

export default Results;

Results.propTypes = {
  handleReset: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired
};
