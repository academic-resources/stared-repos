export default class Board {
  constructor() {
    this.board = {};
  }

  makeBoard(obj) {
    obj.columns.forEach((column, i) => {
      column.tokenArr.forEach((row, j) => {
        this.board[`square-${j}-${i}`] = null;
      });
    });
  }
}
