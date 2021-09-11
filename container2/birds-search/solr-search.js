var log = require("./log").log;
var solr = require('solr');
var client = solr.createClient();


var query = 'title_t:# OR summary_t:# OR body_t:#';
client.query(query, function(err, response) {
    if (err) throw err;
    var responseObj = JSON.parse(response);
    console.log('A search for "' + query + '" returned ' + responseObj.response.numFound + ' documents.');
    console.log('First doc title: ' + responseObj.response.docs[0].title_t);
    console.log('Second doc title: ' + responseObj.response.docs[1].title_t);
    console.log(response);
});