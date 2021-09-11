import Grid from './grid';
import Tile from './tile';

class Game {
  constructor(bestScore) {
    this.score = 0;
    this.bestScore = bestScore;
    this.movePoints= 0
    this.grid = new Grid;
    this.newGame();
  }

  newGame() {
    for (let i = 0; i < 2; i++) {
      this.placeRandomTile();
    }
  }

  placeRandomTile() {
    const pos = this.grid.randomEmptyPosition();
    const value = this.randomValue();
    if (pos) {
      const tile = new Tile(pos, value);
      this.grid.setTile(tile);
    }
  }

  randomValue() {
    return [2, 2, 2, 2, 4][Math.floor(Math.random() * 5)]
  }

  move(dir) {
    this.grid.move(dir);
    this.updateScore();
    this.placeRandomTile();
  }

  updateScore() {
    this.movePoints = this.grid.movePoints
    this.score += this.movePoints;
    if (this.score > this.bestScore) {
      this.bestScore = this.score;
    }
  }

  over() {
    return this.availableMove() ? false : true;
  }

  availableMove() {
    return (this.emptyPositions().length || this.availableMerges());
  }

  emptyPositions() {
    return this.grid.emptyPositions();
  }

  availableMerges() {
    return this.grid.availableMerges();
  }
}

export default Game;
