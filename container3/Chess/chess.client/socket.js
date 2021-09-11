module.exports = socket;

function socket () {
	var io = io.connect('http://localhost:3001');	
	return io
}

