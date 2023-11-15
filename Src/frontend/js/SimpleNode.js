/* 
    -- Node Simple --
*/

/**
 * @class Assignment
 * @description Represents the node of 
 * an algorithm corresponding to an assignment.
 */
class Assignment extends Node {
    constructor(canvas, node) {
        super(canvas, node);
    }

    draw() {
        this._context.strokeRect(
            4, 4, 
            (this.size[0])|0, 
            this.height
        );

        for (let i = 0; i < this.txt[0].length; i++) {
            this._context.fillText(
                `${this.txt[0][i]}`, 
                4 + this.txtLeftMargin, 
                4 + this.txtTopMargin + (i * this.txtHeight)
            );
        }
    }

    exec(character) {
        character.do(this.funcToExec, this.valForFunc);
    }
}

/**
 * @class Break 
 * @description Represents the node of 
 * an algorithm corresponding to a loop output.
 */
class Break extends Node {
    constructor(canvas, node) {
        super(canvas, node);
    }

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

    exec(character) {
        return;
    }
}