var path = require('path');
var fs = require('fs');
var marked = require('marked');
var concat = require('concat-stream');
var through = require('through');

module.exports = function (dir, ext, opts) {

	if('object' == typeof ext) {
		opts = ext;
		ext = '.markdown';
	}
	
	if(opts) marked.setOptions(opts);
	
    return function (articleName) {
        var body = '';
        var outer = through();
        outer.on('error', function (err) {
            outer.emit('data', String(err));
            outer.emit('end');
        });

/*        if (/[\\\/.]/.test(articleName)) {
            error(400, new Error('malformed characters in request'));
            return outer;
        }
  */      
        var file = path.join(dir, articleName + ext);
        var rs = fs.createReadStream(file);
        rs.on('error', function (err) {
            if (err && err.code === 'ENOENT') {
                error(404, new Error('article not found'));
            }
            else outer.emit('error', error(500, err));
        });
        
        rs.pipe(concat(function (body) {
            if (Buffer.isBuffer(body)) {
                outer.queue(marked(body.toString('utf8')));
            }
            else outer.queue(marked(body));
            outer.queue(null);
        }));
        return outer;
        
        function error (code, e) {
            e.statusCode = code;
            process.nextTick(function () {
                outer.emit('error', e);
            });
        }
    };
};
