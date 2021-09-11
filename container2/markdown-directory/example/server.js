var http = require('http');
var fs = require('fs');
var hyperstream = require('hyperstream');
var article = require('../')(__dirname + '/articles');

var server = http.createServer(function (req, res) {
    var m = RegExp('^/article/(.+)').exec(req.url);
    if (!m) return res.end('beep boop\n');
    
    res.setHeader('content-type', 'text/html');
    fs.createReadStream(__dirname + '/article.html')
        .pipe(hyperstream({
            'title': m[1],
            '#article': article(m[1]),
        }))
        .pipe(res)
    ;
});
server.listen(9000);
