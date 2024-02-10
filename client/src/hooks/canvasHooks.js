import React, { useState } from 'react';
import { useRef } from 'react';

export function useOnDraw(draw) {
    const canvasRef = useRef(null);
    const color = useRef("#00000");
    const coords = useRef({x:0,y:0});
    const drawing = useRef(false);
    const prePoint = useRef(null);

    function setRef(ref){
        if (!ref){
            return;
        }
        canvasRef.current = ref;
        mouseListener();
    }

    function initDraw(){
        if (drawing.current && draw){
            draw(canvasRef.current.getContext("2d"), coords.current, prePoint.current, color, 10);
        }
    }

    function mouseListener(){
        const mouseMoveListener = (event) => {
            const curCoords = calcCanvasBoundary(event.clientX, event.clientY);
            prePoint.current = coords.current;
            coords.current = curCoords;
            initDraw();
        }

        const mouseDownListener = (event) => {
            if (event.button == 0){
                drawing.current = true;
                initDraw();
            }
        }

        const mouseUpListener = (event) => {
            if (event.button == 0){
                drawing.current = false;
                prePoint.current = null;
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

    function calcCanvasBoundary(clientX, clientY){
        const boundary = canvasRef.current.getBoundingClientRect();
        return({x: parseInt(clientX-boundary.left), y: parseInt(clientY-boundary.top)})
    }

    return setRef;
}
