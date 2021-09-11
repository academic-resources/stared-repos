'use strict';

const URL = require('url-parse');
const { compose } = require('ramda');

const {
  loadContent,
  harvestLocalHrefs,
  removeWww,
  sliceOffProtocol,
  removeTrailingSlashes
} = require('./web-utils');

async function breadthFirstSearch(s, f) {
  console.log(`Crawling ${s}......`);

  const normalizeUrlKey = compose(
    removeWww,
    removeTrailingSlashes,
    sliceOffProtocol
  );

  const key = normalizeUrlKey(s);
  const hostname = new URL(s).hostname;
  const level = { [key]: 0 };

  let i = 1;
  let frontier = [s];
  let next;
  while (frontier.length > 0) {
    next = [];
    for (const u of frontier) {
      console.log(u);
      const origin = new URL(u).origin;
      const domTree = await loadContent(u);

      if (typeof domTree === 'function') {
        f(domTree, u);
        const as = domTree('a');
        const adj = harvestLocalHrefs(as, origin, hostname);
        for (const v in adj) {
          const _key = normalizeUrlKey(v);
          if (!level.hasOwnProperty(_key)) {
            level[_key] = i;
            next.push(v);
          }
        }
      }
    }
    frontier = next;
    i++;
  }
}

module.exports = breadthFirstSearch;
