import React from 'react'
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Link as PrismicLink } from "prismic-reactjs"
import { IoIosArrowForward } from "react-icons/io"

const Work = ({ title, nodes }) => (
    <div class="flex my-40">
        <div class="w-1/4">
            <p className="font-bold text-blue-900 text-2xl">
                {title[0].text}
            </p>
        </div>
        <div class="w-3/4">
            {
                nodes.map(n => {
                    const url = PrismicLink.url(n.url)
                    return (
                        <div className="mb-8">
                            <Link to={url} className="font-bold text-blue-900 text-2xl flex items-center">
                                {n.company[0].text} <IoIosArrowForward className="text-blue-900 ml-2" />
                            </Link>
                            <p className="font-bold text-blue-900">
                                {n.position[0].text}
                            </p>
                            <p className="italic">
                                {n.duration[0].text}
                            </p>
                        </div>
                    )
                })
            }
        </div>
    </div>
)

Work.propTypes = {
    title: PropTypes.string,
    nodes: PropTypes.object
}

export default Work