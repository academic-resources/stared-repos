var nvelope = require('nvelope');

module.exports = function(params){
	var envelope = nvelope(params.curves, params.durations);
	var sustain, cutoff;
	if(params.sustain){ // refers to some segment of the envelope
		if(Object.prototype.toString.call(params.sustain) === '[object Object]'){ // sustain is its own envelope
			console.log('ehll;');
			var dur = params.sustain.durations.reduce(function(e,i){return e + i}, 0);
			var env = nvelope(params.sustain.curves, params.sustain.durations);
			var diff = undefined
			sustain = function(t){
				if(diff === undefined) diff = Math.abs(t)
				t = t - diff;
				return env(t % dur)
			}
		}
		else if(Array.isArray(params.sustain)){
			var td = params.durations.reduce(function(e, i){return e + i}, 0);
			var xd = params.durations.slice(params.sustain[0], params.sustain[0] + params.sustain.length)
			var sd = xd.reduce(function(e, i){return e+i},0);
			var start = params.durations.slice(0, params.sustain[0]).reduce(function(e,i){return e+i},0)
			var diff = undefined;
			sustain = function(t){
				if(t < start) return envelope(t);
				else{
					if(diff === undefined) diff = Math.abs(t);
					t = t - diff;
					return envelope(start + (t % sd))
				}
			}
		}
		else if(!isNaN(params.sustain)){  // sustain is a static amplitude value
			sustain = function(){return params.sustain}
		}
	}
	return {envelope: envelope, sustain: sustain}
}
