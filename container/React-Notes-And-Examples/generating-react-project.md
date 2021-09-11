# Generating React Project

![](.gitbook/assets/image%20%2817%29.png)

![](.gitbook/assets/image%20%2822%29.png)



![](.gitbook/assets/image%20%2814%29.png)

![](.gitbook/assets/image%20%2824%29.png)

![](.gitbook/assets/image%20%2810%29.png)

Babel is a way to write ES2015 or 2016 javascript and convert it to ES5 so that it can run on any browser.

![](.gitbook/assets/image%20%289%29.png)

## Getting Started with Create React App <a id="getting-started-with-create-react-app"></a>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts <a id="available-scripts"></a>

In the project directory, you can run:

#### `npm start` <a id="npm-start"></a>

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000/) to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

#### `npm test` <a id="npm-test"></a>

Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build` <a id="npm-run-build"></a>

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject` <a id="npm-run-eject"></a>

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies \(webpack, Babel, ESLint, etc\) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More <a id="learn-more"></a>

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting <a id="code-splitting"></a>

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size <a id="analyzing-the-bundle-size"></a>

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App <a id="making-a-progressive-web-app"></a>

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration <a id="advanced-configuration"></a>

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment <a id="deployment"></a>

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `npm run build` fails to minify <a id="npm-run-build-fails-to-minify"></a>

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting\#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

![](.gitbook/assets/image%20%2815%29.png)

![](.gitbook/assets/image%20%2818%29.png)



![](.gitbook/assets/image%20%2821%29.png)





![](.gitbook/assets/image%20%2816%29.png)

![](.gitbook/assets/image%20%2812%29.png)





```text
tree
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── reportWebVitals.js
    └── setupTests.js

2 directories, 17 files
```



![](.gitbook/assets/image%20%2811%29.png)

![](.gitbook/assets/image%20%2826%29.png)





```javascript
//! 1.)     import the react and reactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom';
//==> React uses a bundler package called webpack
//===> the coe we write in index.js is not automatically available throughout the project
//=====> The same is true of any js file and that is why we need to import them.







//! 2.)     Create React Component











//! 3.)       Take the react component and render it on the screen







```



![](.gitbook/assets/image%20%2820%29.png)



```javascript
//! 1.)     import the react and reactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom';
//==> React uses a bundler package called webpack
//===> the coe we write in index.js is not automatically available throughout the project
//=====> The same is true of any js file and that is why we need to import them.







//! 2.)     Create React Component











//! 3.)       Take the react component and render it on the screen






```





```javascript
//! 1.)     import the react and reactDOM libraries
import <<<React>>> from 'react';
import ReactDOM from 'react-dom';
// The name of the react import is a matter of choice
// we could also write :
import MyReact from 'react'; //and it would work all the same.
```



npm checks the node modules folder for a folder called react and because we have one in our node mudules it imports the code from there.....



![](.gitbook/assets/image%20%2823%29.png)

```javascript
const React =require ('react');
```

Require VS Import Statement:

Require: Core JS import statement: makes use of require syntax

Import: ES2015 Import statement: es2015 module system... uses import syntax

![](.gitbook/assets/image%20%2827%29.png)

## Create React Component:



Important Note about Live Reloading

There appears to be an issue in CRA in regards to fast refresh when code changes are made to the index.js file:

[https://github.com/facebook/create-react-app/issues/9904](https://github.com/facebook/create-react-app/issues/9904)

Manually refreshing will show the changes, also, any changes to components deeper in the file structure will cause an auto-refresh as expected.

_One workaround noted suggests putting the following in the index.js which enables reloading:_

```javascript
if (module.hot) {  module.hot.accept();}
```

_Note - If you have spaces in your project directory name, reloading throughout the whole application can also fail._

\_\_

\_\_

![](.gitbook/assets/image%20%2827%29.png)

### Displaying Content with Functional Components:

* **WHAT A REACT COMPONENT IS:**

![](.gitbook/assets/image%20%2813%29.png)

A component is function or a class... on codepen I deployed a class but either way's purpose is to produce html to show the user and deal with their feedback.



To handle user input we employ event Handlers.



![Function based component](.gitbook/assets/image%20%288%29.png)



 ES6 arrow function equiv:

![](.gitbook/assets/image%20%2825%29.png)





















































































































































































