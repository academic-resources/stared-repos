import React from 'react';
import MovePoints from './move-points';
;
const Header = ({ resetGame, game }) => {
  return (
    <header>
      <section className="top-row group">
        <h1>2048</h1>
        <ul className="score-row group">
          <li className="score">
            <h3>Score</h3>
            <h2 className="current-score">{ game.score }</h2>
            <MovePoints game={ game }/>
          </li>
          <li className="best">
            <h3>Best</h3>
            <h2 className="best-score">{ game.bestScore }</h2>
          </li>
        </ul>
      </section>
      <section className="bottom-row group">
        <p>
          Join the numbers and get to the <strong>2048 tile!</strong>
        </p>
        <button type="button" onClick={ resetGame }>New Game</button>
      </section>
    </header>
  );
}

export default Header;
