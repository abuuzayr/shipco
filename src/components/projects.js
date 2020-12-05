import React from 'react'
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import { BsDot } from "react-icons/bs"

const query = graphql`
  query {
    allPrismicProjects {
      nodes {
        data {
          description {
            text
          }
          thumbnail {
            url
          }
          tags {
            text
          }
          role {
            text
          }
          name {
            text
          }
          long_description {
            text
          }
          images {
            image {
              url
            }
          }
          tile_width
          tile_color
        }
      }
    }
  }
`

const Tile = ({ node, double }) => {
    const { description, thumbnail, tags, name, tile_color } = node
    return (
      <div
        className={`pt-10 px-10 rounded-xl overflow-hidden cursor-pointer hover:shadow-md ${
          double ? "flex" : ""
        }`}
        style={{ backgroundColor: tile_color, height: double ? 250 : 336 }}
      >
        <div className="flex-1">
          <div className="mb-4">
            {tags &&
              tags.text &&
              tags.text.split(",").map((tag, index) => (
                <span
                  className="uppercase text-xs font-semibold"
                  style={{ color: "#102252" }}
                >
                  {index !== 0 && <BsDot className="inline" />}
                  {tag.trim()}
                </span>
              ))}
          </div>
          <h2
            className="text-xl font-bold leading-7"
            style={{ color: "#102252" }}
          >
            {name.text}
          </h2>
          <p>{description.text}</p>
        </div>
        <div className="flex-1">
          <img src={thumbnail.url} className="mx-auto" />
        </div>
      </div>
    )
}

const Projects = ({ tilesMode, title, btnText, btnUrl }) => (
  <StaticQuery
    query={query}
    render={data => {
        const nodes = data.allPrismicProjects.nodes
        const nodeWidths = nodes.map(n =>
          tilesMode === "dynamic" && n.tile_width === "double" ? 2 : 1
        )
        let nodeIndex = 0
        return (
            <div class="md:flex my-40">
                <div class="md:w-1/4 w-full">
                    <p className="font-bold text-blue-900 text-xl">
                        {title}
                    </p>
                </div>
                <div class="md:w-3/4 w-full">
                    <div class="grid gap-4">
                        {
                            nodes.map((n, index) => {
                                if (nodeIndex > index) return null
                                const tileWidth = nodeWidths[index]
                                const nextTileWidth = nodeWidths[index + 1]
                                if (nextTileWidth && tileWidth === 1 && nextTileWidth === 1) {
                                    nodeIndex = index + 2
                                    return (
                                        <div className="gap-4 grid md:grid-cols-2 grid-cols-1">
                                            <Tile node={n.data} />
                                            <Tile node={nodes[index + 1].data} />
                                        </div>
                                    )
                                } else {
                                    nodeIndex = index + 1
                                    return (
                                        <div className={`md:grid-cols-${tileWidth === 1 ? 2 : 1} grid-cols-1`}>
                                            <Tile node={n.data} double />
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                    <p className="mt-10">
                        <Link to={btnUrl} className="font-bold rounded-full border border-blue-900 text-blue-900 px-6 py-3 hover:bg-blue-900 hover:text-white">
                            {btnText}
                        </Link>
                    </p>
                </div>
            </div>
        )
    }}
    />
)

Projects.propTypes = {
    tilesMode: PropTypes.string,
    title: PropTypes.string,
    btnText: PropTypes.string,
    btnUrl: PropTypes.string,
}

export default Projects