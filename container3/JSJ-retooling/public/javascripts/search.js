window.addEventListener('load', () => {
  const bar = document.getElementById('searchBar');
  bar.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && bar.value !== '' && bar.value !== ' ') {
      const searchData = bar.value;
      const url = `/?entry=${searchData}`;
      window.location.href = url;
    }
  });
  const icon = document.getElementById('searchIcon');

  icon.addEventListener('click', () => {
    if (bar.value !== '' && bar.value !== ' ') {
      const searchData = bar.value;
      const url = `/?entry=${searchData}`;
      window.location.href = url;
    }
  });
});
