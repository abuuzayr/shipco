import React from 'react'
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { RichText, Link as PrismicLink } from "prismic-reactjs"

const Intro = ({ title, text, button }) => (
    <div class="flex mb-4">
        <div class="w-1/4">
            <p className="font-bold text-blue-900 text-2xl">
                <RichText render={title} />
            </p>
        </div>
        <div class="w-3/4">
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