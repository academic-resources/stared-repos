var strftime = require('strftime');
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/history.html');
var hyperspace = require('hyperspace');

module.exports = function () {
    return hyperspace(html, function (row) {
        var time = row.key[2];
        var name = row.key[1].join('/');
        return {
            '.date': strftime('%F %T', new Date(time)),
            '.link': { href: '/' + name + '?time=' + time }
        }
    });
};
