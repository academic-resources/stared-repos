module.exports = move

function move (data){
	var a = document.getElementById(data.piece)	
	var b = document.getElementById(data.endPoint)	
	var piece = $(a)
		,	square = $(b)
	;
		
	piece.attr('data-checker', square.attr('data-index'))
	game.moves.push(data);
	//this square has an occupant and is not the capture zone
	if (square.attr('data-index') !==  'x' && square.children().length) square.children().attr('data-checker', 'x').appendTo($('.captured'));

	square.append(piece);	
}