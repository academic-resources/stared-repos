
# React-Redux
[![forthebadge](https://forthebadge.com/images/badges/built-with-swag.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/contains-cat-gifs.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/60-percent-of-the-time-works-every-time.svg)](https://forthebadge.com)

Boilerplate for a React app using Redux, React-Router, Sass


## Contents
### React

|Pkgs|Use|Description|Link|
|----|---|-----------|----|
|`react`|`library`|JavaScript library for building user interfaces|[npm](https://www.npmjs.com/package/react)
|`react-dom`|`util`|React package for working with the DOM|[npm](https://www.npmjs.com/package/react-dom)
|`redux`|`state mgmt`|Predictable state container for JavaScript apps|[npm](https://www.npmjs.com/package/redux)
|`react-redux`|`util`|React bindings for Redux|[npm](https://www.npmjs.com/package/react-redux)
|`redux-thunk`|`util`|Thunk middleware for Redux|[npm](https://www.npmjs.com/package/redux-thunk)
|`react-router-dom`|`routing`|DOM bindings for [React Router](https://reacttraining.com/react-router)|[npm](https://www.npmjs.com/package/react-router-dom)
|`prop-types`|`type checker`|Runtime type checking for React props and similar objects.|[npm](https://www.npmjs.com/package/prop-types)

### webpack
[webpack](https://webpack.js.org/) is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.

|Pkgs|Use|Description|Link|
|----|---|-----------|----|
|`webpack`|`bundler`|Bundles JavaScript files and assets for use in a web browser|[npm](https://www.npmjs.com/package/webpack)
|`webpack-cli`|`util`|Webpack CLI encapsulates all code related to CLI handling|[npm](https://www.npmjs.com/package/webpack-cli)
|`webpack-dev-server`|`server`|Use webpack with a development server that provides live reloading|[npm](https://www.npmjs.com/package/webpack-dev-server)
|`html-webpack-plugin`|`bundler`|Plugin that simplifies creation of HTML files to serve webpack bundles|[npm](https://www.npmjs.com/package/html-webpack-plugin)
|`file-loader`|`bundler`|A file loader module for webpack|[GitHub](https://github.com/webpack-contrib/file-loader)
|`url-loader`|`loader`|Loads files as `base64` encoded URL|[GitHub](https://github.com/webpack-contrib/url-loader)
|`babel-loader`|`compiler`|Allows transpiling JavaScript files using [Babel](https://github.com/babel/babel) and [webpack](https://github.com/webpack/webpack)|[npm](https://www.npmjs.com/package/babel-loader)
|`react-hot-loader`|`loader`|Tweak React components in real time ⚛️⚡️|[npm](https://www.npmjs.com/package/react-hot-loader)
|`css-loader`|`loader`|Interprets `@import` and `url()` like `import/require()` and will resolve them|[GitHub](https://github.com/webpack-contrib/css-loader)
|`sass-loader`|`loader`|Loads a Sass/SCSS file and compiles it to CSS|[npm](https://www.npmjs.com/package/sass-loader)
|`style-loader`|`loader`|Adds CSS to the DOM by injecting a `<style>` tag|[npm](https://www.npmjs.com/package/style-loader)

### Babel
[Babel](https://babeljs.io/) is a compiler for writing next generation JavaScript. In the context of this app, it transforms React JSX and ES6+ code into ES5 code.

|Pkgs|Use|Description|Link|
|----|---|-----------|----|
|`babel-core`|`compiler`|Babel compiler core|[npm](https://www.npmjs.com/package/babel-core)
|`babel-preset-env`|`compiler`|❓Compiles ES6 into ES5 by determining the Babel plugins/polyfills needed for target browser/runtime environment|[npm](https://www.npmjs.com/package/babel-preset-env)
|`babel-preset-react`|`compiler`|Compiles JSX into ES5|[npm](https://www.npmjs.com/package/babel-preset-react)
|`babel-plugin-transform-es2015-modules-commonjs`|`compiler`|❓Transforms ES6 modules to [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1)|[npm](https://www.npmjs.com/package/babel-plugin-transform-es2015-modules-commonjs)
|`babel-plugin-transform-object-rest-spread`|`compiler`|Transform rest properties for object destructuring assignment and spread properties for object literals|[npm](https://www.npmjs.com/package/babel-plugin-transform-object-rest-spread)
|`babel-eslint`|`compiler`|Parses Babel code for ESLint|[npm](https://www.npmjs.com/package/babel-eslint)
|`babel-jest`|`compiler`|❓Transforms `.js` and `.jsx` files|[npm](https://www.npmjs.com/package/babel-jest)

### ESLint
[ESLint](https://eslint.org/) is a pluggable linting utility for JavaScript and JSX.

|Pkgs|Use|Description|Link|
|----|---|-----------|----|
|`eslint`|`linter`|Linting utility for JS and JSX|[eslint](https://eslint.org/)
|`eslint-config-airbnb`|`linter`|Provides Airbnb's `.eslintrc` as an extensible shared config|[npm](https://www.npmjs.com/package/eslint-config-airbnb)
|`eslint-plugin-import`|`linter`|Lints ES6+ `import`/`export` syntax, and prevent issues with misspelling of file paths and import names|[npm](https://www.npmjs.com/package/eslint-plugin-import)
|`eslint-plugin-jsx-a11y`|`linter`|Static AST checker for accessibility rules on JSX elements|[npm](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)
|`eslint-plugin-react`|`linter`|React specific linting rules for ESLint|[npm](https://www.npmjs.com/package/eslint-plugin-react)

### Testing

|Pkgs|Use|Description|Link|
|----|---|-----------|----|
|`jest`|`testing`|JavaScript testing|[GitHub](https://facebook.github.io/jest/)
|`identity-obj-proxy`|`testing`|An identity object using ES6 proxies. Useful for mocking webpack imports like CSS Modules|[GitHub](https://github.com/keyanzhang/identity-obj-proxy)
|`enzyme`|`testing`|JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse React Components' output|[GitHub](https://github.com/airbnb/enzyme)
|`enzyme-adapter-react-16`|`testing`|Allows Enzyme compatibility with React 16|[GitHub](https://github.com/airbnb/enzyme/tree/master/packages/enzyme-adapter-react-16)

### Misc

|Pkgs|Use|Description|Link|
|----|---|-----------|----|
|`node-sass`|`compiler`|Compiles `.scss` files to `.css` using [LibSass](https://github.com/sass/libsass)|[npm](https://www.npmjs.com/package/node-sass)
|`fs-extra`|`file system`|Adds file system methods that aren't included in the native `fs` module and adds promise support to the `fs` methods.|[npm](https://www.npmjs.com/package/fs-extra)

