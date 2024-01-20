/**
 * Class representing the character 
 * on the game map.
 */
class Character {
    // Private properties
    #x; #y; #taillePas;
    #orientation; #arrivalCoordinate;
    
    /**
     * Create a character.
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} taillePas 
     * @param {Array} arrivalCoordinate 
     */
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
   
    /**
     * Resets the character's position to 
     * its starting value.
     */
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

    /**
     * Determines whether the character is positioned 
     * at the arrival coordinate "this.#arrivalCoordinate".
     * @returns {Boolean} True if it has arrived or not.
     */
    isArrived() {
        if (this.#x == this.#arrivalCoordinate.x && this.#y == this.#arrivalCoordinate.y) {
            return true;
        }  
        return false; 
    }

    /**
     * Turn the character by changing its orientation.
     * @param {Number} orientation 
     */
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

    /**
     * Character progress if promise is resolved, 
     * otherwise displays error in console.
     * @param {Number} val 
     * @returns {Promise} Character advancement if 
     * the promise is resolved, otherwise an error.
     */
    async move(val) {
        return new Promise((resolve) => {            
            const previousMove = movePromise;        
            movePromise = previousMove.then(async () => {
                
                for (let i = 0; i < val; i++) {
                    await wait(200);
                    eraseCanvas(this._map, this._mapCtx);
                    drawGrid(this._map, this._mapCtx, this.#taillePas);
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
                }
            }).then(() => {
                resolve();
            }).catch(err => console.log(err));

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

    /**
     * Calls its "funcToExec" function with 
     * a value of "val".
     * @param {String} funcToExec 
     * @param {Number} val 
     * @returns Execution of the function called.
     */
    do(funcToExec, val) {
        this.allFunc[funcToExec].args = val;
        const { functionName, args } = this.allFunc[funcToExec];
        return this[functionName](args);
    }
}