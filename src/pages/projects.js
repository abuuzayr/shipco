import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Projects from "../components/projects"

const ProjectsPage = () => (
  <Layout>
    <SEO title="Projects" />
    <h1
      style={{ fontFamily: "Merriweather", color: "#062D5B" }}
      className="mb-20 text-5xl"
    >
      Projects
    </h1>
    <Projects />
    <div className="mb-20"/>
  </Layout>
)

export default ProjectsPage
