function mago (time){
	var now = function(){return Math.round(new Date().getTime()/1000.0)};
	var ago = now() - time;
	console.log(now());
	if (ago < 86400){ return '~ '+Math.round(ago/3600)+'hour'+plural(Math.round(ago/2629743))+' ago'};
	var plural = function(num){
		if (num > 1) return 's'
		else return ""
	};
	if (ago > 86400 && ago < 604800){ return '~ '+Math.round(ago/86400)+' days'+plural(Math.round(ago/2629743))+' ago'};
	if (ago > 604800 && ago < 2629743){return '~ '+Math.round(ago/604800)+' weeks'+plural(Math.round(ago/2629743))+' ago'};
	if (ago > 2629743 && ago < 31556926){return '~ '+Math.round(ago/2629743)+' month'+plural(Math.round(ago/2629743))+' ago'};
}


