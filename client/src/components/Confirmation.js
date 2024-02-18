import React from 'react';
import "../css/Confirmation.css";

// Always include trigger and closePrompt function as props
function Confirmation(props) {
    return (  
        <div id="confirmation">
            <div id="confirmPrompt" >
                Are you sure you want to {props.title}
                <div id="confirmButtonContainer">
                    <button onClick={() => {props.trigger(false); props.closePrompt(false)}}>Yes</button>
                    <button onClick={() => {props.closePrompt(false)}}>No</button>
                </div>
                {props.subtext}
            </div>
        </div>
    )
}

export default Confirmation;