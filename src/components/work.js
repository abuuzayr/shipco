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
      <div class="md:flex my-40" id="work">
        <div class="md:w-1/4 w-full mb-10 md:mb-0">
          <p className="font-bold text-blue-900 text-xl leading-none">{title}</p>
        </div>
        <div class="md:w-3/4 w-full pl-8 border-l-2 border-dashed ml-2 md:ml-0">
          {nodes.map((n, index) => {
            const { company, position, duration, long_description } = n
            return (
              <div
                className={`relative ${
                  index < nodes.length - 1
                    ? "mb-8"
                    : "-ml-10 pl-8 border-l-8 border-white"
                }`}
              >
                <div
                  className="w-4 h-4 rounded-full absolute -ml-10 mt-1"
                  style={{ background: "#DEE5EE" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 absolute -ml-9 mt-2"
                  style={{
                    background: active === index ? "#062D5B" : "#BDBDBD",
                  }}
                ></div>
                <div
                  className="font-bold text-blue-900 text-xl flex items-center cursor-pointer -mt-1"
                  onClick={() => setActive(active === index ? null : index)}
                >
                  {company.text}{" "}
                  {active !== index && (
                    <IoIosArrowForward className="text-blue-900 ml-2" />
                  )}
                </div>
                <p className="font-bold text-blue-900 mt-6">{position.text}</p>
                <p className="italic">{duration.text}</p>
                <Transition in={active === index} timeout={300}>
                  {state => (
                    <div
                      style={{
                        ...defaultStyle,
                        ...transitionStyles[state],
                      }}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: long_description.html,
                        }}
                        className="html-block"
                      ></div>
                      <button
                        className="mt-6 font-bold text-sm"
                        style={{ color: "#F27400" }}
                        onClick={() => setActive(null)}
                      >
                        Hide
                      </button>
                    </div>
                  )}
                </Transition>
              </div>
            )
          })}
        </div>
      </div>
    )
}

Work.propTypes = {
    title: PropTypes.string,
    nodes: PropTypes.object
}

export default Work