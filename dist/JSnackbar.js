const JSnackbar = new class {
    get el() {
        if (!document.getElementById("JSnackbarContainer")) {
            let mS = document.createElement("div")
            mS.id = "JSnackbarContainer"
            document.body.appendChild(mS)
            return mS
        }
        else return document.getElementById("JSnackbarContainer")
    }
    time = 5000
    animt = 300
    #timeOut = null
    #readyShow = null
    #clearel = null
    /**
     * Show some text.
     * @param {string} text 
     * @param {"primary"|"secondary"|"success"|"danger"|"warning"|"info"|"dark"} color 
     */
    show(text, color) {
        if (text) {
            const add = () => {
                let mS = document.createElement("div")
                mS.classList.add("JSnackbar", "slideIn")
                color && mS.classList.add(color)
                mS.innerHTML = text
                this.el.appendChild(mS)
                const t = setTimeout(() => {
                    this.clear()
                }, this.time)
                this.#timeOut = t
            }
            if (this.el.getElementsByClassName("slideIn").length > 0 || this.#readyShow) {
                clearTimeout(this.#readyShow)
                this.#readyShow = null
                clearTimeout(this.#timeOut)
                this.#timeOut = null
                this.clear()
                const t = setTimeout(() => {
                    add()
                }, this.animt)
                this.#readyShow = t
            } else {
                add()
            }
            if(this.#clearel){
                clearTimeout(this.#clearel)
                this.#clearel = null
            }
        }
    }
    /**
     * Clear All.
     */
    clear() {
        if (!this.el) return
        let list = this.el.getElementsByClassName("slideIn")
        for (let i = 0; i < list.length; i++) {
            const e = list[i]
            e.classList.remove("slideIn")
            e.classList.add("slideOut")
            setTimeout(() => {
                e.parentNode.removeChild(e)
            }, this.animt)
        }
        const t = setTimeout(() => {
            this.el.parentElement.removeChild(this.el)
        }, this.animt)
        this.#clearel = t
    }
}