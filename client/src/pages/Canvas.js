import {React, useRef} from 'react';
import './canvasStyle.css';
import '../App.css';
import { useOnDraw } from '../hooks/canvasHooks';

// The following will import all images location within /public/sidebarIcons and map it to a key-value pair
// Keys will be the filename without the extension and values are the path to the image
const sidebarContext = require.context("../../public/sidebarIcons", true);
const sidebarList = Object.fromEntries(sidebarContext.keys().map(icon => [icon.split(".")[1].substring(1), sidebarContext(icon)]));

function Canvas(props) {
  const canvasRef = useOnDraw(draw);
  const composite = useRef("source-over");

  function draw(ctx, coords, prePoint, color, size){
    // eraser: ctx.globalCompositeOperation="destination-out";
    ctx.globalCompositeOperation = composite.current;
    console.log(ctx.globalCompositeOperation)
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, size/1000, 0, 2 * Math.PI, false);
    ctx.stroke();
    if (prePoint){
      ctx.beginPath();
      ctx.moveTo(prePoint.x, prePoint.y);
      ctx.lineTo(coords.x, coords.y);
      ctx.lineWidth = size;
      ctx.fillStyle = color;
      ctx.stroke();
    }
  }

  function setCanvasAttr(){
    const canvasStyle = document.getElementById("canvasStyle");
    canvasStyle.style.height = props.height;
    canvasStyle.style.width = props.width;
  }

  function setMode(newMode){
    if (newMode == "eraser"){
      composite.current = "destination-out";
    }else{
      composite.current = "source-over"
    }
    console.log("New composite", composite.current)
  }

  return (
    <div>
      <div id="sidebar">
        <img onClick={() => setMode("paintBrush")} className="sidebarIcon" src={sidebarList.paintBrush} alt="paintBrush" />
        <img onClick={() => setMode("eraser")} className="sidebarIcon" src={sidebarList.eraser} alt="eraser" />
      </div>
      <div className="container">
        <canvas width={props.width} height={props.height} ref={canvasRef} id="canvasStyle" onLoad={setCanvasAttr}></canvas>
      </div>
    </div>
  );
}

export default Canvas;