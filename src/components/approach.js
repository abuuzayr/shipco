import React, { useState } from 'react'
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Transition } from "react-transition-group"

const defaultState = {
  display: "-webkit-box",
  "-webkit-line-clamp": "4",
  "-webkit-box-orient": "vertical",
  transition: "all 300ms ease-in-out"
}

const transitionState = {
  entering: { display: "block" },
  entered: { display: "block" },
  exiting: { display: "block" },
  exit: { display: "block" },
}

const Approach = ({ title, text, button }) => {
  const [open, setOpen] = useState(false)
    return (
      <div class="md:flex my-40" id="approach">
        <div class="md:w-1/4 w-full mb-10 md:mb-0">
          <p className="font-bold text-blue-900 text-xl">{title}</p>
        </div>
        <div class="md:w-3/4 w-full">
          <Transition in={open}>
            {state => (
              <>
                <p className="overflow-hidden" style={{
                  ...defaultState,
                  ...transitionState[state]
                }}>{text}</p>
                <div className="mt-4 font-bold text-sm" style={{ color: "#F27400" }}>
                  {button.url ? button.url.includes("http") ? (
                    <a
                      className="font-bold"
                      href={button.url}
                      rel="noopener noreferrer"
                    >
                      {button.text}
                    </a>
                  ) : (
                    <Link
                      className="font-bold"
                      to={button.url}
                    >
                      {button.text}
                    </Link>
                    ) : <button className="font-bold outline-none focus:outline-none" onClick={() => setOpen(!open)}>{open ? "Hide" : "Read More"}</button>}
                </div>
              </>
            )}
          </Transition>
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