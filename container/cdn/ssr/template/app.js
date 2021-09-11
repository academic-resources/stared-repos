"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2020-02-23
 * @modified
 *
 * @description
 * @augments
 * @example
 * @link
 *
 */

// const fetch = require('node-fetch');

const log = console.log;

const getTodayTimestamp = (symbol = `-`) => {
  const date = new Date();
  const dd = String(date.getDate()).padStart(2, '0');
  // Month January is 0!
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  const timestamp = date.getTime();
  // format
  const todayTimestamp = `${yyyy}${symbol}${mm}${symbol}${dd}${symbol}${timestamp}`;
  return todayTimestamp;
}


function renderPosts(posts, container) {
  const html = posts.reduce((html, post) => {
    return `
      ${html}
      <li class="post">
        <h2>${post.title}</h2>
        <div class="summary">${post.summary}</div>
        <p>${post.content}</p>
      </li>
    `;
  }, '');
  // CAREFUL: assumes html is sanitized.
  container.innerHTML = `<ul id="posts">${html}</ul>`;
}

(async() => {
  try {
    const timestamp = getTodayTimestamp();
    const url = `https://cdn.xgqfrms.xyz/json/ssr/posts.json?timestamp=${timestamp}`
    const posts = await fetch(url).then(res => res.json());
    log(`posts`, posts);
    const container = document.querySelector('#container');
    const header = document.querySelector('header');
    header.insertAdjacentHTML(`beforeend`, timestamp);
    const PRE_RENDERED = container.querySelector('#posts');
    // in case of duplication render
    if (!PRE_RENDERED) {
      renderPosts(posts, container);
    }
  } catch (error) {
    log(`fetch error\n`, error);
  }
})();

