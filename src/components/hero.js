import React from 'react'
import PropTypes from "prop-types"

const Hero = ({ text }) => (
    <div className="text-4xl my-20 text-blue-900 leading-tight md:text-5xl md:my-40 font-black" style={{ fontFamily: "Merriweather" }} id="hero">
        {text}
    </div>
)

Hero.defaultProps = {
    text: `Title`,
}

Hero.propTypes = {
    text: PropTypes.string,
}

export default Hero