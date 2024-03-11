/**
 * @class LvlAlgoView
 * @description ...
 */
class LvlAlgoView {
    constructor() {
        this._allGraphicNodes = document.getElementById("graphic-nodes__wrapper");
        this._allGraphicDropZones = document.getElementById("graphic-dropzone__wrapper");
        this._startAnimBtn = document.getElementById("start");

        this._map = document.getElementById("map");
        this._mapCtx = map.getContext("2d");

        this._map.width = window.innerWidth*.3;
        this._map.height = window.innerHeight;
        this._map.lineWidth = 1;

        this._margin = 8;
        this._dropZoneSize = window.innerWidth*.035; 
        this._caseSize = this._map.width*.1;
    }

    get nbGraphicNodes() { return this._allGraphicNodes.children.length }
    get graphicNodesIsEmpty() { return this._allGraphicNodes.children.length === 0 }
    get graphicNodes() { return this._allGraphicNodes }
    get map() { return this._map }
    get caseSize() { return this._caseSize }
    get mapCtx() { return this._mapCtx }

    /**
     * @description ...
     */
    eraseMap() {
        eraseCanvas(this._map, this._mapCtx);
    }

    resizeMap() {
        this._map.width = window.innerWidth*.3;
        this._map.height = window.innerHeight;
        this._caseSize = this._map.width*.1;
    }

    /**
     * @description ...
     */
    enableStartBtn() {
        if (this._startAnimBtn.hasAttribute("disabled")) {
            this._startAnimBtn.removeAttribute("disabled");
        }
    }

    /**
     * 
     */
    disableStartBtn() {
        if (!this._startAnimBtn.hasAttribute("disabled")) {
            this._startAnimBtn.setAttribute("disabled", true);   
        }
    }

    /**
     * 
     * @param {*} dropZone 
     * @param {*} elm 
     */
    centerDropZone(dropZone, elm) {
        let width = Number(elm.getAttribute("data-w"));
        let height = Number(elm.getAttribute("data-h"));
        
        dropZone.style.left = `${(Number(dropZone.style.left.split("px")[0])+18) - (width/2)}px`;
        dropZone.style.top = `${(Number(dropZone.style.top.split("px")[0])+18) - (height/2)}px`;
        dropZone.style.outline = "2px solid #1c1c1c";
    }

    /**
     * @description ...
     */
    addElementOnNodesWrapper(nodeId, nodeWrapperId) {
        let currentNode = document.getElementById(nodeId);
        let currentNodeWrapper = document.getElementById(nodeWrapperId);

        currentNodeWrapper.style.left = currentNodeWrapper.getAttribute("data-x");
        currentNodeWrapper.style.top = currentNodeWrapper.getAttribute("data-y");
        currentNodeWrapper.style.outline = "2px solid #1c1c1c";
        
        this._allGraphicNodes.appendChild(currentNode);
    }

    /**
     * 
     * @param {*} zoneId 
     * @param {*} elm 
     * @returns 
     */
    addElementOnZone(zoneId, nodeId, nodeWrapperId) {
        let dropZone = document.getElementById(zoneId);
        let currentNode = document.getElementById(nodeId);
        let currentNodeWrapper = document.getElementById(nodeWrapperId);
        
        if (dropZone.children.length === 0) {
            /*
                Recentrer la dropZone en fonction de la taille
                du noeud qu'elle contient
                ( AJUSTEMENT GRAPHIQUE )
            */
            if (nodeWrapperId !== zoneId) {
                currentNodeWrapper.style.left = currentNodeWrapper.getAttribute("data-x");
                currentNodeWrapper.style.top = currentNodeWrapper.getAttribute("data-y");
                if (currentNodeWrapper.id !== "graphic-nodes__wrapper") {
                    currentNodeWrapper.style.outline = "2px solid #1c1c1c";
                }
            }
            this.centerDropZone(dropZone, currentNode);
            dropZone.appendChild(currentNode);
            return true;   
        }
        return false;
    }

    /**
     * 
     * @param {*} zoneId 
     * @param {*} nodeId 
     */
    updateDropZoneId(zoneId, nodeId) {
        document.getElementById(`dz-${zoneId}`).setAttribute("id","dz-x");
        document.getElementById(`dz-${nodeId}`).setAttribute("id",`dz-${zoneId}`);
        document.getElementById("dz-x").setAttribute("id",`dz-${nodeId}`);
    }

