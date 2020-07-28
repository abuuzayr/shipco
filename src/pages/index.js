import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero"
import Intro from "../components/intro"

const indexQuery = graphql`
  query {
    prismic {
      allHomepages {
        edges {
          node {
            hero_text
            intro_section_title
            intro_section_text
            intro_button_text
            intro_button_url {
              ... on PRISMIC__ExternalLink {
                url
              }
              ... on PRISMIC__FileLink {
                url
              }
              ... on PRISMIC__ImageLink {
                url
              }
            }
          }
        }
      }
    }
  }
`;

const IndexPage = () => (
  <StaticQuery
    query={indexQuery}
    render={data => {
      const { hero_text, intro_section_title, intro_section_text, intro_button_text, intro_button_url } = data.prismic.allHomepages.edges[0].node
      return (
        <Layout>
          <SEO title="Home" />
          <Hero text={hero_text} />
          <Intro title={intro_section_title} text={intro_section_text} button={{ text: intro_button_text, url: intro_button_url }} />
        </Layout>
      )
    }}
  />
);

export default IndexPage
