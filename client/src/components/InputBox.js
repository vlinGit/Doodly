import React from 'react'
import '../css/InputBox.css'

function InputBox(props) {
    return (
        <div id="formStyle" className="form">
            <img id="constrainImage" src={props.src} />
            <input onChange={(event) => {props.change(event.target.value)}} id="inputStyle" name={props.name} type={props.type} placeholder={props.placeholder} />
        </div>
    )
}

export default InputBox