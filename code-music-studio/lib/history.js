module.exports = function (db) {
    return function (parts) {
        var key = [ 'song', parts ];
        return db.createReadStream({
            start: key.concat(undefined),
            end: key.concat(null),
            reverse: true
        });
    }
};
