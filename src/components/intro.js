import React from 'react'
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { RichText, Link as PrismicLink } from "prismic-reactjs"

const Intro = ({ title, text, button }) => (
    <div class="md:flex mb-4">
        <div class="md:w-1/4 w-full">
            <p className="font-bold text-blue-900 text-xl">
                <RichText render={title} />
            </p>
        </div>
        <div class="md:w-3/4 w-full">
            <p><RichText render={text} /></p>
            <div className="mt-10">
                <Link to={button.url.url} className="font-bold rounded-full border border-blue-900 text-blue-900 px-6 py-3 hover:bg-blue-900 hover:text-white">
                    {button.text[0].text}
                </Link>
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