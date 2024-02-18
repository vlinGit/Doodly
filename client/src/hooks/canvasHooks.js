import React, { useEffect, useState } from 'react';
import { useRef } from 'react';

export const undo = new CustomEvent("undo");
export const redo = new CustomEvent("redo");
export const brush = new CustomEvent("brush");
export const eraser = new CustomEvent("eraser");
export const clear = new CustomEvent("clear");

export function useOnDraw(draw) {
    const canvasRef = useRef(null);
    const color = useRef("#00000");
    const coords = useRef({x:0,y:0});
    const drawing = useRef(false);
    const prePoint = useRef(null);
    const ctx = useRef(null);
    const size = useRef(10);
    const composite = useRef("source-over");
    const historyIndex = useRef(0);
    const drawData = useRef([[]]);
    var stroke = [];
    
    function setRef(ref){
        if (!ref){
            return;
        }
        canvasRef.current = ref;
        mouseListener();
        toolsListener();
    }

    function initDraw(){
        if (drawing.current && draw){
            historyNav("draw");
            ctx.current = canvasRef.current.getContext("2d");
            draw(ctx.current, coords.current, prePoint.current, color.current, size.current, composite.current);
            stroke.push({"coords": coords.current, "prePoint": prePoint.current, "color": color.current, "size": size.current, "composite": composite.current});
        }   
    }

    function redraw(){
        if (!ctx.current) {
            return;
        }
        const boundary = canvasRef.current.getBoundingClientRect();
        ctx.current.clearRect(0,0,boundary.width,boundary.height);
        for (var i = 0; i < historyIndex.current; i++){
            var tempStroke = drawData.current[i];
            if (tempStroke){
                for (var j = 0; j < tempStroke.length; j++){
                    const point = tempStroke[j];
                    draw(ctx.current, point.coords, point.prePoint, point.color, point.size, point.composite);
                }
            }
        }
    }

    function mouseListener(){
        const mouseMoveListener = (event) => {
            const curCoords = calcCanvasBoundary(event.clientX, event.clientY);
            prePoint.current = coords.current;
            coords.current = curCoords;
            initDraw();
            console.log(historyIndex);
        }

        const mouseDownListener = (event) => {
            const elem = document.elementFromPoint(event.clientX, event.clientY);
            if (elem.tagName == "CANVAS" && event.button == 0){
                drawing.current = true;
                initDraw();
            }
        }

        const mouseUpListener = (event) => {
            const elem = document.elementFromPoint(event.clientX, event.clientY);
            if (elem.tagName == "CANVAS" && event.button == 0){
                drawing.current = false;
                prePoint.current = null;
                drawData.current.push(stroke);
                historyIndex.current++;
                stroke = [];
            }
        }
        
        // const touchStartListener = (event) => {
        //     event.preventDefault();
        //     drawing.current = true;
        //     console.log(event.clientX);
        // }
        
        // const touchEndListener = (event) => {
        //     drawing.current = false;
        // }
        
        window.addEventListener("mousemove", mouseMoveListener);
        window.addEventListener("mousedown", mouseDownListener);
        window.addEventListener("mouseup", mouseUpListener);
    }

    // FIXME:
    //  After a clear (from the button) undo/redo skips over multiple strokes in the history
    // This function relies on custom events, use the predifined ones on the top of this file
    // Or create your own, just ensure that they match the eventListener required strings
    function toolsListener(){
        const undoListener = (event) => {
            historyNav("undo");
            redraw();
        }

        const redoListener = (event) => {
            historyNav("redo");
            redraw();
        }

        const brushListener = (event) => {
            composite.current = "source-over";
        }

        const eraserListener = (event) => {
            composite.current = "destination-out";
        }

        window.addEventListener("brush", brushListener);
        window.addEventListener("eraser", eraserListener);
        window.addEventListener("undo", undoListener);
        window.addEventListener("redo", redoListener);
    }

    function calcCanvasBoundary(clientX, clientY){
        const boundary = canvasRef.current.getBoundingClientRect();
        return({x: parseInt(clientX-boundary.left), y: parseInt(clientY-boundary.top)})
    }

    // FIXME:
    //  History index wrong after a canvas clear
    function historyNav(action){
        if (historyIndex.current != 0 && action == "undo"){
            historyIndex.current--;
        }else if (action == "redo" && historyIndex.current != drawData.current.length){
            historyIndex.current++;
        }else if (action == "draw"){
            drawData.current = drawData.current.splice(0, historyIndex.current);
        }
    }

    return setRef;
}
