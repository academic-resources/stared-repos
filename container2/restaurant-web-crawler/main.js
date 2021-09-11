'use strict';

const URL = require('url-parse');
const urls = require('./urls');
// const { depthFirstSearch } = require('./depth-first-search');
const breadthFirstSearch = require('./breadth-first-search');

(async function() {
  try {

    // clear console
    process.stdout.write('\x1B[2J\x1B[0f');

    for (const s of urls) {

      // counter will increment for each hit
      let counter = 0;

      await breadthFirstSearch(s, function(domTree, url) {
        const as = domTree('a');
        for (let i = 0; i < as.length; i++) {
          const href = as[i].attribs.href;
          if (href) {
            const hostname = new URL(href).hostname;
            if (hostname.includes('ezcater.com')) {
              console.log(`Found link: ${href} on ${url}`);
              counter++;
            }
          }
        }
      });
      console.log('\n\n');
      if (counter === 0) {
        console.log(`Finished. Could not find any links on ${s}`);
      } else {
        const message = 'Finished. Found a total of '
          + counter
          + ' link'
          + (counter === 1 ? '' : 's')
          + ' on ' + s;
        console.log(message);
      }
      console.log('\n\n');
    }
  } catch (err) {
    console.error(err);
  }
})();
