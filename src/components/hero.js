import React from 'react'
import PropTypes from "prop-types"
import { RichText } from 'prismic-reactjs'

const Hero = ({ text }) => (
    <h1 className="text-4xl my-20 text-blue-900 leading-tight md:text-5xl md:my-40 font-black" style={{ fontFamily: "Merriweather" }}>
        <RichText render={text} />
    </h1>
)

Hero.defaultProps = {
    text: `Title`,
}

Hero.propTypes = {
    text: PropTypes.string,
}

export default Hero