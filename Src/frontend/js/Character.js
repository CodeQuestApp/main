/**
 * @class Character
 * @description ...
 */
class Character {
    #x; #y; #taillePas;
    #orientation; #arrivalCoordinate;
    
    constructor(x, y, taillePas, arrivalCoordinate) {
        this.#x = x + 5 * taillePas;
        this.#y = y - (taillePas*3);
        
        this.#taillePas = taillePas;
        this.#orientation = 0;
        this.#arrivalCoordinate = arrivalCoordinate;

        this._map = document.getElementById("map");
        this._mapCtx = this._map.getContext("2d");
        this._img = new Image();
        this._img.src = "./frontend/img/perso-test.png";
        this._img.addEventListener("load", () => {
            this._mapCtx.drawImage(
                this._img, this._imgIdx * this._persoSize, 0, this._persoSize, this._img.height, 
                this.x, this.y, this.taillePas, this.taillePas*2
            );
        })
        this._imgIdx = 0;
        this._persoSize = 297;

        this.valForFunc = null;
        this.funcToExec = null;
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

    get x() { return this.#x }
    set x(val) { this.#x = val }

    get y() { return this.#y }
    set y(val) { this.#y = val }

    get orientation() { return this.#orientation }
    set orientation(val) { this.#orientation = val }

    get arrivalCoordinate() { return this.#arrivalCoordinate }
    set arrivalCoordinate(val) { this.#arrivalCoordinate = val }

    get taillePas() {return this.#taillePas }
    set taillePas(val) { this.#taillePas = val }

    set valFunc(val) { this.valForFunc = val }
    set funcTo(val) { this.funcToExec = val }
   
    resetPosition() {
        this.x = (5 * this.taillePas);
        this.y = map.height - (this.taillePas*3);
        this.orientation = 0;
        this._imgIdx = 0;

        this._mapCtx.drawImage(
            this._img, this._imgIdx * this._persoSize, 0, this._persoSize, this._img.height, 
            this.x, this.y, this.taillePas, this.taillePas*2
        );
    }

    isArrived() {
        if (this.#x == this.#arrivalCoordinate.x && this.#y == this.#arrivalCoordinate.y) {
            return true;
        }  
        return false; 
    }

    async turn(orientation) {
        /*
            this.orientation ==> {0 : haut ; 1 : droite ; 2 : bas ; 3 : gauche}
        */

        await this.move();
        if (orientation == 1) {
            this._imgIdx = 2;
            this.orientation = (this.orientation + 1) % 4;
        } else if (orientation == -1) {
            this._imgIdx = 1;
            if(this.orientation === 0)
                this.orientation = 3;
            else{
                this.orientation = this.orientation - 1;
            }
        }
    }

    async move(val) {
        return new Promise((resolve) => {            
            const previousMove = movePromise;        
            movePromise = previousMove.then(async () => {
                
                for (let i = 0; i < val; i++) {
                    await wait(200);
                    eraseCanvas(this._map, this._mapCtx);
                    switch (this.orientation) {
                        case 3:
                            this.x = this.x - this.taillePas;
                            break;
                        case 2:
                            this.y = this.y + this.taillePas;
                            break;
                        case 1:
                            this.x = this.x + this.taillePas;
                            break;
                        case 0:
                            this.y = this.y - this.taillePas;
                            break;
                    }
                    
                    this._mapCtx.drawImage(
                        this._img, this._imgIdx * this._persoSize, 0, this._persoSize, this._img.height, 
                        this.x, this.y, this.taillePas, this.taillePas*2
                    );
                    // this._mapCtx.fillRect(this.x, this.y, this.taillePas, this.taillePas);
                }
            }).then(() => {
                resolve();
            });

        })
    }

    /*async moveWithTempo(val, character) {
        return new Promise((resolve) => {
            
            const previousMove = movePromise;
            console.log(`move ${val}`);

            movePromise = previousMove.then(async () => {
                for (let i = 0; i < val; i++) {
                    await wait(150);
                    switch (character.orientation) {
                        case 3:
                            character.x = character.x - character.taillePas;
                            break;
                        case 2:
                            character.y = character.y + character.taillePas;
                            break;
                        case 1:
                            character.x = character.x + character.taillePas;
                            break;
                        default:
                            character.y = character.y - character.taillePas;
                            break;
                    }
                    this._mapCtx.fillRect(character.x, character.y, character.taillePas, character.taillePas);
                }
            }).then(() => {
                resolve();
            });

        })
    }*/

    do(funcToExec, val) {
        this.allFunc[funcToExec].args = val;
        const { functionName, args } = this.allFunc[funcToExec];
        return this[functionName](args);
    }
}