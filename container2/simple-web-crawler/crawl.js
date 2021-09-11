var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var SEARCH_WORD = process.argv[2];
var START_URL = process.argv[3];
var MAX_PAGES_TO_VISIT = 1000;

var pagesVisited = {};
var numPagesVisited = 0;
var pagesToVisit = [];
var matchesFound = [];
var url = new URL(START_URL);
var baseUrl = url.protocol + "//" + url.hostname;

pagesToVisit.push(START_URL);

function crawl() {
  if(numPagesVisited >= MAX_PAGES_TO_VISIT) {
    console.log("Reached max limit of number of pages to visit.");
    return;
  }
  var nextPage = pagesToVisit.pop();
  if (nextPage) {
    if (nextPage in pagesVisited) {
      // We've already visited this page, so repeat the crawl
      crawl();
    } else {
      // New page we haven't visited
      visitPage(nextPage, crawl);
    }
  } else {
    console.log("\nFinished search.");
    console.log('\nThe word(s) "' + SEARCH_WORD + '" was found on the following ' + matchesFound.length + ' pages:');
    matchesFound.forEach(function (matchUrl) {
      console.log("\x1b[32m", '\n' + matchUrl);
    });
    console.log('\n');
  }
}

function visitPage(url, callback) {
  // Add page to our set
  pagesVisited[url] = true;
  numPagesVisited++;

  // Make the request
  console.log("Visiting page " + url);
  request(url, function(error, response, body) {
     // Check status code (200 is HTTP OK)
     console.log("Status code: " + response.statusCode);
     if(response.statusCode !== 200) {
       callback();
       return;
     }
     // Parse the document body
     var $ = cheerio.load(body);
     var isWordFound = searchForWord($, SEARCH_WORD);
     if(isWordFound) {
       console.log('Found a match');
       matchesFound.push(url);
     } 
     // else {
       collectInternalLinks($);
       collectAbsoluteLinks($);
       // In this short program, our callback is just calling crawl()
       callback();
     // }
  });
}

function searchForWord($, word) {
  var bodyText = $('html > body').text().toLowerCase();
  return(bodyText.indexOf(word.toLowerCase()) !== -1);
}

function collectInternalLinks($) {
    var relativeLinks = $("a[href^='/']");
    console.log("Found " + relativeLinks.length + " relative links on page");
    relativeLinks.each(function() {
        pagesToVisit.push(baseUrl + $(this).attr('href'));
    });
}

function collectAbsoluteLinks($) {
  var absoluteLinks = $("a[href^='" + baseUrl + "']");
  console.log("Found " + absoluteLinks.length + " absolute links on page");
  absoluteLinks.each(function() {
      pagesToVisit.push($(this).attr('href'));
  });
}

// start the crawl running after a short pause
setTimeout(crawl, 1000);