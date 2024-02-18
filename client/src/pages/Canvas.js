import {React, useRef, useState, useEffect} from 'react';
import '../css/canvasStyle.css';
import '../css/App.css';
import { useOnDraw, undo, redo, eraser, brush, clear} from '../hooks/canvasHooks';
import Confirmation from '../components/Confirmation';

// The following will import all images location within /public/sidebarIcons and map it to a key-value pair
// Keys will be the filename without the extension and values are the path to the image
const sidebarContext = require.context("../../public/sidebarIcons", true);
const sidebarList = Object.fromEntries(sidebarContext.keys().map(icon => [icon.split(".")[1].substring(1), sidebarContext(icon)]));

function Canvas(props) {
  const [undoRedo, setUndoRedo] = useState(0);
  const [clearCanvas, setClearCanvas] = useState(false);
  const [clearPrompt, setClearPrompt] = useState(false);
  const canvasRef = useOnDraw(draw, undoRedo);

  // Move this into the cavnasHooks
  useEffect(() => {
    window.dispatchEvent(clear);
    setClearPrompt(false);
  }, [clearCanvas]);

  function draw(ctx, coords, prePoint, color, size, setComposite){
    // eraser: ctx.globalCompositeOperation="destination-out";
    // console.log(ctx.globalCompositeOperation)
    // console.log(coords, prePoint, color, size);
    console.log("drawing with", setComposite);
    if (setComposite){
      ctx.globalCompositeOperation = setComposite;
    }else{
      ctx.globalCompositeOperation = "source-over";
    }

    ctx.beginPath();
    ctx.arc(coords.x, coords.y, size/1000, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
    if (prePoint){
      ctx.beginPath();
      ctx.moveTo(prePoint.x, prePoint.y);
      ctx.lineTo(coords.x, coords.y);
      ctx.lineWidth = size;
      ctx.fillStyle = color;
      ctx.stroke();
      ctx.closePath();
    }
  }

  function setCanvasAttr(){
    const canvasStyle = document.getElementById("canvasStyle");
    canvasStyle.style.height = props.height;
    canvasStyle.style.width = props.width;
  }

  
  return (
    <div id="canvasPage">
      {clearPrompt && <Confirmation trigger={() => setClearCanvas()} closePrompt={() => setClearPrompt()} title="CLEAR CANVAS" subtext="This action is PERMANENT"/>}
      <div id="sidebar">
        <img onClick={() => window.dispatchEvent(brush)} className="sidebarIcon" src={sidebarList.paintBrush} alt="paintBrush" />
        <img onClick={() => window.dispatchEvent(eraser)} className="sidebarIcon" src={sidebarList.eraser} alt="eraser" />
        <img onClick={() => window.dispatchEvent(undo)} className="sidebarIcon" id="undo" src={sidebarList.arrowCurve} alt="undo" />
        <img onClick={() => window.dispatchEvent(redo)} className="sidebarIcon" id="redo" src={sidebarList.arrowCurve} alt="redo" />
      </div>
      <div className="canvasContainer">
        {clearPrompt && <div id="thing" onClick={event => event.stopPropagation()}></div>}
        <canvas width={props.width} height={props.height} ref={canvasRef} id="canvasStyle" onLoad={setCanvasAttr}></canvas>
      </div>
    </div>
  );
}

export default Canvas;