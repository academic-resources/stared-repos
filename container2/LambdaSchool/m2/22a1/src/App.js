//TODO: STEP 1 - Import the useState hook.
import React, { useState } from "react";
import "./App.css";
// import BottomRow from "./BottomRow";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const teamH = "Lions";
  const teamA = "Tigers";
  const touchdown = 7;
  const fieldGoal = 3;
  const [scoreH, incrementH] = useState(0);
  const [scoreA, incrementA] = useState(0);
  let [quarter, incrementQ] = useState(0);
  const TopRow = () => {
    return (
      <div className="topRow">
        <div className="home">
          <h2 className="home__name">{teamH}</h2>

          {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

          <div className="home__score">{scoreH}</div>
        </div>
        <div className="timer">00:03</div>
        <div className="away">
          <h2 className="away__name">{teamA}</h2>
          <div className="away__score">{scoreA}</div>
        </div>
      </div>
    );
  };

  const ButtonsRow = () => {
    return (
      <section className="buttons">
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <button
            className="homeButtons__touchdown"
            onClick={() => incrementH(scoreH + touchdown)}
          >
            Home Touchdown
          </button>
          <button
            className="homeButtons__fieldGoal"
            onClick={() => incrementH(scoreH + fieldGoal)}
          >
            Home Field Goal
          </button>
        </div>
        <div className="awayButtons">
          <button
            className="awayButtons__touchdown"
            onClick={() => incrementA(scoreA + touchdown)}
          >
            Away Touchdown
          </button>
          <button
            className="awayButtons__fieldGoal"
            onClick={() => incrementA(scoreA + fieldGoal)}
          >
            Away Field Goal
          </button>
        </div>
        <div className="buttons">
          <button
            className="buttons"
            onClick={() =>
              incrementQ(() => {
                if (quarter === 4 || quarter === 0) {
                  return (quarter = 1);
                } else {
                  return (quarter += 1);
                }
              })
            }
          >
            Next Quarter
          </button>
        </div>
      </section>
    );
  };
  const BottomRow = () => {
    return (
      <div className="bottomRow">
        <div className="down">
          <h3 className="down__title">Down</h3>
          <div className="down__value">3</div>
        </div>
        <div className="toGo">
          <h3 className="toGo__title">To Go</h3>
          <div className="toGo__value">7</div>
        </div>
        <div className="ballOn">
          <h3 className="ballOn__title">Ball on</h3>
          <div className="ballOn__value">21</div>
        </div>
        <div className="quarter">
          <h3 className="quarter__title">Quarter</h3>
          <div className="quarter__value">{quarter}</div>
        </div>
      </div>
    );
  };
  return (
    <div className="container">
      <section className="scoreboard">
        <TopRow />
        <BottomRow />
      </section>
      <ButtonsRow />
    </div>
  );
}
/*
function teamHandler(team, increment) {
  if (team === this.teamH) {
    return (this.scoreH += increment);
  }
  if (team === this.teamA) {
    return (this.scoreA += increment);
  }
}*/

export default App;

/* TODO STEP 5 - Break out parts of this component into smaller components and compose multiple components together to make the UI */

// done

/* TODO STEP 6 - Write a "handler" function in the component that takes in a team name and an amount. This function will then be passed to each button's click handler. It will increment the correct team's score by the passed in amount */

// could not get this to work; wrote a function, put it in a few different places, and then couldn't get it called.

/* TODO STEP 7 - Play around with the styling and make this project your own! Maybe make it a soccer (non-american football) scoreboard, or a rugby or baseball scoreboard */


/* TODO STEP 8 - Add a button that changes which quarter the game is in, and then render the state quarter value on the scoreboard */

// done 

/* TODO STEP 9 - Make the entire board fully functional with buttons and state! (If you want to make a timer, you'll have to look into useEffect) */
