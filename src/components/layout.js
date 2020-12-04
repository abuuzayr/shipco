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
      allPrismicFooter {
        nodes {
          data {
            footer_left_text {
              text
            }
            footer_right_text {
              text
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
        const { footer_left_text, footer_right_text } = data.allPrismicFooter.nodes[0].data
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
            </div>
            <footer className="bg-gray-100 py-8">
              <div className="flex justify-between max-w-6xl mx-auto">
                <p className="text-blue-900">{footer_left_text.text}</p>
                <p className="text-gray-500">{footer_right_text.text || `Last Updated ${new Date().getFullYear()}`}</p>
              </div>
            </footer>
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
