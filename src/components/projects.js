import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import { BsDot, BsHeartFill } from "react-icons/bs"
import { Transition } from "react-transition-group"
import ProfileLite from "./profile-lite"

const defaultStyle = {
  transition: "all 500ms ease-in-out",
  height: 0,
  marginBottom: -999
}

const transitionStyles = {
  entering: { height: "calc(100vh - 100px)", marginBottom: 0 },
  entered: { height: "calc(100vh - 100px)", marginBottom: 0 },
  exiting: { height: 0, marginBottom: -999 },
  exited: { height: 0 },
}

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
          year {
            text
          }
          long_description {
            html
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

const Tile = ({ node, double, onClick }) => {
    const { description, thumbnail, tags, name, tile_color } = node
    return (
      <div
        className={`pt-10 px-10 rounded-xl overflow-hidden cursor-pointer hover:shadow-md ${
          double ? "flex" : ""
        }`}
        style={{ backgroundColor: tile_color, height: double ? 250 : 336 }}
        onClick={onClick}
      >
        <div className="flex-1">
          <div className="mb-4">
            {tags &&
              tags.text &&
              tags.text.split(",").map((tag, index) => (
                <span
                  className="uppercase text-xs font-semibold tracking-widest"
                  style={{ color: "#102252" }}
                >
                  {index !== 0 && <BsDot className="inline" />}
                  {tag.trim()}
                </span>
              ))}
          </div>
          <h2
            className="text-xl font-bold leading-7 mb-4"
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

const Project = ({ node, suggested, setActive, projectBtnText, projectBtnUrl }) => {
  const { tags, name, description, long_description, role, images, year } = node
  const [likes, setLikes] = useState(window.localStorage.getItem(`${name.text} likes`) || 10)
  return (
    <div className="px-4 md:p-0 md:max-w-2xl mx-auto">
      <div className="flex place-items-center justify-between mb-4">
        <div>
          <div className="mb-4">
            {tags &&
              tags.text &&
              tags.text.split(",").map((tag, index) => (
                <span
                  className="uppercase text-xs font-semibold tracking-widest"
                  style={{ color: "#102252" }}
                >
                  {index !== 0 && <BsDot className="inline" />}
                  {tag.trim()}
                </span>
              ))}
          </div>
          <h2
            className="text-xl font-bold leading-7 mb-4"
            style={{ color: "#102252" }}
          >
            {name.text}
          </h2>
        </div>
        <button
          className="rounded-full px-5 py-3 bg-gray-100 text-sm font-bold hover:bg-gray-50"
          style={{ color: "#062D5B" }}
          type="button"
          onClick={() => {
            setLikes(likes => {
              window.localStorage.setItem(`${name.text} likes`, likes + 1)
              return likes + 1
            })
          }}
        >
          <BsHeartFill className="inline mr-2" /> {likes} Likes
        </button>
      </div>
      <div className="mb-10">
        <img src={images[0].image.url} className="w-full" />
        <div className="flex overflow-y-auto max-w-full mt-4 justify-around">
          {images.map(({ image }) => (
            <img
              src={image.url}
              style={{ width: 100 }}
              className="rounded-lg cursor-pointer"
            />
          ))}
        </div>
      </div>
      <div className="mb-10 md:w-2/6 md:float-right">
        <p className="font-bold mb-4" style={{ color: "#062D5B" }}>
          My Role
        </p>
        <p>{role.text}</p>
        <p className="font-bold my-4" style={{ color: "#062D5B" }}>
          Year
        </p>
        <p>{year.text}</p>
      </div>
      <div className="w-1/12 hidden md:block" />
      <div className="mb-10 md:w-7/12">
        <p className="font-bold" style={{ color: "#062D5B" }}>
          {description.text}
        </p>
        <p
          dangerouslySetInnerHTML={{ __html: long_description.html }}
          className="html-block"
        ></p>
      </div>
      <hr className="my-24" />
      {suggested && suggested.length === 2 && (
        <>
          <div className="mb-24">
            <p
              className="text-xl mb-4"
              style={{ fontFamily: "Merriweather", color: "#062D5B" }}
            >
              You may also like
            </p>
            <div className="gap-4 grid md:grid-cols-2 grid-cols-1">
              <Tile
                node={suggested[0].data}
                onClick={() => setActive(suggested[0].originalIndex)}
              />
              <Tile
                node={suggested[1].data}
                onClick={() => setActive(suggested[1].originalIndex)}
              />
            </div>
            {projectBtnText && (
              <div className="mt-10 mb-24">
                {projectBtnUrl && projectBtnUrl.url ? (
                  <a
                    href={projectBtnUrl.url}
                    className="font-bold rounded-full border border-blue-900 text-blue-900 px-6 py-3 hover:bg-blue-900 hover:text-white"
                  >
                    {projectBtnText.text}
                  </a>
                ) : (
                  <Link
                    to="/projects"
                    className="font-bold rounded-full border border-blue-900 text-blue-900 px-6 py-3 hover:bg-blue-900 hover:text-white"
                  >
                    {projectBtnText.text}
                  </Link>
                )}
              </div>
            )}
          </div>
        </>
      )}
      <ProfileLite />
      <div className="my-24" />
    </div>
  )
}

const Projects = ({ tilesMode, overlay, setOverlay, projectBtnText, projectBtnUrl }) => {
  const [active, setActive] = useState(null)
  const handleOnClick = index => {
    setActive(index)
    setOverlay(true)
  }
  useEffect(() => {
    setActive(overlay ? active : null)
  }, [overlay])
  return (
    <StaticQuery
      query={query}
      render={data => {
          const nodes = data.allPrismicProjects.nodes
          const nodeWidths = nodes.map(n =>
            tilesMode === "dynamic" && n.tile_width === "double" ? 2 : 1
          )
          let nodeIndex = 0
          return (
            <div class="grid gap-4">
              {nodes.map((n, index) => {
                if (nodeIndex > index) return null
                const tileWidth = nodeWidths[index]
                const nextTileWidth = nodeWidths[index + 1]
                if (nextTileWidth && tileWidth === 1 && nextTileWidth === 1) {
                  nodeIndex = index + 2
                  return (
                    <div className="gap-4 grid md:grid-cols-2 grid-cols-1">
                      <Tile
                        node={n.data}
                        onClick={() => handleOnClick(index)}
                      />
                      <Tile
                        node={nodes[index + 1].data}
                        onClick={() => handleOnClick(index + 1)}
                      />
                    </div>
                  )
                } else {
                  nodeIndex = index + 1
                  return (
                    <div
                      className={`md:grid-cols-${
                        tileWidth === 1 ? 2 : 1
                      } grid-cols-1`}
                    >
                      <Tile
                        node={n.data}
                        double
                        onClick={() => handleOnClick(index)}
                      />
                    </div>
                  )
                }
              })}
              {nodes.map((node, index) => {
                const suggested = []
                // Get two projects to suggest
                if (nodes.length >= 3) {
                  while (suggested.length !== 2) {
                    const idx = Math.floor(Math.random() * nodes.length)
                    if (idx !== index && !suggested.includes(idx)) {
                      suggested.push({ ...nodes[idx], originalIndex: idx })
                    }
                  }
                }
                return (
                  <Transition in={active === index} timeout={500}>
                    {state => (
                      <div
                        style={{
                          ...defaultStyle,
                          ...transitionStyles[state],
                        }}
                        className="fixed w-screen bottom-0 bg-white left-0 pt-20 rounded-t-2xl overflow-y-scroll"
                      >
                        <Project
                          node={node.data}
                          suggested={suggested}
                          setActive={setActive}
                          projectBtnText={projectBtnText}
                          projectBtnUrl={projectBtnUrl}
                        />
                      </div>
                    )}
                  </Transition>
                )
              })}
              {
                projectBtnText &&
                <p className="mt-10">
                  {projectBtnUrl && projectBtnUrl.url ? (
                    <a
                      href={projectBtnUrl.url}
                      className="font-bold rounded-full border border-blue-900 text-blue-900 px-6 py-3 hover:bg-blue-900 hover:text-white"
                    >
                      {projectBtnText.text}
                    </a>
                  ) : (
                    <Link
                      to="/projects"
                      className="font-bold rounded-full border border-blue-900 text-blue-900 px-6 py-3 hover:bg-blue-900 hover:text-white"
                    >
                      {projectBtnText.text}
                    </Link>
                  )}
                </p>
              }
            </div>
          )
      }}
      />
  )
}

Projects.propTypes = {
    tilesMode: PropTypes.string
}

export default Projects