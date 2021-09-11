import React from "react";
import "./App.css";

const ButtonsRow = () => {
  return (
<section className="buttons">
          <div className="homeButtons">
            {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
            <button className="homeButtons__touchdown" onClick={() => incrementH(scoreH + 7)}>Home Touchdown</button>
            <button className="homeButtons__fieldGoal" onClick={() => incrementH(scoreH + 3)}>Home Field Goal</button>
          </div>
          <div className="awayButtons">
            <button className="awayButtons__touchdown" onClick={() => incrementA(scoreA + 7)}>Away Touchdown</button>
            <button className="awayButtons__fieldGoal" onClick={() => incrementA(scoreA + 3)}>Away Field Goal</button>
          </div>
        </section>
  );
};

export default ButtonsRow;

