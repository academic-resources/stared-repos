import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import Layout from '../components/layout';

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
      }
      code {
        body
      }
    }
  }
`;

export default ({ data }) => (
  <Layout>
    <Helmet>
      <title>{data.mdx.frontmatter.title}</title>
      <meta name="description" content={data.mdx.frontmatter.description} />
    </Helmet>
    <h1>{data.mdx.frontmatter.title}</h1>
    <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
  </Layout>
);
