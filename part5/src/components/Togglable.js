import React, { useState } from "react"
import PropTypes from "prop-types"

// From part5
const Togglable = (props) => {
    Togglable.propTypes = {
        buttonLabel: PropTypes.string.isRequired
    }
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? "none" : "" }
    const showWhenVisible = { display: visible ? "" : "none" }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button id="showButton" onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button id="cancelButton" onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
}

export default Togglable