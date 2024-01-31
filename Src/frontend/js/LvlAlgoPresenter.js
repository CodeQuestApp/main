/**
 * @class LvlAlgoPresenter
 * @description ...
 */
class LvlAlgoPresenter {
    constructor(model, view) {
        this._model = model;
        this._view = view;
        this._txtAnim;
        this._movedNodeId;
        this._movedNodeWrapperId;

        this._model.getData().then( data => {
            // Create all graphics nodes
            this._view.createAllGraphicsElms(data);

            // Create character
            this._model.character = new Character(
                0,
                this._view.map.height,
                this._view.caseSize, 
                data.arrivalCoordinate
            );
            

            // Create all nodes
            for (let i = 0; i < this._view.nbGraphicNodes; i++) {
                let node = transformDataFromBD(data.nodes[i]);
                this._model.addNode(
                    node.type, 
                    this._view.graphicNodes.children[i],
                    node
                );
            }

            this._model.drawAlgo();
           
            // Create txt animation and lauch them
            this._txtAnim = new TxtAnim(
                "txt",
                "txt__btn",
                data.txt.split("\n")
            )
            this._txtAnim.start();
            
            this._view.eraseMap();
            drawGrid(this._view.map, this._view.mapCtx, this._view.caseSize);
            this._model.createTreeNodes();

            // Lauch all events listener of the view
            this._view.bindDragStart(this.handleDragStart);
            this._view.bindDragOverNodes(this.handleDragOverNodes);
            this._view.bindDragOverZones(this.handleDragOverZones);
            this._view.bindDropZones(this.handleDropZones);
            this._view.bindDropNodes(this.handleDropNodes);
            this._view.bindClickStart(this.handleClickStart);
        })
        .catch(err => {
            console.log(err);
            window.location = "./index.html";
        }); 
        /* 
            PENSER A AFFICHER UN MESSAGE D'ERREUR /!\ 
        */
    }

    /**
     * @description ...
     * @param {*} val 
     */
    handleDragStart = (nodeId, nodeWrapperId) => {
        this._movedNodeId = nodeId;
        this._movedNodeWrapperId = nodeWrapperId;
    }

    /**
     * @description ...
     * @param {*} val 
     */
    handleDragOverNodes = val => {
        
    }

    /**
     * @description ...
     * @param {*} val 
     */
    handleDragOverZones = val => {
        if (!this._view.graphicNodesIsEmpty) {
            this._view.disableStartBtn();   
        }
    }

    /**
     * @description ...
     * @param {*} val 
     */
    handleDropZones = val => {
        if (this._view.addElementOnZone(val, this._movedNodeId, this._movedNodeWrapperId)) {
            if (this._view.graphicNodesIsEmpty) {
                this._view.enableStartBtn(); 
            }

            let zoneId = val.split("-")[1];
            let nodeId = this._movedNodeId.split("-")[1];

            if (zoneId !== nodeId) {
                this._view.updateDropZoneId(zoneId, nodeId);
                this._model.replaceNode(zoneId, nodeId);
            }
        };   
    }
    
    /**
     * @description ...
     * @param {*} val 
     */
    handleDropNodes = val => {
        if (this._view.graphicNodesIsEmpty) {
            this._view.eraseMap();
            drawGrid(this._view.map, this._view.mapCtx, this._view.caseSize);
            this._model.character.resetPosition();
        }

        this._view.addElementOnNodesWrapper(
            this._movedNodeId, 
            this._movedNodeWrapperId
        );

    }

    /**
     * 
     * @param {*} val 
     */
    handleClickStart = val => {
        this._view.disableStartBtn();
        this._model.startAlgoExec();
    }
}

const app = new LvlAlgoPresenter(
    new LvlAlgoModel(), 
    new LvlAlgoView()
);
