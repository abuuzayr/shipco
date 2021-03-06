import React, { useState, useEffect, useRef } from 'react'
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import { BsDot, BsHeartFill } from "react-icons/bs"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import { Transition } from "react-transition-group"
import ProfileLite from "./profile-lite"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

const arrowStyles = {
  position: "absolute",
  zIndex: 2,
  top: "calc(50% - 20px)",
  width: 40,
  height: 40,
  cursor: "pointer",
  transition: "opacity 500ms ease-in-out",
  outline: "none"
}

const defaultStyle = {
  transition: "all 500ms ease-in-out",
  height: 0,
  marginBottom: -999
}

const transitionStyles = {
  entering: { height: "calc(100vh - 40px)", marginBottom: 0 },
  entered: { height: "calc(100vh - 40px)", marginBottom: 0 },
  exiting: { height: 0, marginBottom: -999 },
  exited: { height: 0 },
}

const query = graphql`
  query {
    allPrismicProjects {
      nodes {
        uid
        data {
          index
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
        className={`pt-4 px-4 md:pt-10 md:px-10 rounded-xl overflow-hidden cursor-pointer hover:shadow-md ${
          double ? "md:flex double-tile-height" : "tile-height"
        }`}
        style={{ backgroundColor: tile_color }}
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
          <div className="mb-4">
            <h2
              className="text-xl font-bold leading-7 mb-4"
              style={{ color: "#102252" }}
            >
              {name.text}
            </h2>
            <p>{description.text}</p>
          </div>
        </div>
        <div className="flex-1">
          <img src={thumbnail.url} className="mx-auto" />
        </div>
      </div>
    )
}

const LikeButton = ({ uid }) => {
  const [like, setLike] = useState(
    (typeof window !== `undefined` ?
      parseInt(window.localStorage.getItem(`${uid} like`)) : 0)
  )
  return (
    <button
      id={uid}
      className={`rounded-full px-5 py-3 bg-gray-100 text-sm font-bold whitespace-no-wrap outline-none focus:outline-none ${like ? "cursor-default" : "hover:bg-gray-50"}`}
      style={{ color: like ? "#FF004C" : "#062D5B" }}
      type="button"
      onClick={() => {
        if (like) return
        setLike(() => {
          if (typeof window !== `undefined`) {
            window.localStorage.setItem(`${uid} like`, 1)
          }
          return 1
        })
      }}
    >
      <BsHeartFill className="inline mr-2" color={like ? "#FF004C" : "#062D5B"} /> Like
    </button>
  )
}

const Project = ({ uid, node, suggested, setActive, projectBtnText, projectBtnUrl, cols }) => {
  const { tags, name, description, long_description, role, images, year } = node
  const carouselChild = useRef()
  useEffect(() => {
    if (carouselChild && carouselChild.current) {
      carouselChild.current.closest('.carousel-root').focus()
    }
  }, [carouselChild])
  return (
    <div className="px-6 md:p-0 md:max-w-2xl mx-auto">
      <div className="md:flex md:place-items-center justify-between mb-4">
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
        <LikeButton uid={uid} />
      </div>
      <div className="mb-10">
        <Carousel
          showIndicators={false}
          showStatus={false}
          infiniteLoop={true}
          thumbWidth={100}
          useKeyboardArrows={true}
          swipeable={true}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{ ...arrowStyles }}
                className="rounded-full place-items-center bg-white shadow-lg -ml-5 grid carousel-arrow opacity-0"
              >
                <BiChevronLeft color="#062D5B" size={20} />
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{ ...arrowStyles, right: 0 }}
                className="rounded-full place-items-center bg-white shadow-lg -mr-5 grid carousel-arrow opacity-0"
              >
                <BiChevronRight color="#062D5B" size={20} />
              </button>
            )
          }
        >
          {images.map(({ image }) => (
            <div className="bg-white" ref={carouselChild}>
              <img src={image.url.split("?auto=")[0]} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="md:flex md:place-items-start">
        <div className="md:w-4/6">
          <div className="md:w-11/12 mb-4 md:mb-0">
            <p className="font-bold" style={{ color: "#062D5B" }}>
              {description.text}
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: long_description.html }}
              className="html-block"
            ></div>
          </div>
          <div className="w-1/12 hidden md:block" />
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
      </div>
      <hr className="my-24 clear-both" />
      {suggested && suggested.length === 2 && (
        <>
          <div className="mb-24">
            <p
              className="text-xl mb-4"
              style={{ fontFamily: "Merriweather", color: "#062D5B" }}
            >
              You may also like
            </p>
            <div className={`gap-6 grid md:grid-cols-${cols} grid-cols-1`}>
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
                    className="font-bold rounded-full border border-blue-900 text-blue-900 px-6 py-2 md:py-4 hover:bg-blue-900 hover:text-white text-sm"
                  >
                    {projectBtnText.text}
                  </a>
                ) : (
                  <Link
                    to="/projects"
                    className="font-bold rounded-full border border-blue-900 text-blue-900 px-6 py-2 md:py-4 hover:bg-blue-900 hover:text-white text-sm"
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

const Projects = ({ tilesMode, overlay, setOverlay, projectBtnText, projectBtnUrl, onlyIndexed, cols }) => {
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
          let nodes = data.allPrismicProjects.nodes
          if (onlyIndexed) nodes = nodes.filter(n => n.data.index)
          nodes = nodes.sort((a, b) => {
            if (a.data.index === b.data.index) return 0 
            if (!a.data.index) return 1
            if (!b.data.index) return -1
            return a.data.index > b.data.index ? 1 : -1
          })
        const nodeWidths = nodes.map((n, i) => (tilesMode === "dynamic" && n.data.tile_width === "double") ? cols : 1
        )
          let nodeIndex = 0
          return (
            <div className="grid gap-6">
              {nodes.map((n, index) => {
                if (nodeIndex > index) return null
                const tileWidth = nodeWidths[index]
                const nextTileWidth = nodeWidths[index + cols - 2]
                if (nextTileWidth && tileWidth === 1 && nextTileWidth === 1) {
                  nodeIndex = index + cols
                  return (
                    <div className={`gap-6 grid md:grid-cols-${cols} grid-cols-1`}>
                      {
                        [...Array(cols).keys()].map(i => {
                          if (nodes[index + i]) {
                            return (
                              <Tile
                                node={nodes[index + i].data}
                                onClick={() => handleOnClick(index + i)}
                              />
                            )
                          }
                        })
                      }
                    </div>
                  )
                } else {
                  nodeIndex = index + 1
                  return (
                    <div
                      className={`md:grid-cols-${
                        tileWidth === 1 ? cols : 1
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
                  <Transition in={active === index} timeout={500} mountOnEnter unmountOnExit>
                    {state => { 
                      const style = {
                        ...defaultStyle,
                        ...transitionStyles[state],
                      }
                      if (typeof window !== `undefined` && window.innerHeight > 0) {
                        style.height = `calc(${window.innerHeight}px - 40px)`
                      }
                      return (
                        <div
                          style={style}
                          className="fixed w-screen bottom-0 bg-white left-0 pt-8 md:pt-20 rounded-t-2xl overflow-y-scroll project-modal z-20"
                        >
                          <Project
                            uid={node.uid}
                            node={node.data}
                            suggested={suggested}
                            setActive={setActive}
                            projectBtnText={projectBtnText}
                            projectBtnUrl={projectBtnUrl}
                            cols={cols}
                          />
                        </div>
                      )
                    }}
                  </Transition>
                )
              })}
              {
                projectBtnText &&
                <p className="mt-10">
                  {projectBtnUrl && projectBtnUrl.url ? (
                    <a
                      href={projectBtnUrl.url}
                      className="font-bold rounded-full border border-blue-900 text-blue-900 px-6 py-2 md:py-4 hover:bg-blue-900 hover:text-white text-sm"
                    >
                      {projectBtnText.text}
                    </a>
                  ) : (
                    <Link
                      to="/projects"
                      className="font-bold rounded-full border border-blue-900 text-blue-900 px-6 py-2 md:py-4 hover:bg-blue-900 hover:text-white text-sm"
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
