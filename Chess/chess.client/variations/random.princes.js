module.exports = standardChessSetup

var diceRoll = function(max){

	var min = 0;
	
	return Math.floor(Math.random() * (max - min + 1)) + min;
	
}

function standardChessSetup (grid){
	
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
				square.id = [x,5].join(',');
				square.occupant = {color: 'white', type: 'pawn'}
		
		}
		var b1 = diceRoll(2) * 2
 			,	b2 = (diceRoll(2) * 2) + 1
			,	n1 = diceRoll(3)
			,	n2 = diceRoll(2)
		;
		
		function leaveOnEmpty(x,y){
			if (grid[x][y].occupant) return leaveOnEmpty(x + 1, y);
			else return x
		}
		
		var wb1 = grid[b1][6]
			,	bb1 = grid[b1][0];
				wb1.id = [b1, 6].join(',')
				bb1.id = [b1, 0].join(',')
				wb1.occupant = {color: 'white', type: 'bishop'}
				bb1.occupant = {color: 'black', type: 'bishop'}
				
		var wb2 = grid[b2][6]
			,	bb2 = grid[b2][0];
				wb2.id = [b1, 6].join(',')
				bb2.id = [b1, 0].join(',')
				wb2.occupant = {color: 'white', type: 'bishop'}
				bb2.occupant = {color: 'black', type: 'bishop'}

		var wn1 = grid[leaveOnEmpty(n1,6)][6]
			,	bn1 = grid[leaveOnEmpty(n1,0)][0];
				wn1.id = [leaveOnEmpty(n1,6), 6].join(',')
				bn1.id = [leaveOnEmpty(n1,0), 0].join(',')
				wn1.occupant = {color: 'white', type: 'knight'}
				bn1.occupant = {color: 'black', type: 'knight'}			

		var wn2 = grid[leaveOnEmpty(n2,6)][6]
			,	bn2 = grid[leaveOnEmpty(n2,0)][0];
				wn2.id = [leaveOnEmpty(n2,6), 6].join(',')
				bn2.id = [leaveOnEmpty(n2,0), 0].join(',')
				wn2.occupant = {color: 'white', type: 'knight'}
				bn2.occupant = {color: 'black', type: 'knight'}	

		var wr1 = grid[leaveOnEmpty(0,6)][6]
			,	br1 = grid[leaveOnEmpty(0,0)][0];
				wr1.id = [leaveOnEmpty(0,6), 6].join(',')
				br1.id = [leaveOnEmpty(0,0), 0].join(',')
				wr1.occupant = {color: 'white', type: 'rook'}
				br1.occupant = {color: 'black', type: 'rook'}	

		var wk = grid[leaveOnEmpty(0,6)][6]
			,	bk = grid[leaveOnEmpty(0,0)][0];
				wk.id = [leaveOnEmpty(0,6), 6].join(',')
				bk.id = [leaveOnEmpty(0,0), 0].join(',')
				wk.occupant = {color: 'white', type: 'king'}
				bk.occupant = {color: 'black', type: 'king'}	

		var wr2 = grid[leaveOnEmpty(0,6)][6]
			,	br2 = grid[leaveOnEmpty(0,0)][0];
				wr2.id = [leaveOnEmpty(0,6), 6].join(',')
				br2.id = [leaveOnEmpty(0,0), 0].join(',')
				wr2.occupant = {color: 'white', type: 'rook'}
				br2.occupant = {color: 'black', type: 'rook'}


	}	

	return grid

}