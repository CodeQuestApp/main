/**
 * @class LvlAlgoModel
 * @description ...
 */
class LvlAlgoModel {
    // Privates properties
    #allNodes; #treeOfNode;
    #mainCanvas; #mainContext;
    #character;

    constructor() {
        this.#mainCanvas = document.getElementById("draw");
        this.#mainContext = this.#mainCanvas.getContext("2d");

        this.#mainCanvas.width = window.innerWidth;
        this.#mainCanvas.height = window.innerHeight;

        this.#allNodes = [];
        this.#treeOfNode = null;
        this.#character = null;
        this.algo;
    }

    get character() { return this.#character }
    set character(val) { this.#character = val }

    /**
     * @description fetch data from backend
     * and return them.
     * @returns promise
     */
    getData() {
        return fetch("./backend/getNodes.php?id="+ window.location.search.substring(4), {method: 'get'})
                .then(res => res.json())
    }

    /**
     * @description 
     */
    createTreeNodes() {
        for (let i = 0; i < this.#allNodes.length ; i++) {
            if (this.#allNodes[i].output[0].length !== 0) {
                for (let z = 0; z < this.#allNodes[i].output[0].length; z++) {
                    this.#allNodes[i].addNode(this.#allNodes[this.#allNodes[i].output[0][z]]);
                }
            }
        }

        this.#treeOfNode = this.#allNodes[0];
    }

    /**
     * @description Traverses the tree of 
     * nodes and calls their "exec" method.
     */
    startAlgoExec() {
        this.#treeOfNode.exec();
    }

    /**
     * @description Add node.
     * @param {String} type 
     * @param {HTMLCanvasElement} graphicElm 
     * @param {Array} data 
     * @param {Character} character 
     */
    addNode(type, graphicElm, data) {
        switch (type) {
            case "issue":
                this.#allNodes.push(new Issue(graphicElm, data, this.character));
                break;
            case "assignment":
                this.#allNodes.push(new Assignment(graphicElm, data, this.character));
                break;
            case "switch":
                this.#allNodes.push(new Switch(graphicElm, data, this.character));
                break;
            case "loop":
                this.#allNodes.push(new Loop(graphicElm, data, this.character));
                break;
            case "condition":
                this.#allNodes.push(new Condition(graphicElm, data, this.character));
                break;
            default:
                this.#allNodes.push(new Break(graphicElm, data, this.character));
                break;
        }
    }

    /**
     * @description Draw all nodes on their 
     * respective graphic elements, as well 
     * as links between nodes..
     */
    drawAlgo() {
        for (let i = 0; i < this.#allNodes.length; i++) {
            this.#allNodes[i].draw();

            drawLinkBetweenNodes(
                this.#mainContext, 
                this.#allNodes, 
                this.#allNodes[i]
            );
        }
    }

    /**
     * @description ...
     * @param {String} idDropZone 
     * @param {String} idMovedNode 
     */
    replaceNode(idDropZone, idMovedNode) {
        let positionMovedNode;
        /*
            Récupérer la position dans le tableau noeudAlgo
            du noeud dont son id est idMovedNode
        */
        for (let i = 0; i < this.#allNodes.length; i++) {
            if (this.#allNodes[i].id === idMovedNode) {
                positionMovedNode = i;
            }
            
        }
        
        /* 
            Remplacer dans l'arbre le noeud par
            le movedNode
        */
        this.#treeOfNode.replaceNode(idDropZone,this.#allNodes[positionMovedNode]);
    }

}