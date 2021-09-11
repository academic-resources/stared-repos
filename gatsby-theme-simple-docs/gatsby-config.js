module.exports = {
  siteMetadata: {
    title: 'Simple Docs — A Gatsby Theme',
    description: `
      This simple theme is designed to show off exactly how easy it is to create
      Gatsby sites using themes.
    `,
    sidebarHeading: 'All Documentation:'
  },
  plugins: [
    // Load the local files only to create the docs schema.
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'placeholder',
        path: `${__dirname}/docs`
      }
    },

    /*
     * Load the `docs` directory without a prefix to load from the docs folder
     * of the site using this theme. This is where the actual docs will be
     * loaded from for creating pages.
     */
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'docs',
        path: 'docs'
      }
    },

    // We’re using MDX to render the docs pages.
    {
      resolve: 'gatsby-mdx',
      options: {
        extensions: ['.mdx', '.md']
      }
    },

    // Use Emotion for styling.
    'gatsby-plugin-emotion',

    /*
     * We need to make sure that Webpack processes this theme as ES6, so we add
     * this plugin and specify the package name in `modules`.
     */
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['gatsby-theme-simple-docs']
      }
    }
  ]
};
