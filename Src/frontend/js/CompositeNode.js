/* 
    -- Node Compose --
*/

/**
 * @class Loop
 * @description Represents the node of 
 * an algorithm corresponding to a loop.
 */
class Loop extends Node {
    constructor(canvas, node, perso, caseSize) {
        super(canvas, node, perso, caseSize);

        this.allFunc = {
            "repeat": {
                functionName: "repeat",
                args: this._val
            }
        }                                         
    }

    repeat(arg) {
        for (let i = 0; i < arg; i++) {
            this._myNodes.forEach(childNode => childNode.exec());
        }
    }

    jeSuisComposee() {
        return true; 
    }

    addNode(node) {
        this._myNodes.push(node);
    }

    replaceNode(idOfNode, node) {
        let id1 = -1;
        let id2 = -1;
        let res = null;
        for (let i = 0; i < this._myNodes.length; i++) {
            if (this._myNodes[i].id === node.id) {
                id1 = i;
            }
        }

        for (let i = 0; i < this._myNodes.length; i++) {
            if (this._myNodes[i].id === idOfNode) {
                id2 = i;
            }
        }

        if (id1 > -1 && id2 > -1) {
            if (this._myNodes[id1].jeSuisComposee() === this._myNodes[id2].jeSuisComposee()) {
                let aux = this._myNodes[id1];
                this._myNodes[id1] = this._myNodes[id2];
                this._myNodes[id2] = aux;
            } 
        } else if (id1 == -1 && id2 > -1) {
            res = this._myNodes[id2];
            this._myNodes[id2] = node;
        } else if (id1 == -1 && id2 == -1) {
            this._myNodes.forEach(n => n.replaceNode(idOfNode, node));
        }
        console.log(this._myNodes);
        return res;
    }

    draw() {
        this._context.drawImage(
            this._symbol, 
            ...this._symbolParam.loop, 
            4, 4, 
            this.size[0], 
            this.height
        );
        
        for (let i = 0; i < this.txt[0].length; i++) {
            this._context.fillText(
                `${this.txt[0][i]}`, 
                8 + this.txtLeftMargin + this.symbolParam.loop[3],
                4 + this.txtTopMargin  + (i * this.txtHeight)
            );
        }
    }

    exec() {
        console.log("repeat");
        const { functionName, args } = this.allFunc[this.funcToExec];
        return this[functionName](args);
    }
}

/**
 * @class Issue
 * @description Represents the node of 
 * an algorithm corresponding to an issue.
 */
class Issue extends Node {
    constructor(canvas, node, perso, caseSize) {
        super(canvas, node, perso, caseSize);
        
        this.allFunc = {
            "move": {
                functionName: "move",
                args: this._val
            },
            "turn": {
                functionName: "turn",
                args: this._val
            }
        }
    }

    jeSuisComposee() {
        return true; 
    }

    addNode(node) {
        this._myNodes.push(node);
    }

    replaceNode(idOfNode, node) {
        let id1 = -1;
        let id2 = -1;
        for (let i = 0; i < this._myNodes.length; i++) {
            if (this._myNodes[i].id === node.id) {
                id1 = i;
            }
        }

        for (let i = 0; i < this._myNodes.length; i++) {
            if (this._myNodes[i].id === idOfNode) {
                id2 = i;
            }
        }

        console.log(id1, id2);
        if (id1 > -1 && id2 > -1) {
            console.log("change");
            if (this._myNodes[id1].jeSuisComposee() == this._myNodes[id2].jeSuisComposee()) {
                let aux = this._myNodes[id1];
                this._myNodes[id1] = this._myNodes[id2];
                this._myNodes[id2] = aux; 
            } 
        } else if (id1 == -1 && id2 > -1) {
            console.log("new");
            this._myNodes.forEach(n => {
                n.replaceNode(node.id, this._myNodes[id2]);
            })
            this._myNodes[id2] = node;
        } else if (id2 == -1) {
            console.log("no");
            let res;
            this._myNodes.forEach(n => {
                res = n.replaceNode(idOfNode, node);
                if (res != null) {
                    this._myNodes[id1] = res;
                }
            });
        }
        console.log(this._myNodes);
    }

    exec() {
        console.log("Démarrage algo");
        if (this._myNodes.length > 0) {
            this._myNodes.forEach(nodeChild => nodeChild.exec());
        }
    }

