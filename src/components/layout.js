/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Transition } from "react-transition-group"
import { FiX } from "react-icons/fi"

import Header from "./header"
import Chat from "./chat"

const bodyScroll = typeof document !== `undefined` ? require("body-scroll-toggle") : null

const Layout = ({ children, overlay, setOverlay }) => {
  const [chatActive, setChatActive] = useState(false)

  const chatStyles = {
    default: {
      transition: "all 300ms ease-in-out",
      opacity: 0,
    },
    transition: {
      entering: { opacity: 0 },
      entered: { opacity: 1 },
      exiting: { opacity: 0 },
      exited: { opacity: 0 },
    }
  }

  const overlayStyles = {
    transition: {
      entering: { opacity: 0, display: "block" },
      entered: { opacity: 0.75, display: "block" },
      exiting: { display: "block"},
      exited: {},
    }
  }
  
  const handleOnClick = index => {
    setChatActive(index)
    setOverlay(true)
  }

  useEffect(() => {
    setChatActive(overlay ? chatActive : null)
    if (bodyScroll) {
      if (overlay) {
        bodyScroll.disable()
      } else {
        bodyScroll.enable()
      }
    }
  }, [overlay])

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
      allPrismicProfile {
        nodes {
          data {
            linkedin_url {
              url
            }
            instagram_url {
              url
            }
            email {
              text
            }
          }
        }
      }
    }
  `;
  return (
    <StaticQuery 
      query={query}
      render={data => {
        const { footer_left_text, footer_right_text } = data.allPrismicFooter.nodes[0].data
        const { linkedin_url, instagram_url, email } = data.allPrismicProfile.nodes[0].data
        return (
          <>
            <Header siteTitle={data.site.siteMetadata.title} social={{
              ig: linkedin_url.url,
              li: instagram_url.url,
              email: email.text
            }} setChatActive={handleOnClick} />
            <div
              style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `0 1.0875rem 1.45rem`,
              }}
            >
              <Transition in={overlay} timeout={300}>
                {state => (
                  <div
                    style={{
                      transition: "all 300ms ease-in-out",
                      opacity: 0,
                      display: "none",
                      ...overlayStyles.transition[state],
                    }}
                    className="bg-black h-screen w-screen fixed top-0 left-0"
                    onClick={() => setOverlay(false)}
                  >
                    {!chatActive &&
                    <FiX
                      size={30}
                      color="white"
                      className="absolute top-0 right-0 mr-5 mt-5 cursor-pointer"
                      onClick={() => setOverlay(false)}
                    />
                    }
                  </div>
                )}
              </Transition>
              <main>{children}</main>
              <Transition in={chatActive} timeout={300} mountOnEnter unmountOnExit>
                {state => (
                  <div style={{
                    ...chatStyles.default,
                    ...chatStyles.transition[state]
                  }}
                    className="fixed z-10 inset-0 overflow-y-auto">
                      <Chat setOverlay={setOverlay} />
                  </div>
                )}
              </Transition>
            </div>
            <footer className="bg-gray-100 py-4 md:py-8">
              <div className="md:flex md:justify-between px-4 md:max-w-6xl mx-auto">
                <p className="text-blue-900 mb-2">{footer_left_text.text}</p>
                <p style={{ color: "#999999" }}>{footer_right_text.text || `Last Updated ${new Date().getFullYear()}`}</p>
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
