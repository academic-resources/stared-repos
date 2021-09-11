let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  const x = new Array(8);
  for (let i = 0; i < x.length; i++) {
    x[i] = new Array(8);
  };
  x[3][4] = new Piece("black");
  x[4][3] = new Piece("black");
  x[3][3] = new Piece("white");
  x[4][4] = new Piece("white");
  return x;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  const x = pos[0];
  const y = pos[1];
  if (!x.between(0,7) || !y.between(0,7)) throw new Error("Not valid pos!");
  return this.grid[x][y];
};

Number.prototype.between = function(num1, num2) {
  return (this >= num1 && this <= num2);
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  return (this.validMoves(color).length > 0);
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  if (this.grid[pos[0]][pos[1]] === undefined) return false;
  return (this.grid[pos[0]][pos[1]].color === color);
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  return !(this.grid[pos[0]][pos[1]] === undefined);
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  if (this.hasMove("black")) return false;
  if (this.hasMove("white")) return false;
  return true
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  const x = pos[0];
  const y = pos[1];
  if (!x.between(0,7) || !y.between(0,7)) return false;
  return true;
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
function _positionsToFlip (board, pos, color, dir, piecesToFlip = []) {
  const newPos = [pos[0] + dir[0], pos[1] + dir[1]];
  if (!board.isValidPos(newPos) || !board.isOccupied(newPos)) return null;
  if (board.isMine(newPos, color) && piecesToFlip.length === 0) return null;
  if ( board.grid[newPos[0]][newPos[1]].color !== color ) {
    piecesToFlip.push(newPos);
    return _positionsToFlip(board, newPos, color, dir, piecesToFlip);
  };
  return piecesToFlip;
}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if (!this.validMove(pos, color)) throw new Error("Invalid Move");
  this.grid[pos[0]][pos[1]] = new Piece(color);

  for (let i = 0; i < Board.DIRS.length; i++) {
    const flippablePositions = _positionsToFlip(this, pos, color, Board.DIRS[i]);
    if (flippablePositions) {
      for (let j = 0; j < flippablePositions.length; j++) {
        this.getPiece(flippablePositions[j]).flip();
      }
    };
  };
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
  console.log("   0  1  2  3  4  5  6  7")
  for (let i = 0; i < this.grid.length; i++) {
    let row = `${i} `;
    for (let j = 0; j < this.grid.length; j++) {
      if (this.getPiece([i, j])) {
        row += (` ${this.getPiece([i, j]).toString()} `);
      } else row += (" _ ");
    };
    console.log(row);
  };
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  debugger
  if (this.isOccupied(pos)) return false;
  // iterate through directions
  for (let i = 0; i < Board.DIRS.length; i++) {
    const flippablePositions = _positionsToFlip(this, pos, color, Board.DIRS[i])
    if (flippablePositions) return true;
  };
  return false;
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  const movesArray = [];
  for (let i = 0; i < this.grid.length; i++) {
    for (let j = 0; j < this.grid.length; j++) {
      if (this.validMove([i, j], color)) movesArray.push([i, j]);
    }
  }
  return movesArray;
};

module.exports = Board;

const board = new Board;
board.print();