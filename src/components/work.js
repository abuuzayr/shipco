import React from 'react'
import PropTypes from "prop-types"
import { IoIosArrowForward } from "react-icons/io"

const Work = ({ title, nodes }) => (
    <div class="md:flex my-40">
        <div class="md:w-1/4 w-full">
            <p className="font-bold text-blue-900 text-xl">
                {title}
            </p>
        </div>
        <div class="md:w-3/4 w-full">
            {
                nodes.map(n => {
                    return (
                        <div className="mb-8">
                            <div className="font-bold text-blue-900 text-xl flex items-center">
                                {n.company.text} <IoIosArrowForward className="text-blue-900 ml-2" />
                            </div>
                            <p className="font-bold text-blue-900 mt-6">
                                {n.position.text}
                            </p>
                            <p className="italic">
                                {n.duration.text}
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