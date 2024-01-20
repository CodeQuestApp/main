/**
 * Class representing the node of an
 * algorithm corresponding to a loop.
 * @extends Node
 */
class Loop extends Node {
    /**
     * Create a loop.
     * @param {HTMLCanvasElement} canvas 
     * @param {Node} node 
     * @param {Character} character 
     */
    constructor(canvas, node,character) {
        super(canvas, node, character);                                       
    }

    /**
     * Determines whether the node is composed of.
     * @returns {Boolean} Is composed or not.
     */
    isComposed() {
        return true; 
    }

    /**
     * Adds a node to its child node array "this._myNodes".
     * @param {Node} node 
     */
    addNode(node) {
        this._myNodes.push(node);
    }

    /**
     * Replaces the "node" node with nodes 
     * whose id is "idOfNode".
     * @param {String} idOfNode 
     * @param {Node} node 
     * @returns {Node} The replaced node.
     */
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
            if (this._myNodes[id1].isComposed() === this._myNodes[id2].isComposed()) {
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
        
        return res;
    }

    /**
     * Draw the node on canvas context.
     */
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

    /**
     * Calls a number of times "this.valForFunc", 
     * the "exec" method of its child nodes.
     */
    exec() {
        for (let i = 0; i < this.valForFunc; i++) {
            this._myNodes.forEach(childNode => childNode.exec());
        }
    }
}

/**
 * Class representing the node of an
 * algorithm corresponding to an issue.
 * @extends Node
 */
class Issue extends Node {
    /**
     * Create an issue.
     * @param {HTMLCanvasElement} canvas 
     * @param {Node} node 
     * @param {Character} character 
     */
    constructor(canvas, node, character) {
        super(canvas, node, character);
    }

    /**
     * Determines whether the node is composed of.
     * @returns {Boolean} Is composed or not.
     */
    isComposed() {
        return true; 
    }

    /**
     * Adds a node to its child node array "this._myNodes".
     * @param {Node} node 
     */
    addNode(node) {
        this._myNodes.push(node);
    }

    /**
     * Replaces the "node" node with nodes 
     * whose id is "idOfNode".
     * @param {String} idOfNode 
     * @param {Node} node 
     * @returns {Node} The replaced node.
     */
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

        if (id1 > -1 && id2 > -1) {
            if (this._myNodes[id1].isComposed() == this._myNodes[id2].isComposed()) {
                let aux = this._myNodes[id1];
                this._myNodes[id1] = this._myNodes[id2];
                this._myNodes[id2] = aux; 
            } 
        } else if (id1 == -1 && id2 > -1) {
            this._myNodes.forEach(n => {
                n.replaceNode(node.id, this._myNodes[id2]);
            })
            this._myNodes[id2] = node;
        } else if (id2 == -1) {
            let res;
            this._myNodes.forEach(n => {
                res = n.replaceNode(idOfNode, node);
                if (res != null) {
                    this._myNodes[id1] = res;
                }
            });
        }
    }

    /**
     * Draw the node on canvas context.
     */
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

    /**
     * Calls the "exec" method of its child nodes.
     */
    exec() {
        if (this._myNodes.length > 0) {
            this._myNodes.forEach(nodeChild => nodeChild.exec());
        }
    }
}

/**
 * Class representing the node of an
 * algorithm corresponding to a condition.
 * @extends Node
 */
class Condition extends Node {
    /**
     * Create an condition.
     * @param {HTMLCanvasElement} canvas 
     * @param {Node} node 
     * @param {Character} character 
     */
    constructor(canvas, node, character) {
        super(canvas, node, character);
    }

    /**
     * Determines whether the node is composed of.
     * @returns {Boolean} Is composed or not.
     */
    isComposed() {
        return true; 
    }

    /**
     * Adds a node to its child node array "this._myNodes".
     * @param {Node} node 
     */
    addNode(node) {
        this._myNodes.push(node);
    }

    /**
     * Deletes the child node at position "index" 
     * in its node array "this._myNodes".
     * @param {Number} index 
     */
    removeNode(index) {
        this._myNodes.splice(index,1);
    }

    /**
     * Draw the node on canvas context.
     */
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

    /**
     * Not currently implemented.
     */
    exec() {
        return;
    }
}

/**
 * Class representing the node of an
 * algorithm corresponding to a switch.
 * @extends Node
 */
class Switch extends Node {
    /**
     * Create an condition.
     * @param {HTMLCanvasElement} canvas 
     * @param {Node} node 
     * @param {Character} character 
     */
    constructor(canvas, node, character) {
        super(canvas, node, character);
    }

    /**
     * Determines whether the node is composed of.
     * @returns {Boolean} Is composed or not.
     */
    isComposed() {
        return true; 
    }

    /**
     * Adds a node to its child node array "this._myNodes".
     * @param {Node} node 
     */
    addNode(node) {
        this._myNodes.push(node);
    }

    /**
     * Draw the node on canvas context.
     */
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

    /**
     * Not currently implemented.
     */
    exec() {
        return;
    }
}