import React from "react";
import {
  FiXCircle,
  FiCheckCircle,
  FiSmile,
  FiFrown
} from "react-icons/fi";
import PropTypes from "prop-types";

function CardBody({ questions, index, checkAnswer }) {
  return (
    <div className="card h-667 md:h-auto md:min-h-90vh bg-blue-100 grid-rows-questions-rows h">
      <header>
        <h2 className="font-bold tracking-wide text-3xl md:text-4xl uppercase">{questions && questions[index].category}</h2>
      </header>
      <div className="flex-center-all">
        {questions[index].result === "correct" && (
          <FiSmile size={60} color="limegreen" />
        )}
        {questions[index].result === "incorrect" && (
          <FiFrown size={60} color="crimson" />
        )}
      </div>
      <main className="overflow-auto border-4 p-3 rounded-lg border-gray-300 bg-white shadow-md">
        {questions && (
          <p className="text-2xl text-left">{questions[index].question}</p>
        )}
      </main>
      <nav className="flex self-center justify-around">
        <button
          className={`${questions[index].result && "opacity-50 cursor-not-allowed"}  focus:outline-none focus:shadow-outline rounded-full`}
          disabled={questions[index].result}
          onClick={() => checkAnswer(true)}
        >
          <FiCheckCircle size={60} />
        </button>
        <button
          className={`${questions[index].result && "opacity-50 cursor-not-allowed"} focus:outline-none focus:shadow-outline rounded-full`}
          disabled={questions[index].result}
          onClick={() => checkAnswer(false)}
        >
          <FiXCircle size={60} />
        </button>
      </nav>
      <footer className="self-center text-5xl font-semibold">
        {index + 1} of {questions && questions.length}
      </footer>
    </div>
  );
}

export default CardBody;

CardBody.propTypes = {
  index: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  checkAnswer: PropTypes.func.isRequired
};
