Returns an array of arrays, or ray-rays. Useful for making checkerboards layouts, at least. Maybe something else.

Notice: I stole the toMatrix algroithm from the node module stats-array.

    npm install gridlayer

	gridlayer = require('gridlayer')
	
	var x = grid(5,5)	

	x[0][4] 
	
	//   an object at index (0,4) q.v:
	//  { zerone: true,
	//    ordinal: 4,
	//    y: 4,
	//    x: 0 }