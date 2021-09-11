var http = require('http');
var director = require('director');
var log = require("./log").log;
var solr = require('solr-client');
var union = require('union');
var ecstatic = require('ecstatic');
var url = require('url');

var client = solr.createClient();


function solrSearch(searchterm) {

    //add page to start from
    var parts = url.parse(this.req.url, true);
    var page = parts.query['page'];

    var that = this;
    var query = client.createQuery().q(searchterm)
                  .dismax()
                  .qf({title_t : 0.2 , summary_t : 3.3})
                  .mm(2).start(page).rows(10);
    client.search(query, function(err, obj) {
        if (err) throw err;

        that.res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        that.res.end(JSON.stringify(obj));
    });
}

//##### The flatiron-director router
var router = new director.http.Router({
    '/search/:searchterm': {
        get: solrSearch
    }
});


var server = union.createServer({
    before: [

    function(req, res) {
        var found = router.dispatch(req, res);
        if (!found) {
            res.emit('next');
        }
    },
    ecstatic(__dirname + '/public')]
});


server.listen(8080);
console.log('Listening on http://127.0.0.1:8080');