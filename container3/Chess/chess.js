var express = require('express')
  , routes = require('./routes')
  , http = require('http')
	,	app = express.createServer()
	, jade = require('jade')
	, io = require('socket.io')
	, sockPuppet = require('./sockPuppet.js')
	, browserify = require('browserify')
	, bundle = browserify(__dirname + '/chess.client/index.js')
;

var origin = process.argv[2] || '0.0.0.0'
var port = Number(process.argv[3]) || 3301

//var origin = process.env.NODE_ENV === 'production' ? '74.207.246.247' : '0.0.0.0'

var app = express();

app.configure(function(){
  app.set('port', port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.cookieParser());
  app.use(express.session({secret: 'bearsnorts'}));
  app.use(express.favicon(__dirname + '/public/favicon.png'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
	app.use(bundle);
  app.use(app.router);
  app.use(express.static(__dirname + '/public/images'), { maxAge: 86400000 });
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
app.get('/board/:gameID', routes.board);
app.get('/', routes.index);

var server = http.createServer(app).listen(app.get('port'), origin, function(){
  console.log("Express server listening on port " + app.get('port'));
});

var sockets = io.listen(3333);
	sockets.configure('production', function(){
		sockets.enable('browser client minification');  // send minified client
		sockets.enable('browser client etag');          // apply etag caching logic based on version number
		sockets.enable('browser client gzip');          // gzip the file
		sockets.set('log level', 9);                    // reduce logging
		sockets.set('transports', [                     // enable all transports (optional if you want flashsocket)
		    'websocket'
		  , 'flashsocket'
		  , 'htmlfile'
		  , 'xhr-polling'
		  , 'jsonp-polling'
		]);
	});
	sockets.on('connection', sockPuppet)
