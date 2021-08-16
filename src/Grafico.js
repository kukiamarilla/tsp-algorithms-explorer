import React from 'react';
import Sketch from 'react-p5';


let scale = 25
let radius = 20
let padding = 100 + 5 * scale

const drawNode = (p5, x, y, idx) => {
    const realX = x * scale + padding;
    const realY = y * scale + padding;
    p5.ellipse(realX, realY, radius);
    p5.fill(0);
    p5.text(idx, realX - 4, realY + 4);
}

const drawLine = (p5, x1, y1, x2, y2) => {
    const realX1 = x1 * scale + padding;
    const realY1 = y1 * scale + padding;
    const realX2 = x2 * scale + padding;
    const realY2 = y2 * scale + padding;
    const norma = Math.sqrt( (realY2 - realY1) * (realY2 - realY1)  + (realX2 - realX1) * (realX2 - realX1));
    const paddingVectorX = (realX2 - realX1) / norma * 10;
    const paddingVectorY = (realY2 - realY1) / norma * 10;
    p5.line(realX1 + paddingVectorX, realY1 + paddingVectorY, realX2 - paddingVectorX, realY2 - paddingVectorY);
}

const Grafico = ({matriz, ruta}) => {
    console.log(ruta)
    let step = 0;

    const setup = (p5, canvasParentRef) => {	
		p5.createCanvas(700, 700).parent(canvasParentRef);
        p5.frameRate(1)
        if(ruta.length > 0)
            p5.frameRate(parseInt(ruta.length / 5))
	};

	const draw = (p5) => {
		p5.background(0);
        if(ruta.length > 0){
            for (let i = 0; i <= step; i++) {
                p5.fill(13, 202, 240)
                drawNode(p5, matriz[ruta[i%ruta.length]][0], matriz[ruta[i%ruta.length]][1], ruta[i])
                if(i > 0) {
                    p5.stroke(13, 202, 240)
                    p5.strokeWeight(3)
                    drawLine(p5, matriz[ruta[(i-1)%ruta.length]][0], matriz[ruta[(i-1)%ruta.length]][1], matriz[ruta[i%ruta.length]][0], matriz[ruta[i%ruta.length]][1], ruta[i])
                    p5.strokeWeight(0)
                }
            }
            for (let i = step + 1; i < ruta.length; i++) {
                p5.fill(255)
                drawNode(p5, matriz[ruta[i]][0], matriz[ruta[i]][1], ruta[i])   
            }
            step++;
            if(step > ruta.length ) step = 0;
        } else {
            matriz.forEach((el, idx) => {
                p5.fill(255)
                drawNode(p5, el[0], el[1], idx)
            });
        }
		
	};

	return <Sketch setup={setup} draw={draw} />;
}

export default Grafico;