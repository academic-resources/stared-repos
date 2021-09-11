var util = require('util')
	,	_ = require('underscore')
	,	fs = require('fs')
	,	Boards = {}, $b = 0
	,	Players = {}, $p = 0
	, Game = function(path, player){
			var game = {};
			game.id = path;
			game.moves = [];
			game.players = [];
			game.players.push(player);
			player._game = game;
			return game
	}
	, Player = require('./game.server/Player.js')
	, bot = 'bot'
	, clientConnections = 0
;

var feedback = fs.createWriteStream('./logs/feedback.'+Date.now()+'.txt')

module.exports = function(socket){
		
	var player = Players[socket.id] = socket;
	
	++clientConnections;
	
	player.opponent = function(){
		var self = this;
		var opponent = _.filter(this._game.players, function(e){
			return (e.id !== self.id)
		})[0];
		return opponent;
	}
	
	player.emit('connected')
	
	player.on('disconnect', function(){
		--clientConnections;
		var	game = player._game;
		if(!game) return;
		game.players.forEach(function(e,i){
			if (e.id == player.id)
			{	
				game.players.splice(i,1);
				delete Players[player.id]
			}
			else
			{
				game.players[i].emit('chat', {text: 'Your opponent has disconnected.', from: bot})
			}
		})
		if(!game.players.length)
		{
			delete Boards[game.id]
		}
		return 
	})
		
	player.on('join', function(data){
		
		player._userAgent = data.ua;
		
		var board = data.location;
		if(!Boards[board])
		{
			Boards[board] = new Game(board, player)
			player.emit('chat', {text: 'You are connected to a new board. Send the link to your opponent.', from: bot})
			player.emit('join')
		}
		else
		{
			var game = Boards[board];
			switch (game.players.length)
			{
				case 0:
					Boards[board] = new Game(board, player)
					player.emit('chat', {text: 'You are connected to a new board. Send the link to your opponent.', from: bot})
					player.emit('join')
				break;
				case 1:
					if(game.players[0].id == player.id)
					{
						player.emit('chat', {text: 'You seem to be returning to ' + game.id, from: bot})
						player.emit('join')
					
					}
					else
					{
						game.players.push(player)
						player._game = game;
						player.emit('chat', {text: 'Your opponent is connected and your boards are synced. Play on, or click GAME for options', from: bot})
						game.players[0].emit('chat', {text: 'Your opponent has connected, and your boards have synced. Play on, or click GAME for options.', from: bot})
						game.players[0].emit('initSync')
						player.emit('join', {board: game.board, moves: game.moves})
						
					}
				break;
				case 2:
						player.emit('goToNew');
						player.disconnect();	
				break;
				default:
				break;
			}
		}
	})
	
	player.on('boardSet', function(data){
		player._game.board = data;
		var opponent = player.opponent();
		if (opponent) opponent.emit('setBoard', data);
		return
	})
	
	player.on('syncGameBoard', function(data){
		var opponent = player.opponent();
		if (opponent) opponent.emit('syncGameBoard', data);
		return
	})

	player.on('your move', function(){
		var opponent = player.opponent();
		if (opponent) opponent.emit('your move');
		return
	})
	
	player.on('stopClock', function(data){
		var opponent = player.opponent();
		if (opponent) opponent.emit('stopClock', data);
		return
	})

	player.on('syncRSVP', function(data){
		var opponent = player.opponent();
		if (opponent) opponent.emit('syncRSVP', data);
		return
	})
	
	player.on('chat', function(data){
		var txt = data.text.toLowerCase();
		if(txt.match('#feedback') || txt.match('#bug'))
		{
			feedback.write(player._userAgent + '\n' + data.text + '\n', 'utf8');
			player.emit('chat', {text:'Thank you for your feedback.', from: bot})
			return
		}
		var opponent = player.opponent();
		if (opponent) opponent.emit('chat', data);
		return
	})
	
	player.on('clearBoard', function(){
		var opponent = player.opponent();
		if (opponent) opponent.emit('clearBoard');
		return
	})
	
	player.on('reset', function(){
		var opponent = player.opponent();
		if (opponent) opponent.emit('reset');
		return
	})
	
	player.on('triggerUseGameClock', function(){
		var opponent = player.opponent();
		if (opponent) opponent.emit('triggerUseGameClock');
		return
	})
	
	player.on('move', function(data){
		var opponent = player.opponent();
		player._game.moves.push(data);
		if (opponent) opponent.emit('move', data);
		return
	})
	
	player.on('clientConnections', function(){
		player.emit('clientConnections', clientConnections)
	})
	
}