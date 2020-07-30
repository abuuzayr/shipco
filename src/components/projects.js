import React from 'react'
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Link as PrismicLink } from "prismic-reactjs"
import { linkResolver } from "../utils/linkResolver"

const Tile = ({ color, title, desc, url }) => (
    <div className="p-10" style={{ backgroundColor: color, height: 336 }}>
        <h2 className="text-xl" style={{ fontFamily: 'DM Serif Display' }}>
            {title[0].text}
        </h2>
        <p>
            {desc[0].text}
        </p>
    </div>
)

const Projects = ({ title, button, nodes }) => {
    const url = PrismicLink.url(button.url, linkResolver)
    const nodeWidths = nodes.map(n => n.project_tile_width === 'Double' ? 2 : 1)
    let nodeIndex = 0
    return (
        <div class="flex my-40">
            <div class="w-1/4">
                <p className="font-bold text-blue-900 text-2xl">
                    {title[0].text}
                </p>
            </div>
            <div class="w-3/4">
                <div class="grid gap-4">
                    {
                        nodes.map((n, index) => {
                            if (nodeIndex > index) return null
                            const projectUrl = PrismicLink.url(n.project_url)
                            const tileWidth = nodeWidths[index]
                            const nextTileWidth = nodeWidths[index + 1]
                            if (nextTileWidth && tileWidth === 1 && nextTileWidth === 1) {
                                nodeIndex = index + 2
                                const nextProjectUrl = PrismicLink.url(nodes[index + 1].project_url)
                                return (
                                    <div className="gap-4 grid md:grid-cols-2 grid-cols-1">
                                        <Tile color={n.project_tile_color} title={n.project_title} desc={n.project_description} url={projectUrl} />
                                        <Tile color={nodes[index + 1].project_tile_color} title={nodes[index + 1].project_title} desc={nodes[index + 1].project_description} url={nextProjectUrl} />
                                    </div>
                                )
                            } else {
                                nodeIndex = index + 1
                                return (
                                    <div className={`md:grid-cols-${tileWidth === 1 ? 2 : 1} grid-cols-1`}>
                                        <Tile color={n.project_tile_color} title={n.project_title} desc={n.project_description} url={projectUrl} />
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <p className="mt-10">
                    <Link to={url} className="font-bold rounded-full border border-blue-900 text-blue-900 px-6 py-3 hover:bg-blue-900 hover:text-white">
                        {button.text[0].text}
                    </Link>
                </p>
            </div>
        </div>
    )
}

Projects.propTypes = {
    title: PropTypes.string,
    button: PropTypes.object,
    nodes: PropTypes.object
}

export default Projects