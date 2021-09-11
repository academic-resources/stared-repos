 let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  // const grid = Array.from({ length: 8 }, Array.from({ length: 8 }));

  let myGrid = [...Array(8)].map(e => Array(8)); /*"_" .fill("")*/
  myGrid[3][4] = new Piece("black");
  myGrid[4][3] = new Piece("black");
  myGrid[3][3] = new Piece("white");
  myGrid[4][4] = new Piece("white");
  return myGrid;
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
  let [x,y] = pos;
  // piece = this.grid[x][y] 
  if (this.isValidPos(pos)) {
    return this.grid[x][y];
  } else {
    throw RuntimeError;
  }
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  return this.validMoves(color).length > 0;
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  piece = this.getPiece(pos);
  return !!piece && piece.color === color;
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  let [x,y] = pos;
  return !!this.getPiece(pos) /*'_'*/
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  return !this.hasMove('black') && !this.hasMove('white')
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  let [x,y] = pos;
  return (x >= 0 && x < 8) && (y >= 0 && y < 8)
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

  let [x,y] = pos;
  let [dx,dy] = dir;
  let new_pos = [x + dx, y + dy];
  // console.log({board});
  if (!board.isValidPos(new_pos)) {
    return null;
  }
  if (!board.isOccupied(new_pos)) { 
    return null;
  }
  if (board.isMine(new_pos, color)) {
    return piecesToFlip;
  }
  piecesToFlip.push(new_pos);
  
  return _positionsToFlip(board, new_pos, color, dir, piecesToFlip)

}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  let [x,y] = pos;
  let board = this;
  if (this.validMove(pos, color)) {
    //board dir.each do |dir|
    // moves = _positionsToflip(...)
    // moves.each do |move|
    //  if move.not_null move.each do |pos| 
    //    board.getPiece(pos).flip
    const moves = [];
    for (let i = 0; i < Board.DIRS.length; i++){
       moves.push(_positionsToFlip(board,pos,color,Board.DIRS[i]));
    }
    for (let j = 0; j < moves.length; j++){
      if (moves[j]){
        moves[j].forEach(position =>{
          board.getPiece(position).flip();
        });
      }
    }
    this.grid[x][y] = new Piece(color);
  } else {
    throw RuntimeError;
  }
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
  this.grid.forEach(function(row) {
    // console.log(row);
    let str = '';
    row.forEach(function(ele){
      if (ele instanceof Piece) {
        str = str + ele.toString();
      } else {
        str = str + ele;
      }
    // str = str + ' '
    });
    console.log(str);
  });
};


/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if (this.isOccupied(pos)) return false
  let [x,y] = pos;
  let moves = [];
  let board = this;
  Board.DIRS.forEach (function(dir) {
    const positions = _positionsToFlip(board, pos, color, dir);
      if (positions) {
        moves = moves.concat(positions);
      }
  });
  return moves.length > 0;
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  let board = this;
  let movelist = [];
  for (let i = 0; i < this.grid.length; i++) {
    for (let j = 0; j < this.grid[i].length; j++) {
      const pos = [i,j];
      if (board.validMove(pos,color)){
        movelist.push(pos);
      }
    }
  }
  return movelist;
};

module.exports = Board;


b = new Board();
b.print();
// pos = [3,0];
// pos = [3,3];
// color = "black";
// console.log(b.isOccupied(pos));