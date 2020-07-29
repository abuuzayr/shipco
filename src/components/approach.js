import React from 'react'
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { RichText, Link as PrismicLink } from "prismic-reactjs"

const Approach = ({ title, text, button }) => {
    const url = PrismicLink.url(button.url)
    return (
        <div class="flex my-40">
            <div class="w-1/4">
                <p className="font-bold text-blue-900 text-2xl">
                    {title[0].text}
                </p>
            </div>
            <div class="w-3/4">
                <p><RichText render={text} /></p>
                <p className="mt-2">
                    <Link to={url} className="font-bold text-orange-600">
                        {button.text[0].text}
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