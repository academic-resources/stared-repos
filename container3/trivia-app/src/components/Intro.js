import React from "react";
import PropTypes from "prop-types";

function Intro({ handleClick, questionsLength }) {
  return (
    <div className="card grid-rows-intro-rows text-3xl gap-2 h-667 md:h-auto md:min-h-90vh bg-blue-100">
      <h1 className="font-bold text-4xl">Welcome to the Trivia Challenge!</h1>
      <p>
        You will be presented with {questionsLength} True or False questions.
      </p>
      <p className="self-center">Can you score 100%?</p>
      <button className="btn btn-blue shadow-lg" onClick={handleClick}>
        begin
      </button>
    </div>
  );
}

export default Intro;

Intro.propTypes = {
  handleClick: PropTypes.func.isRequired,
  questionsLength: PropTypes.number
};
