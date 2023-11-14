/**
 * @class Character
 * @description ...
 */
class Character {
    #x; #y; #or;
    #taillePas;
    constructor(x = 0,y = 0,taillePas = 70) {
        this.#x = x;
        this.#y = y;
        this.#taillePas = taillePas;
        this.#or = 2;
    }

    get x() { return this.#x }
    set x(val) { this.#x = val }

    get y() { return this.#y }
    set y(val) { this.#y = val }

    get or() { return this.#or }
    set or(val) { this.#or = val }

    resetPosition() {
        this.#x = 0;
        this.#y = 0;
        this.#or = 2;
    }
}