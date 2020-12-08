import React from 'react'
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Approach = ({ title, text, button }) => {
    return (
      <div class="md:flex my-40">
        <div class="md:w-1/4 w-full mb-10 md:mb-0">
          <p className="font-bold text-blue-900 text-xl">{title}</p>
        </div>
        <div class="md:w-3/4 w-full">
          <p>{text}</p>
          <p className="mt-4">
            <Link
              to={button.url}
              className="font-bold text-sm"
              style={{ color: "#D74000" }}
            >
              {button.text}
            </Link>
          </p>
        </div>
      </div>
    )
}

Approach.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    button: PropTypes.object
}

export default Approach