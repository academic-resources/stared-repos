var scraper = require('../lib/scraper');

scraper('http://search.twitter.com/search?q=javascript', function(err, $) {
	if (err) {throw err;}

	$('.msg').each(function() {
		console.log($(this).text().trim()+'\n');
	});
});