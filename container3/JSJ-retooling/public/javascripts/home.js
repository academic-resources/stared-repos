import { navButton, refreshPage } from './index.js';

let currentPage = 1;
let pageMode = 'recent';
let lastPageEl;

const highlightPage = page => {
  document.querySelectorAll('.numberedButton').forEach(button => button.classList.remove('numberedButton--selected'));
  document.querySelector(`#numberedButtonId__${page}`).classList.add('numberedButton--selected');
};

window.addEventListener('load', async () => {
  let searchEntry = window.location.href.match(/(?<=entry=([^a-zA-Z]*))[a-zA-Z][a-zA-Z0-9- ]+(?=(.*))/);
  if (searchEntry) {
    searchEntry = searchEntry[0];
    pageMode = 'search';
  }
  const { threads, pages: totalPages } = await (await window.fetch(`/api/new/${pageMode}/${currentPage}?entry=${searchEntry}`)).json();
  refreshPage(threads);

  const container = document.getElementById('pageSelection');

  if (totalPages > 1) {
    lastPageEl = navButton('Prev', container, lastPageEl);
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1) lastPageEl = navButton(i, container, lastPageEl, true);
      else lastPageEl = navButton(i, container, lastPageEl);
    }
    lastPageEl = navButton('Next', container, lastPageEl);
  }

  document.querySelectorAll('.sortButton').forEach(sortButton => {
    sortButton.addEventListener('click', async ({ target }) => {
      const otherId = target.id === 'recent' ? 'popular' : 'recent';
      const otherButton = document.getElementById(otherId);
      pageMode = target.innerText.toLowerCase();
      target.classList.add('sortButton--selected');
      otherButton.classList.remove('sortButton--selected');
      currentPage = 1;
      const { threads: sortThreads } = await (await window.fetch(`/api/new/${pageMode}/${currentPage}?entry=${searchEntry}`)).json();
      refreshPage(sortThreads);
      highlightPage(currentPage);
    });
  });

  document.querySelectorAll('.numberedButton').forEach(numberedButton => {
    numberedButton.addEventListener('click', async ({ target }) => {
      if (target.innerText === 'Prev' && currentPage !== 1) currentPage--;
      else if (target.innerText === 'Next' && currentPage !== totalPages) currentPage++;
      else currentPage = target.innerText;
      const { threads: numberThreads } = await (await window.fetch(`/api/new/${pageMode}/${currentPage}?entry=${searchEntry}`)).json();
      refreshPage(numberThreads);
      highlightPage(currentPage);
    });
  });
});
