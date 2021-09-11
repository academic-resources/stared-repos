module.exports = function(app)
{
	//=======================================================
	//require any controllers you may need so I can access their methods
	//routes pick up url request and call appropriate controller method (RESTful routes)
	//=======================================================
	var users = require('./../controllers/users.js');
	var topics = require('./../controllers/topics.js');
	var comments = require('./../controllers/comments.js');
	var posts = require('./../controllers/posts.js');

	// root route
	app.get('/', function(req, res){
		res.render('index');
	});

	// login routes (index.html)
	app.post('/checkUserExists/:any', function(req, res){
		console.log('routes');
		users.checkUserExists(req, res);
	});

	app.post('/addUser', function(req, res){
		users.addUser(req, res);
	});

	// dashboard.html routes
	app.post('/addTopic', function(req, res){
		topics.addTopic(req, res);
	});

	app.get('/getTopic', function(req, res){
		topics.getTopic(req, res);
	});

	// users
	app.get('/showUser/:any', function(req, res){
		users.showUser(req, res);
	});

	// topic
	app.get('/getTopicsById/:id', function(req, res){
		console.log('in routes for getTopicsById');
		topics.getTopicsById(req, res);
	});

	app.get('/getPostsById/:id', function(req, res){
		console.log('in routes for getPostsById');
		posts.getPostsById(req, res);
	});

	app.post('/addPost', function(req, res){
		console.log('in routes for addPost');
		posts.addPost(req, res);
	});

	app.post('/addComment', function(req, res){
		console.log('in routes for addComment');
		comments.addComment(req, res);
	});

	app.get('/getCommentsByPostId/:id', function(req, res){
		console.log('in routes to get comments by post id');
		comments.getCommentsByPostId(req, res);
	});

	app.post('/upVotePost/:id', function(req, res){
		console.log('in routes for update');
		posts.upVotePost(req, res);
	});


}
