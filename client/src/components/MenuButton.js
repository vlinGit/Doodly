import React from 'react'
import "./MenuButton.css"

function menuButton(props) {
  return (
    <button onClick={props.clicked} class="menuButton">{props.title}</button>
  )
}

export default menuButton