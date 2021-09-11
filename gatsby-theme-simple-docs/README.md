# Gatsby Theme: Simple Docs

Use this theme you want to quickly create docs from a folder full of Markdown files.

## Install

```sh
# Create a new directory for your site.
mkdir mydocssite

# Move into the directory.
cd mydocssite/

# Create a `package.json`.
yarn init -y

# Add dependencies
yarn add react react-dom gatsby gatsby-theme-simple-docs

# Create a `gatsby-config.js`.
touch gatsby-config.js
```

Inside `gatsby-config.js`, set up the theme:

```js
module.exports = {
  __experimentalThemes: ['gatsby-theme-simple-blog']
};
```

Start the server:

```sh
npx gatsby develop
```
