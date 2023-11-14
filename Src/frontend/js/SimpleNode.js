/* 
    -- Node Simple --
*/

/**
 * @class Assignment
 * @description Represents the node of 
 * an algorithm corresponding to an assignment.
 */
class Assignment extends Node {
    constructor(canvas, node, perso, caseSize) {
        super(canvas, node, perso, caseSize);

        this.allFunc = {
            "move": {
                functionName: "move",
                args: this.valForFunc
            },
            "turn": {
                functionName: "turn",
                args: this.valForFunc
            }
        }
    }

    async turn(orientation) {
        await this.move();
        console.log("turn");
        if (orientation === "right") {
            this._perso.or = (this._perso.or + 1) % 4;
        } else if (orientation === "left") {
            this._perso.or = (this._perso.or - 1) % 4;
        }
    }

    
    async move(val) {
        return new Promise((resolve) => {
            
            const previousMove = movePromise;
            console.log(`move ${val}`);

            movePromise = previousMove.then(async () => {
                for (let i = 0; i < val; i++) {
                    await wait(150);
                    switch (this._perso.or) {
                        case 3:
                            this._perso.x = this._perso.x - this.caseSize;
                            break;
                        case 2:
                            this._perso.y = this._perso.y + this.caseSize;
                            break;
                        case 1:
                            this._perso.x = this._perso.x + this.caseSize;
                            break;
                        default:
                            this._perso.y = this._perso.y - this.caseSize;
                            break;
                    }
                    this._mapCtx.fillRect(this._perso.x, this._perso.y, this.caseSize, this.caseSize);
                }
            }).then(() => {
                resolve();
            });

        })
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

    exec() {
        const { functionName, args } = this.allFunc[this.funcToExec];
        return this[functionName](args);
    }
}

/**
 * @class Break 
 * @description Represents the node of 
 * an algorithm corresponding to a loop output.
 */
class Break extends Node {
    constructor(canvas, node, perso, caseSize) {
        super(canvas, node, perso, caseSize);
        
        this.allFunc = {};
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
}