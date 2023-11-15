// Global constants
const SYMBOL_IMG = new Image();
SYMBOL_IMG.src = "./frontend/img/symboles.png"; 
const SYMBOL_IMG_PARAMS = {
    // [posX, posY, width, heigth]
    leftBracket: [0,0,23,64],
    rightBracket: [23,0,23,64],
    loop: [134, 0, 46, 36],
    break: [0,65,46,64],
    leftCorner: [92, 65, 23, 64],
    rightCorner: [115, 65, 23, 64]
};

/**
 * @abstract Node
 * @description abstract parent class of 
 * the following classes, 
 * representing a node in the algorithm.
 */
class Node {
    // Private properties
    #methodError = new Error("Method must be implemented.");

    /**
     * @param {HTMLCanvasElement} canvas 
     * @param {Object} node
     */
    constructor(canvas, node) {

        if (this.constructor == Node) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        this._canvas = canvas;
        this._id = node.id;
        this._x = node.x??0;
        this._y = node.y??0;
        this._txt = node.txt;
        this._type = node.type;
        this._height = node.height;
        this._width = node.width;
        this._size = node.size;
        this._clickArea = node.clickArea;
        this._allCoord = node.allCoord;
        this._val = node.val;
        this._funcToExec = node.func;
        this._output = node.output;

        this._myNodes = [];
        
        this._context = this._canvas.getContext('2d');
        this._context.font = '16px verdana';
        this._context.lineWidth = 2;

        this._txtHeight = 16;
        this._txtTopMargin = 22;
        this._txtLeftMargin = 8;        

        this._symbol = SYMBOL_IMG;
        this._symbolParam = SYMBOL_IMG_PARAMS;
    }

    get id() { return this._id }
    set id(val) { this._id = val }

    get x() { return this._x }
    set x(x) { this._x = x }

    get y() { return this._y }
    set y(y) { this._y = y }

    get txt() { return this._txt }
    set txt(val) { this._txt = val }

    get funcToExec() { return this._funcToExec }
    set funcToExec(val) { this._funcToExec = val }

    get valForFunc() { return this._val }
    set valForFunc(val) { this._val = val }

    get type() { return this._type }
    set type(type) { this._type = type }

    get height() { return this._height }
    set height(val) { this._height = val }

    get width() { return this._width }
    set width(val) { this._width = val }

    get size() { return this._size }
    set size(val) { this._size = val }

    get clickArea() { return this._clickArea }
    set clickArea(val) { this._clickArea = val }
    
    get allCoord() { return this._allCoord }
    set allCoord(val) { this._allCoord = val }

    get output() { return this._output }
    set output(val) { this._output = val }

    get txtHeight() { return this._txtHeight }
    get txtTopMargin() { return this._txtTopMargin }
    get txtLeftMargin() { return this._txtLeftMargin }

    get symbolParam() { return this._symbolParam }

    isComposed() {
        return false;
    }

    addNode(node) {
        return false;
    }

    replaceNode(idOfNode, node) {
        return null;
    }

    /**
     * @description draws a line from 
     * point (x1,y1) to point (x2,y2).
     * @param {Number} x1 
     * @param {Number} y1 
     * @param {Number} x2 
     * @param {Number} y2 
     */
    drawLine(x1, y1, x2, y2) {
        this._context.beginPath();
        this._context.moveTo(x1, y1);
        this._context.lineTo(x2, y2);
        this._context.stroke();
    }

    /**
     * @description draws left corner 
     * and right corner from 
     * an image containing symbols.
     * @param {Number} height 
     * @param {Number} leftCornerX 
     * @param {Number} rightCornerX 
     * @param {Number} y 
     */
    drawCorner(height, leftCornerX, rightCornerX, y) {
        this._context.drawImage(
            this._symbol, 
            ...this._symbolParam.leftCorner, 
            leftCornerX|0, 
            (y - height/2)|0, 
            this._symbolParam.leftCorner[2],
            height
        );

        this._context.drawImage(
            this._symbol, 
            ...this._symbolParam.rightCorner, 
            rightCornerX|0, 
            (y - height/2)|0, 
            this._symbolParam.rightCorner[2],
            height
        );
    }

    /**
     * @description draws left bracket 
     * and right bracket from 
     * an image containing symbols.
     * @param {Number} height 
     * @param {Number} leftBracketX 
     * @param {Number} rightBracketX 
     * @param {Number} y 
     */
    drawBrackets(height, leftBracketX, rightBracketX, y) {
        this._context.drawImage(
            this._symbol, 
            ...this._symbolParam.leftBracket, 
            leftBracketX, 
            y, 
            this._symbolParam.leftBracket[2], 
            height
        );

        this._context.drawImage(
            this._symbol, 
            ...this._symbolParam.rightBracket, 
            rightBracketX, 
            y, 
            this._symbolParam.rightBracket[2], 
            height
        );
    }

    /**
     * @description is used to draw the node.
     * @warning this method is virtual 
     * and cannot be called from the parent class.
     */
    draw() {
        throw this.#methodError;
    }

    /**
     * 
     */
    exec(character) {
        throw this.#methodError;
    }
}