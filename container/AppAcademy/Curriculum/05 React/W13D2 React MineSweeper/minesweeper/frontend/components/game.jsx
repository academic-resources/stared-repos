import React from "react";
import * as Minesweeper from "./minesweeper.js";
import Board from "./board";
import Tile from "./tile";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.board = new Minesweeper.Board(10, 1);
    this.state = { board: this.board }
    this.updateGame = this.updateGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  render() {
    let gameState = "";
    if (this.board.won()) gameState = "You Won, Gangsta!";
    if (this.board.lost()) gameState = "You Lost, Playa!";

    return (
      <div>
        <Board 
        board={this.state.board}
        game={this.updateGame}
        />
        <p>{gameState}</p>
        <button className="restart" onClick={this.restartGame}>Restart Game</button>
      </div>
    )
  }

  restartGame(e) {
    e.preventDefault();
    this.setState({ board: new Minesweeper.Board(10, 1) })
  }

  updateGame(tileObj) { this.setState({ board: tileObj.board }) }

}

export default Game;