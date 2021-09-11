# HTML5 Canvas


https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API


```js

const fetchPOSTJSON = (url = ``, obj = {}) => {
    return fetch(url,
        {
            method: "POST",
            // mode: "no-cors",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(obj),
        }).then(res => res.json())
        .then(
            (json) => {
                console.log(`POST configs OK!`);
                return json;
            }
        ).catch(err => console.log(`fetch error & POST configs Error!`, err));
};


```
## canvas & ruler

https://stackoverflow.com/questions/20434728/how-to-create-a-ruler-a-tool-for-canvas

https://mrfrankel.github.io/ruler/



