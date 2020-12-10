import React from 'react'
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Intro = ({ title, text, button }) => (
  <div class="md:flex mb-4" id="intro">
    <div class="mb-10 md:mb-0 md:w-1/4 w-full">
      <p className="font-bold text-blue-900 text-xl">{title}</p>
    </div>
    <div class="md:w-3/4 w-full">
      <div class="html-block">
        <div className="-mt-4" dangerouslySetInnerHTML={{ __html: text }} />
      </div>
      <div className="mt-16">
        {button.url && button.url.includes("http") ? (
          <a
            href={button.url}
            className="font-bold rounded-full border border-blue-900 text-blue-900 px-6 py-3 hover:bg-blue-900 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            {button.text}
          </a>
        ) : (
          <Link
            to={button.url || "#projects"}
            className="font-bold rounded-full border border-blue-900 text-blue-900 px-6 py-3 hover:bg-blue-900 hover:text-white"
          >
            {button.text}
          </Link>
        )}
      </div>
    </div>
  </div>
)

Intro.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    button: PropTypes.object
}

export default Intro