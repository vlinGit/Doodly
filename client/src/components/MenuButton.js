import React from 'react'
import "../css/MenuButton.css"

function menuButton(props) {
  return (
    <button onClick={props.clicked} className="menuButton">{props.title}</button>
  )
}

export default menuButton