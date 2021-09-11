function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function shufflearray()
{
	for (var i = nrImg-1; i >= 1; i--)
	{
		var j = randomIntFromInterval(0,i);
		var storepic = Vect[i];
		Vect[i] = Vect[j];
		Vect[j] = storepic;
	}
	Effect();
		
	clearInterval(mytime);
	mytime = setInterval(Timer, IntSeconds * 1000);
}