const { createFilePath } = require('gatsby-source-filesystem');
const fs = require('fs');

/*
 * To avoid a nasty crash if the theme’s user doesn’t create the `docs`
 * directory before they try to run `gatsby develop`, we check to make sure the
 * directory exists and — if not — we create it.
 */
exports.onPreBootstrap = ({ reporter }) => {
  const dir = 'docs';
  if (!fs.existsSync(dir)) {
    reporter.log(`creating the ${dir} directory`);
    fs.mkdirSync(dir);
  }
};

/*
 * Create a slug for each doc. This allows for the docs to be nested in folders
 * and have the URLs match the folder structure.
 *
 * For example, if a doc is created at `docs/install/quickstart.md`, the slug
 * created for it would be `/install/quickstart/`.
 */
exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  if (node.internal.type === 'Mdx') {
    createNodeField({
      node,
      name: 'slug',
      value: createFilePath({ node, getNode })
    });
  }
};

exports.createPages = async ({
  graphql,
  actions: { createPage },
  reporter
}) => {
  const result = await graphql(`
    {
      allFile(filter: { sourceInstanceName: { eq: "docs" } }) {
        edges {
          node {
            childMdx {
              fields {
                slug
              }
            }
          }
        }
      }
    }
  `);

  /*
   * On a new site, there’s a chance the site author won’t have any content for
   * the first run. Rather than failing or showing a blank page, we want to grab
   * a default page that provides instructions on how to create the content.
   *
   * This file should have a unique name that’s unlikely to collide with the
   * site’s files to avoid confusion with caching. We load its content and set
   * it as the home page to give the site author a set of instructions.
   */
  if (!result.data || !result.data.allFile) {
    reporter.warn(
      'No docs were found in the `docs` directory. Add some Markdown files to add content on your site!'
    );

    const backup = await graphql(`
      {
        mdx(
          fileAbsolutePath: {
            regex: "/.*/gatsby-theme-simple-docs/docs/___no-content-default-page.md/"
          }
        ) {
          fields {
            slug
          }
        }
      }
    `);

    createPage({
      path: '/',
      component: require.resolve('./src/templates/doc.js'),
      context: {
        slug: backup.data.mdx.fields.slug
      }
    });

    // Don’t do anything else since there aren’t more pages.
    return;
  }

  // Convert the response into an array of just the data we need.
  const docs = result.data.allFile.edges.map(({ node }) => node.childMdx);

  // Create a page for each doc.
  docs.forEach(doc => {
    createPage({
      path: doc.fields.slug,
      component: require.resolve('./src/templates/doc.js'),
      context: {
        slug: doc.fields.slug
      }
    });
  });
};