    /**
     * @description ...
     */
    bindDragOverNodes(handlerDragOverNodes) {
        this._allGraphicNodes.addEventListener("dragover", function(e) {
            e.preventDefault();
            handlerDragOverNodes(e);
        });
    }

    /**
     * @description ...
     */
    bindDragOverZones(handlerDragOverZones) {
        for (const dropZone of this._allGraphicDropZones.children) {
            dropZone.addEventListener("dragover", function(e) {
                e.preventDefault();
                e.stopPropagation();
                handlerDragOverZones(e);
            })
        }
    }

    /**
     * @description ...
     */
    bindDragStart(handlerDragStart) {
        for (const node of this._allGraphicNodes.children) {
            node.addEventListener("dragstart", function(e) {
                e.stopPropagation();
                e.stopImmediatePropagation();
                handlerDragStart(this.id, this.parentElement.id);
            })
        }
    }

    /**
     * @description ...
     */
    bindDropNodes(handlerDropNodes) {
        this._allGraphicNodes.addEventListener("drop", function(e) {
            e.preventDefault();
            e.stopPropagation();
            handlerDropNodes(e);
        });
    }

    /**
     * @description ...
     */
    bindDropZones(handlerDropZones) {
        for (const dropZone of this._allGraphicDropZones.children) {
            dropZone.addEventListener("dragover", (e) => {
                dropZone.style.transform = "scale(1.12)";
                dropZone.style.filter = "brightness(1.4)";
            })
            dropZone.addEventListener("dragleave", (e) => {
                dropZone.style.transform = "scale(1)";
                dropZone.style.filter = "brightness(1)";
            })
            dropZone.addEventListener("drop", function(e) {
                e.preventDefault(); 
                e.stopPropagation();
                if (dropZone.children.length === 0) {
                    handlerDropZones(e);
                }
                dropZone.style.transform = "scale(1)";
                dropZone.style.filter = "brightness(1)";
            });

        }
    }

    /**
     * @description ...
     * @param {*} handerClickStart 
     */
    bindClickStart(handerClickStart) {
        this._startAnimBtn.addEventListener("click", function(e) {
            handerClickStart(e);
        })
    }   

    /**
     * @description ...
     * @param {*} width 
     * @param {*} height 
     * @param {*} id 
     * @param {*} type 
     */
    createGraphicNode(width, height, id, type) {
        // Création du noeud graphique et paramétrage de ses attributs
        let graphicNode = document.createElement("canvas");
        if (type === "loop") {
            graphicNode.width = width + 80 + this._margin;
            graphicNode.height = height + 10 + this._margin;
        } else {
            graphicNode.width = width + this._margin;
            graphicNode.height = height + this._margin;
        }

        graphicNode.setAttribute("class", "graphicNode");
        graphicNode.setAttribute("id", `gn-${id}`);
        graphicNode.setAttribute("data-w", `${width}`);
        graphicNode.setAttribute("data-h", `${height}`);
        graphicNode.setAttribute("draggable",true);

        // Ajouter à allGraphicNodes le noeud graphique
        this._allGraphicNodes.appendChild(graphicNode);
    }

    /**
     * @description ...
     * @param {*} x 
     * @param {*} y 
     * @param {*} id 
     */
    createGraphicDropZone(x, y, id) {
        // Création de la zone de drop et paramétrage de ses attributs
        let dropZone = document.createElement("div");
        dropZone.setAttribute("class", "dropZone notdrop");
        dropZone.setAttribute("id", `dz-${id}`);
        dropZone.setAttribute("data-x",`${(x - (this._dropZoneSize/2))}px`);
        dropZone.setAttribute("data-y",`${y - (this._dropZoneSize/2)}px`);

        // Placer les dropzones sur l'interface
        dropZone.style.top = `${(y - (this._dropZoneSize/2))}px`;
        dropZone.style.left = `${(x - (this._dropZoneSize/2))}px`;
        dropZone.style.minWidth = `${this._dropZoneSize}px`;
        dropZone.style.minHeight = `${this._dropZoneSize}px`;
        // Ajouter à allGraphicDropZones la zone de drop
        this._allGraphicDropZones.appendChild(dropZone);
    }

    /**
     * @description ...
     * @param {*} data 
     */
    createAllGraphicsElms(data) {
        for (let i = 0; i < data.nodes.length; i++) {
            let node = transformDataFromBD(data.nodes[i]);
            this.createGraphicNode(
                node.width,
                node.height,
                node.id,
                node.type
            )
        
            this.createGraphicDropZone(
                node.x,
                node.y,
                node.id
            )
        } 
    }
}
