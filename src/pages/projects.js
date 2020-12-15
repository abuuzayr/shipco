import React, { useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Projects from "../components/projects"

const ProjectsPage = () => {
  const [overlay, setOverlay] = useState(false)
  return (
    <Layout overlay={overlay} setOverlay={setOverlay}>
      <SEO title="Projects" overlay={overlay} />
      <h1
        style={{ fontFamily: "Merriweather", color: "#062D5B" }}
        className="mb-20 text-5xl"
      >
        Projects
      </h1>
      <Projects setOverlay={setOverlay} overlay={overlay} />
      <div className="mb-20" />
    </Layout>
  )
}

export default ProjectsPage
