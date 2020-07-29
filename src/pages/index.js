import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero"
import Intro from "../components/intro"
import Work from "../components/work"
import Approach from "../components/approach"

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
            work_section_title
            work_experience {
              company
              duration
              position
              url {
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
            approach_section_link_text
            approach_section_text
            approach_section_title
            approach_section_link_url {
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
      const {
        hero_text, 
        intro_section_title, 
        intro_section_text, 
        intro_button_text, 
        intro_button_url,
        work_section_title,
        work_experience,
        approach_section_link_text,
        approach_section_link_url,
        approach_section_text,
        approach_section_title,
      } = data.prismic.allHomepages.edges[0].node
      return (
        <Layout>
          <SEO title="Home" />
          <Hero text={hero_text} />
          <Intro title={intro_section_title} text={intro_section_text} button={{ text: intro_button_text, url: intro_button_url }} />
          <Work title={work_section_title} nodes={work_experience} />
          <Approach title={approach_section_title} text={approach_section_text} button={{ text: approach_section_link_text, url: approach_section_link_url }} />
        </Layout>
      )
    }}
  />
);

export default IndexPage