    draw() {
        let dataSize = 0;

        if (this.size[0] > 0) {
            dataSize = this.size[0] + (this.symbolParam.leftBracket[2] *2);
            this.drawBrackets(
                this.height, 
                (
                    this.x - ((this.symbolParam.leftBracket[2] * 2) 
                    + this.size[0] + ((this.size[1])/2))
                )|0, 
                (
                    this.x - (this.symbolParam.leftBracket[2] 
                    + ((this.size[1])/2))
                )|0, 
                (this.y - (this.height/2))|0
            );
            for (let i = 0; i < this.txt[0].length; i++) {
                this._context.fillText(
                    `${this.txt[0][i]}`, 
                    (
                        this.x - (this.symbolParam.leftBracket[2] 
                        + this.size[0] + ((this.size[1])/2)) 
                        + this.txtLeftMargin
                    )|0, 
                    (this.y - 10 + (i * this.txtHeight))|0
                );
            }
        }

        this._context.strokeRect(
            4 + dataSize, 
            4, 
            (this.size[1])|0, 
            this.height
        );

        for (let i = 0; i < this.txt[1].length; i++) {
            this._context.fillText(
                `${this.txt[1][i]}`, 
                4 + this.txtLeftMargin, 
                4 + this.txtTopMargin + (i * this.txtHeight)
            );
        }

        if (this.size[2] > 0) {
            this.drawBrackets(
                this.height, 
                (this.x + (this.size[1])/2)|0, 
                (
                    this.x + (this.symbolParam.leftBracket[2] 
                    + this.size[2] + ((this.size[1])/2))
                )|0, 
                (this.y - (this.height/2))|0
            );
            for (let i = 0; i < this.txt[2].length; i++) {
                this._context.fillText(
                    `${this.txt[2][i]}`, 
                    (
                        this.x + (this.symbolParam.leftBracket[2] 
                        + ((this.size[1])/2)) + this.txtLeftMargin
                    )|0, 
                    (this.y - 10 + (i * this.txtHeight))|0
                );
            }
        }
    }
}

/**
 * @class Condition
 * @description Represents the node of 
 * an algorithm corresponding to a condition.
 */
class Condition extends Node {
    constructor(canvas, node, perso, caseSize) {
        super(canvas, node, perso, caseSize);
        
        this.allFunc = {};
    }

    jeSuisComposee() {
        return true; 
    }

    addNode(node) {
        this._myNodes.push(node);
    }

    removeNode(index) {
        this._myNodes.splice(index,1);
    }

    draw() {
        this._context.strokeRect(
            (this.x - ((this.width)/2))|0, 
            (this.y - (this.height/2))|0, 
            this.width|0, 
            this.height
        );

        for (let j = 0; j < this.allCoord.length; j++) {
            for (let i = 0; i < this.txt[j].length; i++) {
                this._context.fillText(
                    `${this.txt[j][i]}`, 
                    (this.allCoord[j] + this.txtLeftMargin)|0, 
                    (((this.y - (this.height/2))|0) 
                        + this.txtTopMargin 
                        + (i * this.txtHeight)
                    )
                );
            }
            if (j < this.allCoord.length -1) {
                this.drawLine(
                    this.allCoord[j+1],
                    ((this.y - (this.height/2))|0), 
                    this.allCoord[j+1],
                    ((this.y + (this.height/2))|0)
                );
            }
        }

        this.drawCorner(
            this.height,
            (this.x - (((this.width)/2) 
                + (this.symbolParam.leftCorner[2] - 2))
            ),
            this.x + (((this.width)/2) - 2),
            this.y
        );
    }
}

/**
 * @class Switch
 * @description Represents the node of 
 * an algorithm corresponding to a switch.
 */
class Switch extends Node {
    constructor(canvas, node, perso, caseSize) {
        super(canvas, node, perso, caseSize);
        
        this.allFunc = {};
    }

    jeSuisComposee() {
        return true; 
    }

    addNode(node) {
        this._myNodes.push(node);
    }

    calculWidth(arrayOfSize) {
        let width = (
            arrayOfSize.reduce((a,b) => a + b, 0) 
            - arrayOfSize[arrayOfSize.length - 1]
        );

        if (arrayOfSize[arrayOfSize.length - 1] > width) {
            width = arrayOfSize[arrayOfSize.length - 1];
        }
        return width;
    }

    calculClickArea(arrayOfSize) {
        let clickArea = [];
        for (let i = 0; i < arrayOfSize.length -1; i++) {
            clickArea.push(arrayOfSize[i])
        }
        return clickArea;
    }

    draw() {
        this._context.strokeRect(
            (this.x - ((this.width)/2))|0, 
            (this.y - (this.height/2))|0, 
            this.width,
            this.height
        );

        for (let j = 0; j < this.allCoord.length; j++) {
            for (let i = 0; i < this.txt[j].length; i++) {
                this._context.fillText(
                    `${this.txt[j][i]}`, 
                    this.allCoord[j] + this.txtLeftMargin, 
                    (
                        this.y + this.txtTopMargin 
                        + (i * this.txtHeight)
                    )
                );
            }
            if (j < this.allCoord.length -1) {
                this.drawLine(
                    this.allCoord[j+1], 
                    this.y, 
                    this.allCoord[j+1], 
                    (this.y + (this.height/2))|0
                );
            }
        }

        for (let i = 0; i < this.txt[this.txt.length-1].length; i++) {
            this._context.fillText(
                `${this.txt[this.txt.length-1][i]}`, 
                (
                    this.x - (this.size[this.txt.length-1]/2) 
                    + this.txtLeftMargin
                )|0, 
                this.y - 10
            );
        }

        this.drawCorner(
            this.height,
            (
                this.x - (((this.width)/2) 
                + this.symbolParam.leftCorner[2] - 2)
            ),
            this.x + (((this.width)/2) - 2),
            this.y
        );

        this.drawLine(
            (
                this.x - (((this.width)/2) 
                + this.symbolParam.leftCorner[2] - 2)
            )|0, 
            this.y, 
            (
                this.x + ((this.width)/2) 
                + this.symbolParam.leftCorner[2] - 2
            )|0, 
            this.y
        );
    }

    exec() {
        const { functionName, args } = this.allFunc[this.funcToExec];
        return this[functionName](args);
    }
}