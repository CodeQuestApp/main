/* -- Utitilities -- */

/**
 * @file Utilities.js
 * @description File containing 
 * the application's utility functions.
 */


/* Global variables */
let movePromise = Promise.resolve();

/* Global constants */
const DRAWING_MARGIN_1 = 2;
const CANVAS_COLOR_1 = "#009a17";
const CANVAS_COLOR_2 = "#1c1c1c";

/**
 * @function wait
 * @description ...
 * 
 * @param {*} ms 
 * @returns 
 */
function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(ms)
        }, ms)
    })
}

/**
 * @function eraseCanvas
 * @description Erases the canvas.
 * 
 * @param {HTMLCanvasElement} cnv // The html canvas element
 * @param {CanvasRenderingContext2D} ctx // Drawing context for the canvas
 */
function eraseCanvas(cnv, ctx) {
    // Change the colour to redraw the canvas background.
    ctx.fillStyle = CANVAS_COLOR_1;
    // Draw the background
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    // Restore the default drawing colour
    ctx.fillStyle = CANVAS_COLOR_2;
}

/**
 * @function drawLine
 * @description Used to draw a line
 * from a point x to a point y on a canvas.
 * 
 * @param {CanvasRenderingContext2D} ctx // Drawing context for the canvas
 * @param {Number} x1 // x coordinate of the starting point
 * @param {Number} y1 // y coordinate of the starting point
 * @param {Number} x2 // x coordinate of arrival point
 * @param {Number} y2 // y coordinate of arrival point
 */
function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

/**
 * @function drawGrid
 * @description Draw a grid on canvas that represent map.
 * 
 * @param {HTMLCanvasElement} cnv // The html canvas element
 * @param {CanvasRenderingContext2D} ctx // Drawing context for the canvas
 * @param {Number} caseWidth // Value between two lines 
 */
function drawGrid(cnv, ctx, caseWidth) {
    for (let i = 0; i < (cnv.width / caseWidth); i++) {
        for (let j = 0; j < (cnv.height / caseWidth); j++) {
            // Draws horizontal liness
            drawLine(ctx, 0, cnv.height - (j * caseWidth) , cnv.width, cnv.height - (j * caseWidth));
            // Draws vertical lines
            drawLine(ctx, i * caseWidth, 0, i * caseWidth, cnv.height);
        }
    }
}

/**
 * @function drawLinkBetweenNodes
 * @description Used to draw links
 * between the nodes of an algorithm.
 * 
 * @param {CanvasRenderingContext2D} ctx // Drawing context for the canvas
 * @param {Array} nodeArray // Array of nodes to which links are drawn 
 * @param {Node} node // Node from which links are drawn
 */
function drawLinkBetweenNodes(ctx, nodeArray, node) {
    for (let i = 0; i < node.output.length; i++) {
        if (node.output[i].length == 1) {
            // Simple decomposition
            drawLine(
                ctx,
                ((node.allCoord[i] + (node.clickArea[i]/2|0)) - DRAWING_MARGIN_1), 
                node.y + (node.height/2|0) + DRAWING_MARGIN_1,
                nodeArray[node.output[i][0]].x - DRAWING_MARGIN_1, 
                (nodeArray[node.output[i][0]].y - (nodeArray[node.output[i][0]].height/2|0) + DRAWING_MARGIN_1)
            );

            if (node.type !== 204 && node.type !== 206) {
                drawLine(
                    ctx,
                    (node.allCoord[i] + (node.clickArea[i]/2|0)) + DRAWING_MARGIN_1, 
                    node.y + (node.height/2|0) + DRAWING_MARGIN_1,
                    nodeArray[node.output[i][0]].x + DRAWING_MARGIN_1, 
                    (
                        nodeArray[node.output[i][0]].y - 
                        (nodeArray[node.output[i][0]].height/2|0) + DRAWING_MARGIN_1
                    )
                );
            }
        } else if (node.output[i].length > 1){
            // Multiple decomposition
            if (node.type === 204 || node.type === 206) {
                for (let j = 0; j < node.output[i].length; j++) {
                    drawLine(
                        ctx,
                        (node.allCoord[i] + (node.clickArea[i]/2 |0)), 
                        node.y + (node.height/2|0) + DRAWING_MARGIN_1,
                        nodeArray[node.output[i][j]].x, 
                        (
                            nodeArray[node.output[i][j]].y - 
                            (nodeArray[node.output[i][j]].height/2|0) + DRAWING_MARGIN_1
                        )
                    );
                }
            } else {
                drawLine(
                    ctx,
                    (node.allCoord[i] + (node.clickArea[i]/2|0)) - DRAWING_MARGIN_1, 
                    node.y + (node.height/2|0) + DRAWING_MARGIN_1,
                    (node.allCoord[i] + (node.clickArea[i]/2|0)) - DRAWING_MARGIN_1, 
                    node.y + (node.height/2|0) + (DRAWING_MARGIN_1 * 10)
                );

                drawLine(
                    ctx,
                    (node.allCoord[i] + (node.clickArea[i]/2|0)) + DRAWING_MARGIN_1, 
                    node.y + (node.height/2|0) + DRAWING_MARGIN_1,
                    (node.allCoord[i] + (node.clickArea[i]/2|0)) + DRAWING_MARGIN_1, 
                    node.y + (node.height/2|0) + (DRAWING_MARGIN_1 * 10)
                );

                for (let j = 0; j < node.output[i].length; j++) {
                    drawLine(
                        ctx,
                        nodeArray[node.output[i][j]].x,
                        node.y + (node.height/2|0) + (DRAWING_MARGIN_1 * 10),
                        node.x,
                        node.y + (node.height/2|0) + (DRAWING_MARGIN_1 * 10)
                    );

                    drawLine(
                        ctx,
                        nodeArray[node.output[i][j]].x, 
                        node.y + (node.height/2 |0) + (DRAWING_MARGIN_1 * 10),
                        nodeArray[node.output[i][j]].x, 
                        (
                            nodeArray[node.output[i][j]].y - 
                            (nodeArray[node.output[i][j]].height/2|0) + DRAWING_MARGIN_1
                        )
                    );
                }
            }
        } 
    }
}

/**
 * @function transformDataFromBD
 * @description Used to draw links
 * between the nodes of an algorithm.
 *  
 * @param {Node} data // Node from which links are drawn
 * @return {Object} ..
 */
function transformDataFromBD(data) {
    return {
        id: data.id,x: Number(data.coordX),y: Number(data.coordY),
        txt: JSON.parse(data.texte),type: data.type,
        height: Number(data.hauteur),width: Number(data.largeur),
        output: JSON.parse(data.sortie),allCoord: JSON.parse(data.coords),
        clickArea: JSON.parse(data.zoneClick),size: JSON.parse(data.taille),
        func: data.fonction == null ? "" : data.fonction,val: Number(data.valeur)
    }
}