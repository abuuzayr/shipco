import React, { useState } from 'react'
import PropTypes from "prop-types"
import { IoIosArrowForward } from "react-icons/io"
import { Transition } from "react-transition-group"

const defaultStyle = {
  transition: "all 300ms ease-in-out",
  opacity: 0,
  display: "none"
}

const transitionStyles = {
  entering: { opacity: 0, display: "block" },
  entered: { opacity: 1, display: "block" },
  exiting: { opacity: 0, display: "block" },
  exited: { opacity: 0 },
}

const Work = ({ title, nodes }) => {
    const [active, setActive] = useState(0)
    return (
        <div class="md:flex my-40">
            <div class="md:w-1/4 w-full">
                <p className="font-bold text-blue-900 text-xl">
                    {title}
                </p>
            </div>
            <div class="md:w-3/4 w-full">
                {
                    nodes.map((n, index) => {
                        const { company, position, duration, long_description } = n
                        return (
                          <div className="mb-8">
                            <div
                              className="font-bold text-blue-900 text-xl flex items-center cursor-pointer"
                              onClick={() => setActive(active === index ? null : index)}
                            >
                              {company.text}{" "}
                              {active !== index && (
                                <IoIosArrowForward className="text-blue-900 ml-2" />
                              )}
                            </div>
                            <p className="font-bold text-blue-900 mt-6">
                              {position.text}
                            </p>
                            <p className="italic">{duration.text}</p>
                            <Transition in={active === index} timeout={300}>
                              {state => (
                                <div
                                  style={{
                                    ...defaultStyle,
                                    ...transitionStyles[state],
                                  }}
                                >
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: long_description.html,
                                    }}
                                    className="html-block"
                                  ></p>
                                  <button
                                    className="mt-6 font-bold text-sm"
                                    style={{ color: "#D74000" }}
                                    onClick={() => setActive(null)}
                                  >
                                    Hide
                                  </button>
                                </div>
                              )}
                            </Transition>
                          </div>
                        )
                    })
                }
            </div>
            <style jsx></style>
        </div>
    )
}

Work.propTypes = {
    title: PropTypes.string,
    nodes: PropTypes.object
}

export default Work