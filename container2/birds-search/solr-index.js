var solr = require('solr-client');
var fs = require('fs');
var cheerio = require('cheerio');
var log = require("./log").log;



var client = solr.createClient();


client.deleteByQuery("*:*", function(err, response) {
    if (err) throw err;
    console.log('Deleted all docs matching query');
    client.commit();
    reIndex();
});


function reIndex() {
    //Loop through files in birds-kb.
    //Load content.
    //Extract: title
    //Extract: keywords
    //extract body
    var BASE_PATH = "./birds-kb/";
    var BASE_LINK = "http://en.wikipedia.org/wiki/";
    var files = fs.readdirSync(BASE_PATH);
    var counter = 0;
    //Loop through files and extract important content
    for (var i = 0; i < files.length; i++) {
        var data = fs.readFileSync(BASE_PATH + files[i], "utf8");
        var doc = cheerio.load(data);

        var title = doc("h1").text();
        if (title === "") {
            log("No title in:" + files[i]);
            continue;
        }

        var articale = {
            id: counter++,
            title_t: title,
            link_t: BASE_LINK + files[i].replace("_data.txt", ""),
            body_t: doc("div#bodyContent").text(),
            summary_t: doc("div#mw-content-text p").first().html()
        };

        client.add(articale, done);
    }

    function done() {
        client.commit();

    }
}