import Board from "./board.js";
import Column from "./column.js";
import ColumnWinInspector from "./columnWin.js";
import RowWinInspector from "./rowWin.js";
import DiagonalWinInspector from "./diagonalWin.js";

export default class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = 1;
    this.winnerNumber = 0;
    this.columns = Array.from(new Array(7), () => new Column());
    this.board = new Board();
  }

  getName() {
    switch (this.winnerNumber) {
      case 0:
        return `${this.player1} vs. ${this.player2}`;
      case 1:
        return `${this.player1} Wins!`;
      case 2:
        return `${this.player2} Wins!`;
      case 3:
        return `${this.player1} ties with ${this.player2}`;
    }
  }

  changePlayer() {
    this.currentPlayer === 1
      ? (this.currentPlayer = 2)
      : (this.currentPlayer = 1);
  }

  playInGameBoard(columnIndex, rowIndex) {
    this.board[`square-${rowIndex}-${columnIndex}`] = this.currentPlayer;
  }

  playInColumn(columnIndex) {
    this.columns[columnIndex].add(this.currentPlayer);
  }

  isColumnFull(index) {
    return this.columns[index].isFull();
  }

  takePlayerTurn(columnIndex, rowIndex) {
    if (!this.columns[columnIndex].isFull()) {
      this.playInColumn(columnIndex);
      console.log("Should be 0:", columnIndex, "Should be 5", rowIndex);
      this.playInGameBoard(columnIndex, rowIndex);
      this.changePlayer();
    }
    this.checkForWinConditions();
  }

  checkForTie() {
    if (this.columns.every(column => column.isFull())) {
      return (this.winnerNumber = 3);
    }
  }

  checkForColumnWin() {
    this.columns.forEach(ele => {
      let checkedArray = new ColumnWinInspector(ele.tokenArr);
      if (checkedArray.inspect()) {
        this.winnerNumber = checkedArray.inspect();
      }
    });
  }

  createGroup(start, end, className) {
    let group = this.columns.slice(start, end);
    return new className(group);
  }

  checkForRowAndDiagonalWin() {
    const startNums = [0, 1, 2, 3];
    startNums.forEach(ele => {
      let rowGroup = this.createGroup(ele, ele + 4, RowWinInspector);
      let diagonalGroup = this.createGroup(ele, ele + 4, DiagonalWinInspector);
      if (rowGroup.inspect()) {
        this.winnerNumber = rowGroup.inspect();
      } else if (diagonalGroup.inspect()) {
        this.winnerNumber = diagonalGroup.inspect();
      }
    });
  }

  checkForWinConditions() {
    this.checkForTie();
    this.checkForColumnWin();
    this.checkForRowAndDiagonalWin();
  }
}
