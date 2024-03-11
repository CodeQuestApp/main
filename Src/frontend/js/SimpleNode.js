/**
 * Class representing the node of an
 * algorithm corresponding to an assignment.
 * @extends Node
 */
class Assignment extends Node {
    /**
     * Create an assignment.
     * @param {HTMLCanvasElement} canvas 
     * @param {Node} node 
     * @param {Character} character 
     */
    constructor(canvas, node, character) {
        super(canvas, node, character);
    }

    /**
     * Draw the node on canvas context.
     */
    draw() {
        for (let i = 0; i < this.txt[0].length; i++) {
            this._context.fillText(
                `${this.txt[0][i]}`, 
                4 + this.txtLeftMargin, 
                4 + this.txtTopMargin + (i * this.txtHeight)
            );
        }
    }

    /**
     * Calls the character's "do" method to execute 
     * its "this.funcToExec" function with 
     * the value "this.valForFunc".
     */
    exec() {
        this._character.do(this.funcToExec, this.valForFunc);
    }
}

/**
 * Class representing the node of an
 * algorithm corresponding to a loop output.
 * @extends Node
 */
class Break extends Node {
    /**
     * Create a break.
     * @param {HTMLCanvasElement} canvas 
     * @param {Node} node 
     * @param {Character} character 
     */
    constructor(canvas, node, character) {
        super(canvas, node, character);
    }

    /**
     * Draw the node on canvas context.
     */
    draw() {
        this._context.drawImage(
            this._symbol,
            ...this._symbolParam.break,
            (this.x - (this.size[0]/2|0)),
            (this.y - (this.height/2|0)),
            this.size[0],
            this.height
        );
    }

    /**
     * Interrupts execution of its parent loop node.
     */
    exec() {
        return;
    }
}