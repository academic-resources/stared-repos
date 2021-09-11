// This job will be resposible for scraping the birds list of the israbirding.com site.
// Once scraped, it will spawn a number of child process (based on number of cpus?) to scrape
// Wikipedia for the pages of each of the species.
var request = require('request')
  , cheerio = require('cheerio')
  , async = require('async')
  , fs = require('fs')
  , path = require('path')
  , log = require("./log").log
  , http =require("http");

const https = require('https')
var options = {
  host: 'en.wikipedia.org',
  port: 443,
  path: '',
  headers: {"user-agent": "BirdData/1.1 (https://www.israbirding.com/; israbirding@gmail.com)"}
};

const ROOT_URL = 'https://www.israbirding.com/checklist/'

function parseSpeciesName(orig) {
    return (orig.replace(/\ /g, "_").replace("backspace", "").trim());
}

function scrapeWikiPage(species_name) {

  var filename = "./birds-kb/" + species_name + "_data.txt";

  options.path="/wiki/" + species_name;
  var data ="";

  const file = fs.createWriteStream(filename);
  const request = https.get(options, function(response) {
    response.pipe(file);
  });
}


var doneOnce = false;
var g_speciesList = [];
var q = null;

var CONCURRENT = 10;
var TIMEOUT = 4 * 1000;

function doIt(species) {

    if (!doneOnce) {
        doneOnce = true;
        g_speciesList = species;
        q = async.queue(function(item, callback) {
            scrapeWikiPage(item.bird);
            setTimeout(callback, TIMEOUT);
        }, CONCURRENT);

        addToQueue();


        q.drain = function() {
            console.error("Done scraping");
        };
    }

}

function addToQueue(species_name) {
    var new_item = g_speciesList.pop()
    if (new_item) {
        q.push({
            bird: new_item
        }, addToQueue)
    }
    if (q.length() < CONCURRENT / 2) {
        addToQueue(); //Fill up
        log("Fill up queue")
    }
}

function scrapeList() {
    request(ROOT_URL, function (err, response, body) {
        if (err) throw err
        var $ = cheerio.load(body)
        var species = []
        $('td.en').each(function(bird_species) {
          species.push(parseSpeciesName($(this).text()))
        });
        doIt(species)
    });
}

scrapeList();