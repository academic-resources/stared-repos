module.exports = Board;

function Board (x,y){

	var grid = (x && y) ? matrix(x,y) : matrix(8,8);
			
	return grid
	
	function matrix(x,y){
		var arr = []
			,	n = x * y
		;
		
		var zerone = true; // [0,0] is top-left = white
		
		function Position(zerone, ordinal){
			var position = {};
			position.zerone = zerone;
			position.ordinal = ordinal;
			return position
		}
		
		for (i = 0; i < n; ++i)
		{
			arr[i] = Position(zerone, i);
			zerone = !zerone
		}
		
		return arr.toMatrix(x)
		
	};
		
}