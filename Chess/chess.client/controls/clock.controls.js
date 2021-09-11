module.exports = clockControls

function clockControls(){

	var $sync = $('#sixtysecond')
		, $stop = $('#stopClock')
		, min = document.getElementById('min')
		,	sec = document.getElementById('sec')
		, chessClock = $('#chessClock')
		, chessClockControl = $('input[name=useGameClock]')
	;
	
	chessClock.hide()

	$sync.click(function(e){

		window.game.setClock(min.value, sec.value);
		
		game.chat({text: '//* Press the space bar or click the clock at the end of your move *//', from:''})

		socket.emit( 'syncRSVP')
		
		$sync.hide();

		$stop.show()

	})

	$stop.click(function(){

		game.clock.end()
		
		socket.emit('stopClock')
		
		$stop.hide()
		
		$sync.show()
		
	})
	
	socket.on('stopClock', function(){
		
		game.clock.end()
		
		$stop.hide()
		
		$sync.show()
		
	})
	
	socket.on('syncRSVP', function(data){
		
		var a = confirm('start game?')
		
		if(a) {
				window.game.setClock(min.value, sec.value);
				socket.emit('your move');
				$sync.hide();
				$stop.show();
				game.chat({text: '//* Press the space bar or click the clock at the end of your move *//', from:''})
		}
		
	})
	
	chessClockControl.click(function(evt, silent, checked){

		chessClock.fadeToggle();

	})
	
	socket.on('triggerUseGameClock', function(data){

		chessClockControl.attr('checked', data)

	})	

}