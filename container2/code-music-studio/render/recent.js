var strftime = require('strftime');
var fs = require('fs');
var qs = require('querystring');
var html = fs.readFileSync(__dirname + '/recent.html');
var hyperspace = require('hyperspace');

module.exports = function (params) {
    if (!params) params = {};
    var limit = Number(params.limit) || 500;
    return hyperspace(html, function (row) {
        var q = qs.stringify({ limit: limit, start: row.next });
        if (row.next) {
            return {
                '.link': {
                    href: '/-/recent?' + q,
                    _text: 'next page'
                }
            };
        }
        return {
            '.date': strftime('%F %T', new Date(row.time)),
            '.link': {
                href: '/' + row.name + '?time=' + row.time,
                _text: row.name
            }
        }
    });
};
