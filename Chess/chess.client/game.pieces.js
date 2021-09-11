module.black = chessPieces(black)
module.white = chessPieces(white)

function chessPieces (color) {
	var set = {};
	var side = set[color] = {};
	
	side.pawn = {}
	side.rook = {}
	side.knight = {}
	side.bishop = {}
	side.queen = {}
	side.king = {}
	
	return side
}
