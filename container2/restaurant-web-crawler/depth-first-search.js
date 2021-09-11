'use strict';

const URL = require('url-parse');

const { loadContent, harvestLocalHrefs } = require('./web-utils');

async function depthFirstSearch(root, f) {
  console.log(`Crawling ${root}.......`);
  const hostname = new URL(root).hostname;
  const visited = {};
  try {
    await visit(hostname, visited, f, { [root]: true });
  } catch (err) {
    console.error(err);
  }
}

async function visit(hostname, visited, f, vs) {
  for (const v in vs) {
    const url = new URL(v);

    // using this as a key instead of full url
    // to avoid double visiting for https: and http:
    let key = url.hostname + url.pathname;

    // remove trailing slash if there is one
    if (key[key.length - 1] === '/') {
      key = key.slice(0, -1);
    }

    if (!visited[key]) {
      console.log(v);
      try {
        const domTree = await loadContent(v);
        f(domTree, v);
        visited[key] = true;
        const as = domTree('a');
        const origin = url.origin;
        const verticesToVisit = harvestLocalHrefs(as, origin, hostname);
        await visit(hostname, visited, f, verticesToVisit);
      } catch (err) {
        console.error(err);
      }
    }
  }
}

module.exports = {
  visit,
  depthFirstSearch
};
