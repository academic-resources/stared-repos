import React from "react";
import "./App.css";

const BottomRow = () => {
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

export default TopRow;
