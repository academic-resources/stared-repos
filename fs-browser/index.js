var fs = require('fs')
  , http = require('http')
  , dir = process.cwd()
  , parent = dir.slice(dir.lastIndexOf('/'))
  , filed = require('filed')
  , ecstatic = require('ecstatic')(__dirname + '/public')
  , handlebars = require('handlebars')
  , route = require('./router')()
;

var source = fs.readFileSync('./public/index.html', 'utf8')
  , template = handlebars.compile(source)
  , fd = dir.split('/').splice(1)
  , state = {}
  , current = {}
  , p = {}
  , d
;

console.log(fd)

fd.forEach(function(e){
	d[e] = {}
	d = p[e]
})

console.log(state)

current[parent] = {};

fs.readdir(dir, function(e, d){
	
	if(e) console.error(e);
	
	d.forEach(function(e){
		fs.stat(e, function(err, r){
			if(r.isDirectory()){
				current[parent]['/' + e] = {};
			}
			else{
				current[parent]['-' + e] = {};
			}
		})
	})
	
});


route.get('/path/{path}', function(req, res){
	res.writeHead(200, {
		'Content-Type' : 'text/json'
	});
	
	res.end(JSON.stringify(current[parent]))
})


var server = http.createServer(function(req, res){
	
    route(req, res, function(){
	    ecstatic(req, res)	 
    })
	
}).listen(7000)

/*
if(req.url == '/'){
	
  res.statusCode = 302;
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Location', dir);
  res.end('Redirecting to ' + dir);
  return

}
*/