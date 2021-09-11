module.exports = function (db) {
    return function (parts, params, cb) {
        var key = [ 'song', parts ];
        if (params.time) {
            key.push(parseInt(params.time,10));
            return db.get(key, function (err, song) {
                if (err) cb(err)
                else cb(null, song)
            });
        }
        var s = db.createReadStream({
            start: key.concat(undefined),
            end: key.concat(null),
            limit: 1,
            reverse: true
        });
        var found = false;
        s.on('data', function (row) {
            found = true;
            cb(null, row.value);
        });
        s.on('end', function () {
            if (!found) cb('not found');
        });
    }
};
