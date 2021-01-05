const JSnackbar = new class {
    get el() {
        return document.querySelector("#JSnackbarContainer")
    }
    time = 5000
    animt = 300
    timeOut = null
    readyShow = null
    get TimeOut() {
        return this.timeOut
    }
    set TimeOut(e) {
        return this.timeOut = e
    }
    get ReadyShow() {
        return this.readyShow
    }
    set ReadyShow(e) {
        return this.readyShow = e
    }
    show(text, color) {
        if (text) {
            if (!this.el) {
                let mS = document.createElement("div")
                mS.id = "JSnackbarContainer"
                document.body.appendChild(mS)
            }
            const add = () => {
                let mS = document.createElement("div")
                mS.classList.add("JSnackbar", "slideIn")
                color && mS.classList.add(color)
                mS.innerHTML = text
                this.el.appendChild(mS)
                const t = setTimeout(() => {
                    this.clear()
                }, this.time)
                this.TimeOut = t
            }
            if (this.el.querySelectorAll(".slideIn").length > 0 || this.ReadyShow) {
                clearTimeout(this.ReadyShow)
                this.ReadyShow = null
                clearTimeout(this.TimeOut)
                this.TimeOut = null
                this.clear()
                const t = setTimeout(() => {
                    add()
                }, this.animt)
                this.ReadyShow = t
            } else {
                add()
            }
        }
    }
    clear() {
        this.el.querySelectorAll(".slideIn").forEach(e => {
            e.classList.remove("slideIn")
            e.classList.add("slideOut")
            setTimeout(() => {
                e.parentNode.removeChild(e)
            }, this.animt)
        })
    }
}