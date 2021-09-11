<h1 align="center">focus.js</h1>
<p align="center">A simple JavaScript library for turning images into zoomable components.</p>

## Getting Started
### Vanilla
* **This version will no longer get new updates and is only here for legacy browsers. New features will be added in ES6 version.**
* For now, download the minified version of the library in the `dist` folder and add a script tag to your page.
    ```HTML
    <script src='../../dist/vanilla/focus.min.js'></script>
    ```
* After adding the tag to the page, initialize the library with a config object (params could be excluded).
    ```HTML
    <script>
        Focus.init({
            elementID: '',
            zoomFactor: '250%'
        });
    </script>
    ```
    * To change the scope of elements that focus.js applies to, assign the parent id to the `elementID` field to target its children. Otherwise, a blank string would apply it to the entire page.
* Add the `focus-img` class to any image you want to be zoomable.
* To reduce stuttering on the image, add the `smoother` class to the images you want.

### Node/ES6
* To use this, ensure that `babel`, `babel-loader`, `babel-preset-es2015`, and `webpack` are installed as dependencies for your project.
* Also, an unpacked version of `focus.js` will also be needed which can be found in `./dist/es6/focus.js`.
* For your entry script (app.js for example), ensure to import `FocusImage` from `focus.js`.
    ```javascript
    import FocusImage from './YOUR_DIR/focus'
    ```
* To construct a new FocusImage instance, create a config object and pass it into the constructor.
    ```javascript
    let config = {
        imageSrc: 'https://source.unsplash.com/category/nature/1024x768',
        parentElement: null,
        zoomFactor: '250%',
        smoother: true,
        width: '100%', // Scale to parent component by default
        height: '66.7%', // Scale to percent of height by default
        cursor: '', // Leave blank for default cursor
        displayLoc: true,
        displayZoom: true,
        zoomOnScroll: true,
    };
    new FocusImage(config); // Object will automatically be appended to the parent element
    ```
* In any page that uses `focus.js`, ensure to include the packed version of your app `APP_NAME.min.js`.
* Ensure that the files for `focus.js` can be found in your routing configuration.
* To run, execute `node ./YOUR_DIR/route.js` or your custom script.

## Cursors
| Class | Description |
| --- | --- |
| `.cursor-arrow` | Uses the default arrow cursor for the component. |
| `.cursor-grab` | Uses the grab cursor for the component (for when panning by dragging is supported). |
| `.cursor-crosshair` | Uses a crosshair cursor for the component. |

## Demo
* [Basic Portfolio Website - Vanilla](https://spiderpig86.github.io/focus.js/test/vanilla/index.html)

## Todo
* Add option for changing image scaling with mouse wheel.
* Add more events such as `mouseclick`, `grab`, and `toggle`.
* Add support for callbacks on image load, zooming in, and zooming out.
* Add option to change cursor type.
* Add display for magnification and location.
* Add support for external toggles.