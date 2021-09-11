var dj = function (pts) {
	return function (t) {
		for (var a = pts; a.length > 1; a = b){  
			for (var i = 0, b = [], j; i < a.length - 1; i++){
				for (b[i] = [], j = 1; j < a[i].length; j++){
					b[i][j] = a[i][j] * (1 - t) + a[i+1][j] * t;
				}
			}
		}
		return a[0][1];
	}
}

var env = dj([[0,0], [1,0], [1,1], [0,0]])

console.log(env(.5))
