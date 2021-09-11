import { showModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", e => {
  const draftsTab = document.querySelector('.tab-drafts');
  const publishedTab = document.querySelector('.tab-published');
  const drafts = document.getElementById('drafts');
  const published = document.getElementById('published');
  const storiesContainer = document.querySelector('.stories-container');

  if (draftsTab && publishedTab) {
    draftsTab.addEventListener('click', e => {
      e.stopPropagation();
      draftsTab.classList.add('active');
      publishedTab.classList.remove('active');
      drafts.classList.remove('hide');
      published.classList.add('hide');
    });
    publishedTab.addEventListener('click', e => {
      e.stopPropagation();
      publishedTab.classList.add('active');
      draftsTab.classList.remove('active');
      drafts.classList.add('hide');
      published.classList.remove('hide');
    });
  }

  storiesContainer.addEventListener('click', async (e) => {
    const target = e.target;
    if (target.classList.contains('story-options-dropdown')) {

      const menu = target.nextSibling;
      if (menu.classList.contains('hide')) {
        target.classList.add('active');
        menu.classList.remove('hide');
      } else {
        target.classList.remove('active');
        menu.classList.add('hide');
      }
    }
    if (target.classList.contains('delete-story')) {
      e.preventDefault();
      const doIt = confirm('Permanently delete your story?');
      if (!doIt) return;
      try {
        const res = await fetch(`${target.href}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            throw new Error('Deletion failed' + res);
        }
        target.closest('.story').remove();
      } catch (err) {
          showModal(err.message);
      }
    }
  });


})
