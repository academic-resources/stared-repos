import React from 'react';
import Helmet from 'react-helmet';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import { StaticQuery, graphql, Link } from 'gatsby';
import { colors, fonts, media } from '../tokens';

const LAYOUT_QUERY = graphql`
  {
    site {
      siteMetadata {
        title
        description
        sidebarHeading
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "docs" } }) {
      edges {
        node {
          childMdx {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  }
`;

const GLOBAL_STYLES = css`
  * {
    box-sizing: border-box;
    margin: 0;

    + * {
      margin-top: 1rem;
    }
  }

  html,
  body {
    background-color: ${colors.white};
    color: ${colors.gray700};
    font-family: ${fonts.default};
    font-size: 18px;
    line-height: 1.45;
    margin: 0;

    > div {
      margin-top: 0;
    }

    @media ${media.medium} {
      font-size: 22px;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${colors.black};
    font-family: ${fonts.heading};
    font-weight: 600;
    line-height: 1.1;
  }

  h1 {
    font-size: 1.75rem;
    font-weight: 900;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.375rem;
  }

  h4 {
    font-size: 1.25rem;
  }

  h5 {
    font-size: 1.125rem;
  }

  h6 {
    font-size: 1rem;
  }

  strong {
    color: ${colors.black};
  }

  a {
    color: ${colors.primary};
    font-weight: 500;
  }

  code,
  pre {
    background: ${colors.gray100};
    border: 1px solid ${colors.gray200};
    border-radius: 0.25rem;
    font-size: 0.875rem;
    padding: 0.125rem;
  }

  code {
    display: inline-block;
    margin: 0;
  }

  pre {
    overflow-x: auto;
    padding: 0.5rem;

    code {
      border: none;
      display: inline;
      padding: 0;
    }
  }
`;

const Header = styled('header')`
  background-color: ${colors.primary};
  padding: 0.5rem 5%;

  @media ${media.medium} {
    height: 3rem;
    padding-left: 2rem;
    position: sticky;
    top: 0;
  }
`;

const SiteTitle = styled(Link)`
  color: ${colors.white};
  display: block;
  font-weight: bold;
  text-align: center;
  text-decoration: none;

  @media ${media.medium} {
    font-size: 1.25rem;
    text-align: left;
  }
`;

const Main = styled('main')`
  margin-top: 0;

  @media ${media.medium} {
    @supports (display: flex) {
      align-items: flex-start;
      display: flex;
      justify-content: flex-start;
    }
  }
`;

const Content = styled('section')`
  padding: 2rem 5% 3rem;

  @media ${media.medium} {
    flex: 2 500px;
    max-width: 57ch;
    order: 2;
    padding-left: 2rem;
  }
`;

const DocsNav = styled('aside')`
  background-color: ${colors.gray100};
  padding: 2rem 5%;

  @media ${media.medium} {
    flex: 1 350px;
    height: calc(100vh - 3rem);
    margin-top: 0;
    max-width: 350px;
    order: 1;
    overflow-y: auto;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 2.675rem;
    position: sticky;
    top: 3rem;
  }
`;

const NavHeading = styled('h3')`
  font-size: 1rem;
`;

const NavList = styled('ul')`
  border-bottom: 1px solid ${colors.gray200};
  list-style: none;
  padding: 0;
`;

const NavItem = styled('li')`
  border-top: 1px solid ${colors.gray200};
  font-size: 0.75rem;
  margin-top: 0;
`;

const NavLink = styled(Link)`
  display: block;
  font-weight: 400;
  margin: 0.25rem 0;
  padding: 0.25rem 0.5rem;
  text-decoration: none;
  transition: background-color 200ms linear;

  :active,
  :focus,
  :hover {
    background-color: ${colors.gray200};
  }
`;

export default ({ children }) => (
  <StaticQuery
    query={LAYOUT_QUERY}
    render={({ site: { siteMetadata }, allFile }) => {
      const docs = allFile ? allFile.edges : false;

      return (
        <React.Fragment>
          <Helmet
            titleTemplate={`%s · ${siteMetadata.title}`}
            defaultTitle={siteMetadata.title}
          >
            <meta charSet="utf-8" />
            <meta name="description" content={siteMetadata.description} />
          </Helmet>
          <Global styles={GLOBAL_STYLES} />
          <Header>
            <SiteTitle to="/">{siteMetadata.title}</SiteTitle>
          </Header>
          <Main>
            <Content>{children}</Content>
            <DocsNav>
              {docs && (
                <React.Fragment>
                  <NavHeading>{siteMetadata.sidebarHeading}</NavHeading>
                  <NavList>
                    {docs
                      .map(({ node }) => node.childMdx)
                      .map(doc => (
                        <NavItem key={`side-nav-${doc.fields.slug}`}>
                          <NavLink to={doc.fields.slug}>
                            {doc.frontmatter.title}
                          </NavLink>
                        </NavItem>
                      ))}
                  </NavList>
                </React.Fragment>
              )}
            </DocsNav>
          </Main>
        </React.Fragment>
      );
    }}
  />
);
