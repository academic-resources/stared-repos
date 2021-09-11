# window-open

> index.js

```js

    let btns = [...document.querySelectorAll(`[data-btn="hash"]`)];
    btns.forEach(
        (btn, i) => {
            btn.addEventListener(`click`, () => {
                let value = btn.innerText;
                console.log(`value =`, value);
                window.open(`./test.html#${value}`, `logs`);
            });
        }
    );
```

> test.js

```js

    // linsten hash change ???
    document.addEventListener(`DOMContentLoaded`, () => {
        let p = document.querySelector(`[data-uid="hash"]`),
            hash = window.parent.location.hash;
        p.innerHTML = ``;
        p.insertAdjacentHTML(`beforeend`, `<h1>${hash}</h1>`);
    });
    const funcRef = () => {
        let p = document.querySelector(`[data-uid="hash"]`),
            hash = window.parent.location.hash;
        console.log(`new hash =`, hash);
        p.innerHTML = ``;
        p.insertAdjacentHTML(`beforeend`, `<h1>${hash}</h1>`)
    };
    window.addEventListener("hashchange", funcRef, false);

```

