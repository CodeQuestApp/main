/* -- LevelAlgo -- */

/**
 * @file LevelAlgo.js
 * @description File that manages the implementation 
 * and interaction of the algorithmic level.
 */


/* Global variables */
let algo, graphicNode, dropZone, nodeParams;
let allNodes, character, positionMovedNode;
let movedNode, movedNodeWrapper, idDropZone, idMovedNode;
let algoExec = [];


/* Global constants */
const allGraphicNodes = document.getElementById("graphic-nodes__wrapper");
const allGraphicDropZones = document.getElementById("graphic-dropzone__wrapper");

const mainCanvas = document.getElementById("main");
const mainContext = mainCanvas.getContext("2d");
const map = document.getElementById("map");
const mapCtx = map.getContext("2d");
const MARGIN = 8;
 // ====> A changer ne taille relative par rapport à l'écran <=====
const DROP_ZONE_SIZE = 42; // ====> A changer ne taille relative par rapport à l'écran <=====


// Paramétrage de mainCanvas et map
mainCanvas.width = window.innerWidth*.7;
mainCanvas.height = window.innerHeight;
map.width = window.innerWidth*.3;
map.height = window.innerHeight;
map.lineWidth = 1;

const CASE_SIZE = map.width*.1;


// -- Problématique Algorithmique 1 -- 

