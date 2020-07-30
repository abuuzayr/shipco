/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { RichText } from "prismic-reactjs"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"

const Layout = ({ children }) => {
  const query = graphql`
    query {
      prismic {
        allFooters {
          edges {
            node {
              footer_left_text
              footer_right_text
            }
          }
        }
      }
      site {
        siteMetadata {
          title
        }
      }
    }
  `;
  return (
    <StaticQuery 
      query={query}
      render={data => {
        const { footer_left_text, footer_right_text } = data.prismic.allFooters.edges[0].node
        return (
          <>
            <Header siteTitle={data.site.siteMetadata.title} />
            <div
              style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `0 1.0875rem 1.45rem`,
              }}
            >
              <main>{children}</main>
              <footer>
                <div className="flex justify-between">
                  <p className="text-blue-900">
                    <RichText render={footer_left_text} />
                  </p>
                  <p className="text-gray-500">
                    <RichText render={footer_right_text} />
                  </p>
                </div>
              </footer>
            </div>
          </>
        )}
      }
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
