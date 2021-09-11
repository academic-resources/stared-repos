import FocusImage from '../../dist/es6/focus'

// Regular ES5 syntax is allowed
let imageContainer = document.getElementById('images');

let config = {
    imageSrc: 'https://source.unsplash.com/category/nature/1024x768',
    parentElement: null,
    zoomFactor: '250%',
    smoother: true,
    width: '100%', // Scale to parent component by default
    height: '66.7%', // Scale to percent of height by default
};

for (let i = 0; i < 10; i++) {
    let col = document.createElement('div');
    col.className = 'col-6';
    config.parentElement = col;
    config.imageSrc = `./img/${i}.jpg`;
    imageContainer.appendChild(col);
    new FocusImage(config);
}

/**
 * CUSTOM CURSORS
 */

let col = document.createElement('div');
col.className = 'col-6';
document.querySelector("#images2").appendChild(col);
new FocusImage({
    imageSrc: 'https://source.unsplash.com/category/nature/1024x768',
    parentElement: col,
    zoomFactor: '250%',
    smoother: true,
    width: '100%', // Scale to parent component by default
    height: '66.7%', // Scale to percent of height by default
    cursor: 'cursor-arrow', // Custom cursor
});

col = document.createElement('div');
col.className = 'col-6';
document.querySelector("#images2").appendChild(col);
new FocusImage({
    imageSrc: 'https://source.unsplash.com/category/nature/1024x768',
    parentElement: col,
    zoomFactor: '250%',
    smoother: true,
    width: '100%', // Scale to parent component by default
    height: '66.7%', // Scale to percent of height by default
    cursor: 'cursor-grab', // Custom cursor
});

col = document.createElement('div');
col.className = 'col-6';
document.querySelector("#images2").appendChild(col);
new FocusImage({
    imageSrc: 'https://source.unsplash.com/category/nature/1024x768',
    parentElement: col,
    zoomFactor: '250%',
    smoother: true,
    width: '100%', // Scale to parent component by default
    height: '66.7%', // Scale to percent of height by default
    cursor: 'cursor-crosshair', // Custom cursor
});

/**
 * HUD
 */
col = document.createElement('div');
col.className = 'col-6';
document.querySelector("#images3").appendChild(col);
new FocusImage({
    imageSrc: 'https://source.unsplash.com/random',
    parentElement: col,
    zoomFactor: '250%',
    smoother: true,
    width: '100%', // Scale to parent component by default
    height: '66.7%', // Scale to percent of height by default
    cursor: 'cursor-crosshair', // Custom cursor
    displayLoc: true,
});

col = document.createElement('div');
col.className = 'col-6';
document.querySelector("#images3").appendChild(col);
new FocusImage({
    imageSrc: 'https://source.unsplash.com/random',
    parentElement: col,
    zoomFactor: '250%',
    smoother: true,
    width: '100%', // Scale to parent component by default
    height: '66.7%', // Scale to percent of height by default
    cursor: 'cursor-crosshair', // Custom cursor
    displayZoom: true,
});

col = document.createElement('div');
col.className = 'col-6';
document.querySelector("#images4").appendChild(col);
new FocusImage({
    imageSrc: 'https://source.unsplash.com/random',
    parentElement: col,
    zoomFactor: '250%',
    smoother: true,
    width: '100%', // Scale to parent component by default
    height: '66.7%', // Scale to percent of height by default
    cursor: 'cursor-crosshair', // Custom cursor
    displayLoc: true,
    displayZoom: true,
    zoomOnScroll: true,
});