module.exports = function(app, server){
	app.get('/', function(req, res){
		res.render('index.ejs');
	});	
}