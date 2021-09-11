/**
 * Initializes the Piece with its color.
 */
function Piece (color) {
    this.color = color;

}

/**
 * Returns the color opposite the current piece.
 */
Piece.prototype.oppColor = function () {
   return this.color === "black" ? "white" : "black";
};

/**
 * Changes the piece's color to the opposite color.
 */
Piece.prototype.flip = function () {
    this.color === "black" ? this.color = "white" : this.color = "black";
};

/**
 * Returns a string representation of the string
 * based on its color.
 */
Piece.prototype.toString = function () {
    ret_str = ''
    if (this.color === "black") {
        ret_str = 'B' /*'○'*/
    } else {
        ret_str = 'W' /*'●'*/
    } 
  return ret_str;
  
};

module.exports = Piece;
