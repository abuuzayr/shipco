import React, { useState } from "react"
import { Transition } from "react-transition-group"
import { FiX } from "react-icons/fi"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Projects from "../components/projects"

const transitionStyles = {
  entering: { opacity: 0, display: "block" },
  entered: { opacity: 0.75, display: "block" },
  exiting: {},
  exited: {},
}

const ProjectsPage = () => {
  const [overlay, setOverlay] = useState(false)
  return (
    <Layout>
      <Transition in={overlay} timeout={300}>
        {state => (
          <div
            style={{
              transition: "all 300ms ease-in-out",
              opacity: 0,
              display: "none",
              ...transitionStyles[state],
            }}
            className="bg-black h-screen w-screen fixed top-0 left-0"
            onClick={() => setOverlay(false)}
          >
            <FiX
              size={30}
              color="white"
              className="absolute top-0 right-0 mr-5 mt-5 cursor-pointer"
              onClick={() => setOverlay(false)}
            />
          </div>
        )}
      </Transition>
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
