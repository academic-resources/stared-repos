import React from "react";
import Loading from "./Loading";
import Results from "./Results";
import CardBody from "./CardBody";
import Intro from "./Intro";
import Error from "./Error";
import NoMatch from "./NoMatch";
import { handleInitialData } from "../actions/shared";
import {
  updateQuestion,
  nextQuestion,
  finishQuestions,
  startQuestions,
  reset
} from "../actions/questions";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class Card extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  checkAnswer = answer => {
    const { index, questions, dispatch } = this.props;
    let correctAnswer = questions[index].correct_answer === "True";
    questions[index]["result"] =
      correctAnswer === answer ? "correct" : "incorrect";

    const isDone = index === questions.length - 1;

    if (isDone) {
      dispatch(updateQuestion(questions[index]));
      setTimeout(() => {
        dispatch(finishQuestions());
      }, 1000);
    } else {
      dispatch(updateQuestion(questions[index]));
      setTimeout(() => {
        dispatch(nextQuestion(index));
      }, 1000);
    }
  };

  render() {
    const {
      questions,
      loading,
      completed,
      intro,
      error,
      dispatch,
      index
    } = this.props;

    return (
      <div className="container flex flex-col items-center justify-center antialiased font-sans tracking-wider bg-white max-w-md mx-auto p-4 leading-tight text-gray-600">
        <Router>
          <Switch>
            <Route path="/" exact>
              {loading ? (
                <Loading />
              ) : error ? (
                <Error errObj={error} />
              ) : completed ? (
                <Results
                  questions={questions}
                  handleReset={() => {
                    dispatch(reset());
                    dispatch(handleInitialData(startQuestions()));
                  }}
                />
              ) : intro ? (
                <Intro
                  handleClick={() => dispatch(startQuestions())}
                  questionsLength={questions && questions.length}
                />
              ) : (
                <CardBody
                  questions={questions}
                  index={index}
                  checkAnswer={this.checkAnswer}
                />
              )}
            </Route>
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapStateToProps({
  questions,
  loading,
  error,
  index,
  intro,
  completed
}) {
  return {
    questions,
    loading,
    error,
    index,
    intro,
    completed
  };
}

export default connect(mapStateToProps)(Card);
