let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid() {
  grid = Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () => undefined)
  );
  grid[3][4] = new Piece("black");
  grid[4][3] = new Piece("black");
  grid[3][3] = new Piece("white");
  grid[4][4] = new Piece("white");
  return grid;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board() {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function(pos) {
  const [x, y] = pos;
  if (x > 8 || x < 0 || y > 8 || y < 0) {
    throw new Error("Not valid pos!");
  }
  return this.grid[x][y];
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function(color) {
  return this.validMoves(color).length > 0;
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function(pos, color) {
  const val =
    this.getPiece(pos) !== undefined && this.getPiece(pos).color == color;
  return val;
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function(pos) {
  return this.getPiece(pos) !== undefined;
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function() {
  return !(this.hasMove("white") || this.hasMove("black"));
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function(pos) {
  const [x, y] = pos;
  return x >= 0 && x < 8 && y >= 0 && y < 8;
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
function _positionsToFlip(board, pos, color, dir, piecesToFlip) {
  const pcs = piecesToFlip;
  let next_pos = calculateNextPosition(pos, dir);

  while (
    board.isValidPos(next_pos) &&
    !board.isMine(next_pos, color) &&
    board.isOccupied(next_pos)
  ) {
    pcs.push(board.getPiece(next_pos));
    next_pos = calculateNextPosition(next_pos, dir);
  }
  if (pcs.length == 0) return null;

  return pcs;
}

function calculateNextPosition(pos, dir) {
  const [x, y] = pos;
  const [dx, dy] = dir;
  return [x + dx, y + dy];
}

function myPieceAtEnd(board, pos, color, dir) {
  const [x, y] = pos;
  const [dx, dy] = dir;
  let pos_to_check = [x + dx, y + dy];
  let found = false;
  while (!found && board.isValidPos(pos_to_check)) {
    if (board.isMine(pos_to_check, color)) {
      found = true;
    }
    pos_to_check = [pos_to_check[0] + dx, pos_to_check[1] + dy];
  }
  return found;
}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function(pos, color) {
  if (!this.validMove(pos, color)) throw new Error("Invalid Move");
  const [x, y] = pos;
  this.grid[x][y] = new Piece(color);
  Board.DIRS.forEach(dir => {
    const piecesToFlip = [];
    const ptf = _positionsToFlip(this, pos, color, dir, piecesToFlip);
    piecesToFlip.forEach(pc => pc.flip());
  });
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function() {};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function(pos, color) {
  let valid = false;
  if (!this.isValidPos(pos)) return false;
  if (this.isOccupied(pos)) return false;

  Board.DIRS.forEach(dir => {
    const new_pos = calculateNextPosition(pos, dir);

    if (this.isValidPos(new_pos)) {
      if (!this.isMine(new_pos, color) && this.isOccupied(new_pos)) {
        if (myPieceAtEnd(this, new_pos, color, dir)) {
          valid = true;
        }
      }
    }
  });
  return valid;
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function(color) {
  const moves = [];
  for (let x = 0; x < this.grid.length; x++) {
    const row = this.grid[x];
    for (let y = 0; y < row.length; y++) {
      const pos = [x, y];
      if (this.validMove(pos, color)) {
        moves.push(pos);
      }
    }
  }
  return moves;
};

module.exports = Board;
