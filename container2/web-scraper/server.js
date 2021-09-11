const express      = require('express');
const RequestQueue = require('./request-queue');
const Sitemap      = require('./sitemap');
const validUrl     = require('valid-url');

var app   = express();

app.get('/', async (req, res) => {

    if (req.query.hasOwnProperty('url') && validUrl.isUri(req.query.url)) {
        const base = req.query.url;

        const map = Sitemap.Build(base);
        const rq  = RequestQueue.Build(map, base);

        await rq.crawl(20);

        // Print the map in depth first manner
        map.print();

        // Returns the sitemap with parent-child relationships in a hash table form
        res.send(map.toJson());
    } else {
        console.log(`User input url invalid`);

        res.status(400);
    }
});

app.listen('3000', () => {
    console.log('App hosted on 3000');
});

module.exports = app;
