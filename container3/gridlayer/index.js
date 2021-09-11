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
			position.y = i % x;
			position.x = Math.floor(i / x);
			return position
		}
		
		for (i = 0; i < n; ++i)
		{
			arr[i] = Position(zerone, i);
			zerone = !zerone
		}
				
		return toMatrix.call(arr, x)
		
	};
		
};

function toMatrix(quantiles) {
      var indexes = []
        , matrix = []
        , matrixLength = quantiles || 2

      for (var i=0; i<matrixLength; i++) {
        indexes[i] = []

        if (!!indexes[i-1]) 
          indexes[i][0] = indexes[i-1][1]
        else 
          indexes[i][0] = 0

        if (i === matrixLength) 
          indexes[i][1] = this.length - 1
        else 
          indexes[i][1] = Math.round((this.length)*(i+1) / matrixLength) //-1

        matrix[i] = this.slice(indexes[i][0], indexes[i][1])

      }
      return matrix
    }