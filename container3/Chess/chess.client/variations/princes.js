// its a slugmatch, but every swing leaves you open

module.exports = princeMatchChessSetup

function princeMatchChessSetup (grid){
	
	var grid = grid
	
	setPieces()
	
	return grid;
	
	function setPieces(){
		for(var x = 0; x < 7; ++x)
		{
			var square = grid[x][1];
				square.id = [x,1].join(',');
				square.occupant = {color: 'black', type: 'pawn'}

			var square = grid[x][5];
				square.id = [x,6].join(',');
				square.occupant = {color: 'white', type: 'pawn'}
			
			var pos0 = grid[x][0], 
					pos7 = grid[x][6];
					
					pos0.id = [x,0].join(',')
					pos7.id = [x,6].join(',')
					
			if (x == 0 || x == 6)
			{
				pos0.occupant = {color: 'black', type: 'rook'}
				pos7.occupant = {color: 'white', type: 'rook'}
			}
			if (x == 1 || x == 4)
			{
				pos0.occupant = {color: 'black', type: 'knight'}
				pos7.occupant = {color: 'white', type: 'knight'}
			}
			if (x == 2 || x == 5)
			{
				pos0.occupant = {color: 'black', type: 'bishop'}
				pos7.occupant = {color: 'white', type: 'bishop'}
			}
			if (x == 3)
			{
				pos0.occupant = {color: 'black', type: 'king'}
				pos7.occupant = {color: 'white', type: 'king'}
			}
		}
	}	

	return grid

}