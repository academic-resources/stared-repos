Go to initial commit on GitHub repo. Must have GitHub repo open in active tab.

```js
javascript: ((b) =>
  fetch("https://api.github.com/repos/" + b[1] + "/commits?sha=" + (b[2] || ""))
    .then((c) => Promise.all([c.headers.get("link"), c.json()]))
    .then((c) => {
      if (c[0]) {
        var d = c[0]
          .split(",")[1]
          .split(";")[0]
          .slice(2, -1);
        return fetch(d).then((e) => e.json());
      }
      return c[1];
    })
    .then((c) => c.pop().html_url)
    .then((c) => (window.location = c)))(
  window.location.pathname.match(/\/([^\/]+\/[^\/]+)(?:\/tree\/([^\/]+))?/)
);
```
