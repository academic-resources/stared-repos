var fs = require('fs')
    , cheerio = require('cheerio')
    , log = require("./log").log;

const BASE_PATH = "./birds-kb/";

function genusToCSV() {
    //Loop through files in birds-kb.
    //Load content.
    //Extract: genus
    //Extract: family
    //Extract: title
    //Save to File
    var files = fs.readdirSync(BASE_PATH);
    var asCSV = "";
    var counter = 0;
    for (var i = 0; i < files.length; i++) {
        var data = fs.readFileSync(BASE_PATH + files[i], "utf8");
        var $ = cheerio.load(data);
        let family = $('td:contains("Family") ~ td').children("a").text().trim()
        let genus = $('td:contains("Genus") ~ td').children("a").text().trim()
        let order = $('td:contains("Order") ~ td').children("a").text().trim()
        var title = $("h1").text();
        asCSV += `${title},${family},${order},${genus}\n`

    }

    fs.writeFile('genus.csv', asCSV, function (err) {
      if (err) throw err;
      console.log('It\'s saved!');
    })

}

genusToCSV()