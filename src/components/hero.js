import React from 'react'
import PropTypes from "prop-types"

const Hero = ({ text }) => (
    <div className="text-3xl my-20 text-blue-900 leading-snug md:leading-snug md:text-5xl md:my-40 font-black" style={{ fontFamily: "Merriweather", letterSpacing: "-0.01em" }} id="hero">
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