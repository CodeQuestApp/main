/* -- LevelAlgo -- */

/**
 * @file LevelAlgo.js
 * @description File that manages the implementation 
 * and interaction of the algorithmic level.
 */


/* Global variables */
let algo, graphicNode, dropZone, nodeParams;
let allNodes, character, positionMovedNode;
let movedNode, elmParentPrecedent, idDropZone, idMovedNode;
let algoExec = [];


/* Global constants */








// -- Problématique Algorithmique 1 -- 

/* Créer l'interface d'un niveau algorithmique */
function creationElementsGraphiques() {
    /* 
        Initialisation des variables 
    */ 
    allNodes = [];
    character = new Character(0,0,CASE_SIZE);

    /* 
        Création des éléments graphiques
        représentant les noeuds de l'algorithme
    */
    for (let i = 0; i < algo.nodes.length; i++) {
        /*
            Création des éléments graphiques
            représentant les noeuds à déplacer
        */
        // Création du noeud graphique et paramétrage de ses attributs
        graphicNode = document.createElement("canvas");
        graphicNode.width = algo.nodes[i].width + MARGIN;
        graphicNode.height = algo.nodes[i].height + MARGIN;
        graphicNode.setAttribute("class", "graphicNode");
        graphicNode.setAttribute("id", `gn-${algo.nodes[i].id}`);
        graphicNode.setAttribute("draggable",true);
        // Ajouter à allGraphicNodes le noeud graphique
        allGraphicNodes.appendChild(graphicNode);
    
        /* 
            Création des éléments graphiques 
            représentant les zones de drop
        */
        // Création de la zone de drop et paramétrage de ses attributs
        dropZone = document.createElement("div");
        dropZone.setAttribute("class", "dropZone");
        dropZone.setAttribute("id", `dz-${algo.nodes[i].id}`);
        dropZone.setAttribute("data-x",`${(algo.nodes[i].x - (DROP_ZONE_SIZE/2))}px`);
        dropZone.setAttribute("data-y",`${algo.nodes[i].y - (DROP_ZONE_SIZE/2)}px`);
        // Placer les dropzones sur l'interface
        dropZone.style.top = `${(algo.nodes[i].y - (DROP_ZONE_SIZE/2))}px`;
        dropZone.style.left = `${(algo.nodes[i].x - (DROP_ZONE_SIZE/2))}px`;
        // Ajouter à allGraphicDropZones la zone de drop
        allGraphicDropZones.appendChild(dropZone);
    }

    /* 
        Création des objets représentant
        les noeuds
    */
    for (let i = 0; i < allGraphicNodes.children.length; i++) {
        nodeParams = [
            allGraphicNodes.children[i],
            algo.nodes[i],
            character,
            CASE_SIZE
        ];
    
        switch (algo.nodes[i].type) {
            case "issue":
                allNodes.push(new Issue(...nodeParams));
                break;
            case "assignment":
                allNodes.push(new Assignment(...nodeParams));
                break;
            case "switch":
                allNodes.push(new Switch(...nodeParams));
                break;
            case "loop":
                allNodes.push(new Loop(...nodeParams));
                break;
            case "condition":
                allNodes.push(new Condition(...nodeParams));
                break;
            default:
                allNodes.push(new Break(...nodeParams));
                break;
        }
    }

    /*
        Placer le noeud représentant la
        problematique sur sa drop zone
    */
    allGraphicNodes.childNodes[0].removeAttribute("draggable");
    allGraphicDropZones.childNodes[0].appendChild(allGraphicNodes.childNodes[0]);
    
    /* 
        Dessiner tout les noeuds sur
        leurs éléments graphique respectif
    */
    for (let i = 0; i < allNodes.length; i++) {
        allNodes[i].draw();
        drawLinkBetweenNodes(mainContext, allNodes, allNodes[i]);
    }
}


// -- Problématique Algorithmique 2 -- 