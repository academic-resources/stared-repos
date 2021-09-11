var Timer = require('./Timer.js')
;

module.exports = setClock

function setClock(min, sec){
	
	var seconds = document.getElementById('sec')
		, minutes = document.getElementById('min')
		,	glyphClock = $('.glyphClock')
	;
	
	if(min.match(/\D/) || sec.match(/\D/)) return alert('try again with numbers only');
	
	if(game.clock)
	{
		game.clock.pause()
		$('body').unbind('keydown')
		glyphClock.unbind('click')
		delete game.clock	
	} 
	
	var clock = this.clock = new Timer( parseInt(min), parseInt(sec), handler )
	
	function handler(m, s, ms, buzz){
		minutes.value = m
		seconds.value = (s < 10) ? '0' + s : s;
		if(buzz) 
		{
			$('body').unbind('keydown');
 			return 
		}
	}

	glyphClock.bind('click', function(e){
		e.preventDefault();
		clock.pause();
		socket.emit('your move')
	})
		
	$('body').bind('keydown', function(e){
		if(e.originalEvent.srcElement.localName == 'p'){
			return
		}
		else if(e.keyCode == 32) // spacebar
		{
			e.preventDefault();
			clock.pause();
			socket.emit('your move')			
		}
	})
		
}