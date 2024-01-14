/**
 * @class TxtAnim
 * @description ...
 */
class TxtAnim {
    /**
     * @param {String} idOfparagraphElm // id of the element in which
     *                                   you wish to insert the text. 
     * @param {Array} arrayOfTxt // the text to be inserted.
     * @param {String} idOfNextBtn // id of the next button. 
     * @param {Number} delay // interval delay between each insertion
     *                          by default 100ms.
     */

    // Privates properties
    #txtArray; #txtElm;
    #delay; #stringIndex; 
    #animTxt; #index;
    #txtBtn;

    constructor(idOfparagraphElm, idOfNextBtn, txt, delay = 30) {
        this.#txtArray = txt;
        this.#txtElm = document.getElementById(idOfparagraphElm);
        this.#txtBtn = document.getElementById(idOfNextBtn);
        this.#txtBtn.setAttribute("disabled",true);
        this.#delay = delay;
        this.#stringIndex = 0;
        this.#animTxt = null;
        this.#index = 0;

        this.#txtBtn.addEventListener("click", () => this.next())
    }

    insertTxt() {
        this.#txtElm.lastChild.textContent += this.#txtArray[this.#index][this.#stringIndex];
        if (this.#stringIndex === this.#txtArray[this.#index].length - 1) {
            this.#stringIndex = 0;
            this.#txtBtn.removeAttribute("disabled");
            clearInterval(this.#animTxt);
        } else {
            this.#stringIndex ++;
        }
    }

    reset() {
        this.#stringIndex = 0;
        this.#animTxt = null;
    }

    next() {
        this.reset();
        this.#txtBtn.setAttribute("disabled",true);
        if (this.#index < this.#txtArray.length - 1) {
            this.#index ++;
        } else {
            this.#index = 0;
        }
        this.start();
    }

    start() {
        if (this.#animTxt == undefined) {
            this.#txtElm.innerHTML = "";
            this.#txtElm.append("");
            this.#animTxt = setInterval(() => this.insertTxt(), this.#delay);
        }
    }
}