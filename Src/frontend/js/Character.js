/**
 * @class Character
 * @description ...
 */
class Character {
    #x; #y; #taillePas;
    #or; #arrivalCoordinate;
    
    constructor(x ,y , taillePas, arrivalCoordinate) {
        this.#x = x;
        this.#y = y;
        this.#taillePas = taillePas;
        this.#or = 2;
        this.#arrivalCoordinate = arrivalCoordinate;
    }

    get x() { return this.#x }
    set x(val) { this.#x = val }

    get y() { return this.#y }
    set y(val) { this.#y = val }

    get or() { return this.#or }
    set or(val) { this.#or = val }

    get arrivalCoordinate() { return this.#arrivalCoordinate }
    set arrivalCoordinate(val) { this.#arrivalCoordinate = val }
   
    resetPosition() {
        this.#x = 0;
        this.#y = 0;
        this.#or = 2;
    }

    isArrived() {
        if (this.#x == this.#arrivalCoordinate.x && this.#y == this.#arrivalCoordinate.y) {
            return true;
        }  
        return false; 
    }
}