/* Créer l'interface d'un niveau algorithmique */
function creationElementsGraphiques() {
    /* 
        Initialisation des variables 
    */ 
    allNodes = [];
    character = new Character(0,map.height,CASE_SIZE, algo.arrivalCoordinate);
    //console.log(map.height);

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
        switch (algo.nodes[i].type) {
            case "issue":
                allNodes.push(new Issue(allGraphicNodes.children[i],algo.nodes[i], character));
                break;
            case "assignment":
                allNodes.push(new Assignment(allGraphicNodes.children[i],algo.nodes[i], character));
                break;
            case "switch":
                allNodes.push(new Switch(allGraphicNodes.children[i],algo.nodes[i], character));
                break;
            case "loop":
                allNodes.push(new Loop(allGraphicNodes.children[i],algo.nodes[i], character));
                break;
            case "condition":
                allNodes.push(new Condition(allGraphicNodes.children[i],algo.nodes[i], character));
                break;
            default:
                allNodes.push(new Break(allGraphicNodes.children[i],algo.nodes[i], character));
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

/* Interpréter les réponses de l'utilisateur */
function interpreterReponsesUtilisateur() {
    /* 
        Construire un arbre de départ
    */
    console.log(allNodes);
    for (let i = 0; i < allNodes.length ; i++) {
        if (allNodes[i].output[0].length !== 0) {
            for (let z = 0; z < allNodes[i].output[0].length; z++) {
                allNodes[i].addNode(allNodes[allNodes[i].output[0][z]]);
            }
        }
    }

    /*
        Déterminer quel graphicNode est
        déplacé par l'utilisateur
    */
    for (const node of allGraphicNodes.children) {
        node.addEventListener("dragstart", function(e) {
            e.stopPropagation();
            movedNode = this;
            movedNodeWrapper = movedNode.parentElement;
        })
    }

    /*
        Déterminer quel graphicNode est replacé 
        dans son conteneur de départ
    */
    allGraphicNodes.addEventListener("dragover", function(e) { e.preventDefault()});
    allGraphicNodes.addEventListener("drop", function(a) {
        a.preventDefault();
        a.stopPropagation();

        if (allGraphicNodes.children.length === 0) {
            /* 
                Remettre à zéro la position
                du character
            */
            character.resetPosition();
            
            /*
                Effacer la map
            */
            eraseCanvas(map, mapCtx);

            /*
                Redessiner la grille sur
                la map
            */
            drawGrid(map, mapCtx, CASE_SIZE);
        }

        /*
            Repositionner la dropZone dont
            l'élément qu'il contenait vient
            d'être placé dans allGraphicNodes
            ( AJUSTEMENT GRAPHIQUE )
        */
        if (movedNodeWrapper.id !== "z0" && movedNodeWrapper.id !== this.id) {
            movedNodeWrapper.style.left = movedNodeWrapper.getAttribute("data-x");
            movedNodeWrapper.style.top = movedNodeWrapper.getAttribute("data-y");
        }

        /*
            Ajouter le movedNode dans
            le allGraphicNodes
        */
        this.appendChild(movedNode);
    })
    

    /*
        Déterminer quel drop zone a reçu un noeud graphique
    */
    for (const dropZone of allGraphicDropZones.children) {
        
        dropZone.addEventListener("dragover", function(e) {
            e.preventDefault();
            e.stopPropagation();
        })

        dropZone.addEventListener("drop", function(e) {
            e.preventDefault(); 
            e.stopPropagation();

            /*
                Vérifier si il n'y a pas déjà un graphicNode
                dans la dropZone.
            */
            if (this.children.length === 0) {
                /*
                    Recentrer la dropZone en fonction de la taille
                    du noeud qu'elle contient
                    ( AJUSTEMENT GRAPHIQUE )
                */
                if (movedNodeWrapper.id !== this.id) {
                    movedNodeWrapper.style.left = movedNodeWrapper.getAttribute("data-x");
                    movedNodeWrapper.style.top = movedNodeWrapper.getAttribute("data-y");
                }

                this.style.left = `${(Number(this.style.left.split("px")[0])+18) - (movedNode.clientWidth/2)}px`;
                this.style.top = `${(Number(this.style.top.split("px")[0])+18) - (movedNode.clientHeight/2)}px`;

                /*
                    Ajouter le movedNode dans 
                    la dropZone
                */
                this.appendChild(movedNode);

                /* 
                    Récupérer l'id du movedNode (graphique)
                    et l'id de la dropZone
                */
                idDropZone = this.id.split("-")[1];
                idMovedNode = movedNode.id.split("-")[1];
                
                if (idDropZone !== idMovedNode) {
                    /*
                        Mette à jour l'id de la dropZone
                    */
                    document.getElementById(`dz-${idDropZone}`).setAttribute("id","dz-x");
                    document.getElementById(`dz-${idMovedNode}`).setAttribute("id",`dz-${idDropZone}`);
                    document.getElementById("dz-x").setAttribute("id",`dz-${idMovedNode}`);

                    /*
                        Récupérer la position dans le tableau noeudAlgo
                        du noeud dont son id est idMovedNode
                    */
                    for (let i = 0; i < allNodes.length; i++) {
                        if (allNodes[i].id === idMovedNode) {
                            positionMovedNode = i;
                        }
                        
                    }
                    
                    /* 
                        Remplacer dans l'arbre le noeud par
                        le movedNode
                    */
                    allNodes[0].replaceNode(idDropZone,allNodes[positionMovedNode]);
                }
            }
            
            /*
                Vérifier si tout les noeuds graphiques
                ont été positionnés
            */
            if (allGraphicNodes.children.length === 0) {
                /* 
                    Si oui,
                    Démarrer l'exécution de l'algorithme
                */
                allNodes[0].exec();

                /* 
                    Vérifier si une erreur
                    dans l'éxécution a été détectée
                */

                // A FAIRE =============================
            }
        })


    }

    
    /* 
        Vérifier que le personnage est arrivé
    */

    // A FAIRE ==================================
}



// -- Lancement du niveau --

/* 
    Simulation récupération des données en local
*/
/*fetch("./backend/algoMain.json")
.then(res => res.json())
.then(data => {
    algo = data;
    creationElementsGraphiques();
    eraseCanvas(map, mapCtx);
    drawGrid(map, mapCtx, CASE_SIZE);
    interpreterReponsesUtilisateur();
})*/

/* 
    Simulation récupération des données depuis base de données
*/
fetch("http://lakartxela.iutbayonne.univ-pau.fr/~rlaborde003/getNodes.php")
.then(res => res.json())
.then(data => {
    algo = data;
    data.nodes.forEach(node => algo.nodes.push(transformDataFromBD(node)))
    creationElementsGraphiques();
    eraseCanvas(map, mapCtx);
    drawGrid(map, mapCtx, CASE_SIZE);
    interpreterReponsesUtilisateur();
})

/*
let algo = {};
algo.nodes = [];
const transformDataFromBD = (data) => {
    return {
        id: data.id,x: Number(data.coordX),y: Number(data.coordY),
        txt: JSON.parse(data.texte),type: data.type,
        height: Number(data.hauteur),width: Number(data.largeur),
        output: JSON.parse(data.sortie),allCoord: JSON.parse(data.coords),
        clickArea: JSON.parse(data.zoneClick),size: JSON.parse(data.taille),
        func: data.fonction == null ? "" : data.fonction,val: Number(data.valeur)
    }
}

fetch("./backend/getNodes.php", {method : 'get'})
.then(res => res.json())
.then(data => data.nodes.forEach(node => algo.nodes.push(transformDataFromBD(node))))
.then(() => console.log(algo.nodes))
.catch(err => test.textContent = err)*/