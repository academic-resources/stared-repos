module.exports = Timer

function Timer (minutes, seconds, callback){
	
	var minutes = minutes || 0, 
			seconds = seconds || 0
			callback = callback || function(){};
	
	var time = Object.create(null);
	
	time.config = {
		minutes : minutes,
		seconds : seconds
	}

	time.init = function(){
		
		this.emit = callback;
					
		this.clock = (this.config.seconds * 100) + (this.config.minutes * 6000) // total time in 1/100th seconds 
		
		this.progress = true;
		
	}
			
	time.tick = function(self){
		
		if ( ! (--self.clock >= 0) ) {
			self.end()
			return
		}
		
		var min = Math.floor(self.clock / 6000),
				sec = Math.floor((self.clock % 6000) / 100)
				;
		
		self.emit(min, sec, self.clock, false)
								
	}
	
	time.start = function(){
				
		if(!this.progress) return;
		
		this.timer = setInterval(this.tick, 10, this)

	}
	
	time.pause = function(){
		
		window.clearInterval(this.timer)
			
	}
	
	time.reset = function(){
		
		this.pause();
		
		this.emit(this.config.minutes, this.config.seconds, this.clock, false, true) // reset clock
		
		this.init()
		
	}
	
	time.end = function(){
		
		this.progress = false;
				
		this.emit(0, 0, 0, true)
		
		this.reset();
	
	}
	
	time.init();
	
	return time;
	
}