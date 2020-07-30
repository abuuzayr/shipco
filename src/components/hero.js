import React from 'react'
import PropTypes from "prop-types"
import { RichText } from 'prismic-reactjs'

const Hero = ({ text }) => (
    <h1 className="text-4xl my-20 text-blue-900 font-bold leading-tight md:text-6xl md:my-40">
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