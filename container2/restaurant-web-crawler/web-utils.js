'use strict';

const cheerio = require('cheerio');
const fetch = require('node-fetch');
const URL = require('url-parse');

async function loadContent(url) {
  try {
    const res = await fetch(url);
    const content = await res.text();
    return cheerio.load(content);
  } catch (err) {
    console.error(err);
  }
}

function harvestLocalHrefs(as, origin, hostname) {
  const fileExtensionsToIgnore =
    ['jpg', 'png', 'bmp', 'pdf', 'svg', 'js', 'css'];

  const hrefs = {};
  for (let i = 0; i < as.length; i++) {
    let href = as[i].attribs.href;
    const extension = /(?:\.([^.]+))?$/.exec(href)[1];
    if (
      !href
      || href.includes('tel:')
      || href.includes('mailto:')
      || href.includes('sms:')
      || href.includes('javascript:')
      || fileExtensionsToIgnore.includes(extension)
      //|| fileExtensionsToIgnore.includes(href.slice(-4))
    ) {
      continue;
    }

    // remove fragments (i.e. /#something) and ignore if we end up with empty string
    href = defragmentify(href);
    if (href === '') {
      continue;
    }

    // if relative, prepend the origin to make it absolute
    if (isRelative(href)) {
      if (href.indexOf('/') !== 0) {
        href = origin + '/' + href;
      } else {
        href = origin + href;
      }
    }

    // handle absolute urls
    else {
      const _hostname = new URL(href).hostname;
      if (!_hostname.includes(hostname)) {
        continue;
      }

      // handle protocol agnostic hrefs
      if (href.indexOf('//') === 0) {
        const protocol = new URL(origin).protocol;

        // prepend protocol of its origin
        href = protocol + href;
      }
    }

    // get rid of adjacent forward slashes in path
    const hrefObj = new URL(href);
    href = hrefObj.origin + hrefObj.pathname.replace(/\/{2,}/, '/');

    // remove trailing slash(es) if there is/are any
    href = removeTrailingSlashes(href);

    if (!hrefs[href]) {
      hrefs[href] = true;
    }
  }

  return hrefs;
}

function isRelative(url) {
  return url.indexOf('http://') !== 0
    && url.indexOf('https://') !== 0
    && url.indexOf('//') !== 0;
}

function defragmentify(url) {
  const hashIndex = url.indexOf('#');
  if (hashIndex > -1) {
    return url.slice(0, hashIndex);
  } else {
    return url;
  }
}

function removeWww(urlKey) {
  return urlKey.replace(/^www./, '');
}

function sliceOffProtocol(href) {
  const url = new URL(href);
  return url.hostname + url.pathname;
}

function removeTrailingSlashes(href) {
  return href.replace(/\/+$/, '');
}

module.exports = {
  loadContent,
  harvestLocalHrefs,
  removeWww,
  removeTrailingSlashes,
  sliceOffProtocol
};
