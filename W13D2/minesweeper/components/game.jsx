import React from 'react';
import * as Minesweeper from '../minesweeper';
import Board from './board';
const SIZE = 10;
const BOMBS = 1;
class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      board: new Minesweeper.Board(SIZE, BOMBS)
    };
    this.updateGame = this.updateGame.bind(this);
  }

  updateGame(tile, flagged) {
    if (flagged) {
      tile.toggleFlag()
    } else {
      tile.explore()
    }
    this.setState({
      board: this.state.board
    })
  }

  restart() {
    this.setState({board: new Minesweeper.Board(SIZE, BOMBS)})
  }

  gameOver() {
    console.log('won', this.state.board.won());
    console.log('lost', this.state.board.lost());
    
    return this.state.board.won() || this.state.board.lost();
  }

  render() {
    const message = (this.gameOver()) ? 
      (this.state.board.won() ? <h1>You have won!</h1> : <h1>You have lost!</h1>) :
      ""
    const btn = (this.gameOver()) ? 
      <button onClick={this.restart.bind(this)}>Play Again!</button> : ""
    
    return ( <div className="game">
      {message}
      {btn}
      <Board board={this.state.board} updateGame={this.updateGame}/>
      </div>);
  }
}

export default Game