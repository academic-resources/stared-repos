window.Game = require('./Game.js');

var statsArray = require('stats-array')
	,	setClockControls = require('./controls/clock.controls.js')
	,	setChatControls = require('./controls/chat.controls.js')
	, setUIControls = require('./controls/UI.controls.js')
;

window.onload = function(){
	
	var origin = window.location.hostname
  var port = window.location.port
  console.log(origin)

	window.socket = io.connect('http://'+origin + ':3333');
	
	socket.on('disconnect', function(){
		socket.disconnect();
	})

	socket.on('goToNew', function(){
		var redirect = window.location.origin || 'http://' + window.location.host
		window.location.href = redirect;
	})

	socket.on('connected', function(){
		
		var chat = setChatControls()
				
		socket.emit('join', {location: window.location.pathname.slice(1), ua: window.navigator.userAgent})

		socket.on('join', function(data){
			
			new Game(data);
			game.chat = chat;
			gameInited()
			setClockControls()
			setUIControls()
		
		})

	})
		
	
	function gameInited (){
	
		socket.on('reset', window.game.reset)

		socket.on('setBoard', function(data){
			game.reset(data)
		})
		
		socket.on('move', function (data) {
			game.move(data)
		});

		socket.on('your move', function(){window.game.clock.start()})

		socket.on('clearBoard', function(){
			game.clearBoard.call(game);
		})
		
		socket.on('syncGameBoard', function(data){
	//		console.log(data);
		})

		socket.on('initSync', function(){
			socket.emit('syncGameBoard', JSON.stringify(game.board))
			if(game.clock)
			{
				var data = Object.create(null)
				data.seconds = game.clock.config.seconds
				data.minutes = game.clock.config.minutes
			}
		})
		
	}
	
	$(document).bind('touchmove', function(e){
		e.preventDefault();
	})
}
