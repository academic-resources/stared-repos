var test = require('tap').test;
var article = require('../')(__dirname + '/articles');
var concat = require('concat-stream');

test('read articles', function (t) {
    t.plan(2);
    
    article('robot').pipe(concat(function (body) {
        t.equal(body, '<h1>robots</h1>\n<p>Beep boop.</p>\n');
    }));
    
    article('turtle').pipe(concat(function (body) {
        t.equal(body, '<h1>turtles</h1>\n<p>I like turtles.</p>\n');
    }));
});

test('article exceptions', function (t) {
    t.plan(2);
    
    article('../hax').on('error', function (err) { t.ok(err) });
    article('no_such_file').on('error', function (err) { t.ok(err) });
});
