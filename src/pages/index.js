import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero"
import Intro from "../components/intro"
import Work from "../components/work"
import Approach from "../components/approach"
import Projects from "../components/projects"
import Profile from "../components/profile"

const indexQuery = graphql`
  query {
    allPrismicHomepage {
      nodes {
        data {
          hero_text {
            text
          }
          intro_section_title {
            text
          }
          intro_section_text {
            text
          }
          intro_button_text {
            text
          }
          intro_button_url {
            url
          }
          work_section_title {
            text
          }
          work_experience {
            company {
              text
            }
            duration {
              text
            }
            position {
              text
            }
            long_description {
              html
            }
          }
          approach_section_link_text {
            text
          }
          approach_section_text {
            text
          }
          approach_section_title {
            text
          }
          approach_section_link_url {
            url
          }
          project_section_title {
            text
          }
          project_button_text {
            text
          }
          project_button_url {
            url
          }
        }
      }
    }
  }
`

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
        project_section_title,
        project_button_text,
        project_button_url
      } = data.allPrismicHomepage.nodes[0].data
      return (
        <Layout>
          <SEO title="Home" />
          <Hero text={hero_text.text} />
          <Intro
            title={intro_section_title.text}
            text={intro_section_text.text}
            button={{ text: intro_button_text.text, url: intro_button_url.url }}
          />
          <Work title={work_section_title.text} nodes={work_experience} />
          <Approach
            title={approach_section_title.text}
            text={approach_section_text.text}
            button={{
              text: approach_section_link_text.text,
              url: approach_section_link_url.url,
            }}
          />
          <Projects
            tilesMode="dynamic"
            title={project_section_title.text}
            btnText={project_button_text.text}
            btnUrl={project_button_url.url}
          />
          <Profile />
        </Layout>
      )
    }}
  />
);

export default IndexPage
