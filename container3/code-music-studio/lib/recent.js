var through = require('through2');

module.exports = function (db) {
    return function (opts) {
        if (!opts) opts = {};
        var start = opts.start !== undefined ? Number(opts.start) : undefined;
        if (!opts.end) opts.end = null;
        var prev, count = 0;
        var limit = Number(opts.limit) || 500;
        
        return db.createReadStream({
            start: [ 'song-time', start ],
            end: [ 'song-time', null ],
            reverse: true,
            limit: limit
        }).pipe(through.obj(write, end));
        
        function write (row, enc, next) {
            prev = row;
            count ++;
            this.push({
                time: row.key[1],
                name: row.key.slice(2).join('/')
            });
            next();
        }
        function end () {
            if (prev && count === limit) {
                this.push({ next: prev.key.slice(1) });
            }
            this.push(null);
        }
    };
};
