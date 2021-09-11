var	init = require('./init.js')
	,	move = require('./handleMove.js')
  , setGameBoard = require('./setGameBoard.js')
	,	setClock = require('./clock.js')
	,	config = require('./config.js')
;

module.exports = Game;

function Game ($game){
	var self = this;
	window.game = this;
	this.init($game);
	window.chessGame = this;
	return self
}

Game.prototype.config = config;

Game.prototype.setClock = setClock;

Game.prototype.rotate = function(){
	if(_.contains(this.table.classList, 'rotate'))
	{
		this.table.classList.remove('rotate')
	}
	else
	{
		this.table.classList.add('rotate')
	}
};

Game.prototype.betaBoard = setGameBoard

Game.prototype.init = init;

Game.prototype.move = move ;

Game.prototype.reset = function(board){
	$('#table div img').children().unbind();
	$('#table').empty();
	$('#captured').empty();
	if(game.clock) game.clock.reset();
	game.init(board);
}

Game.prototype.clearBoard = function(){
	var self = this;
	$('#table > div > div').each(function(e,i){
		self.move({piece: i.id, endPoint: 'captured'})
	})
}

Game.prototype._clearBoard = function(){
	window.socket.emit('clearBoard')
	this.clearBoard();
}


Game.prototype._reset = function(){
		// removed window.confirm
		window.socket.emit('reset')
		this.reset();
}