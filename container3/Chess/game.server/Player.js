var _ = require('underscore')

module.exports = Player;

function Player (board, socket){
		var player = {};
		util.inherit(player.prototype, socket);
		player.game = board;
		return player
}

Object.defineProperty(Player.prototype, 'opponent', 
	{
		get : function()
		{
			var players = this.game.players;
			var opponent = players[0] == this.id ? players[1] : players[0]
			return opponent
		}
	}
)

Player.prototype.opponent = function(){
	
}