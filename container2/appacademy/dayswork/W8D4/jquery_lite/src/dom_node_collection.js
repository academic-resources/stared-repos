class DomNodesCollection {
  constructor (elemArray) {
    this.elemArray = elemArray
  }

  applyToElems(func) {
      this.elemArray.forEach(el => {
          func(el)
      });
  }

  html(string = null) {
    if (string) {
        this.applyToElems(el => el.innerHTML = string)
    } else {
        return this.elemArray[0].innerHTML
    }
  }

  empty() {
      this.applyToElems(el => el.innerHTML = '')
  }

  append(arg) {
    if (arg instanceof DomNodesCollection ) {
        const outerArgs = arg.elemArray.map( el => el.outerHTML ).join('')
        this.applyToElems(el => el.innerHTML = outerArgs)
    } else if (arg instanceof HTMLElement) {
        this.applyToElems(el => el.innerHTML = arg.outerHTML)
    } else {
        this.applyToElems(el => el.innerHTML = arg)
    }
  }

  attr (key, val = null) {
    if (val) {
        this.applyToElems(el => el.setAttribute(key, val))
    } else {
      return this.elemArray[0].getAttribute(key)
    }
  }

  addClass (arg) {
    let classesToAdd
    if (arg instanceof Function) {
        this.elemArray.forEach( (el, idx) => {
            classesToAdd = arg(idx, el.classList).split(' ')
            el.classList.add(...classesToAdd)
        });
    } else {
        this.elemArray.forEach((el) => {
            classesToAdd = arg.split(' ')
            el.classList.add(...classesToAdd)
        });
    }
  }

  removeClass (arg) {
    let classesToRemove
    if (arg instanceof Function) {
        this.elemArray.forEach( (el, idx) => {
            classesToRemove = arg(idx, el.classList).split(' ')
            el.classList.remove(...classesToRemove)
        });
    } else {
        this.elemArray.forEach((el) => {
            classesToRemove = arg.split(' ')
            el.classList.remove(...classesToRemove)
        });
    }
  }

  children () {
    let allChildren = []
    this.elemArray.forEach ((el) => {
      allChildren = allChildren.concat(Array.from(el.children))
    })
    return new DomNodesCollection(allChildren)
  }

  parent () {
    let allParents = []
    this.elemArray.forEach ((el) => {
        if (allParents.indexOf(el.parentElement) === -1) 
            allParents.push(el.parentElement)
    })
    return new DomNodesCollection(allParents)
  }

  find(selector) {
      let matches = []
      if (typeof selector === "string") {
        this.elemArray.forEach ( el => {
          matches = matches.concat(Array.from(el.querySelectorAll(selector)))
        })
      } else if (selector instanceof HTMLElement) {
          this.elemArray.forEach(el => {
              if (el === selector) matches = [el] // not working
          })
      }
      return new DomNodesCollection(matches)
  } 

  remove () {
      const removed = this
      this.elemArray.forEach(el => {
        el.parentElement.removeChild(el)
      })
      return this
  }

  on (event, cb) {
    this.elemArray.forEach ( el => {
      el._cb = {event, cb}
      el.addEventListener(event, cb)
    })
  }

  off (event) {
    this.elemArray.forEach ( el => {
      if (el._cb && el._cb.event === event) {
        el.removeEventListener(event, el._cb.cb)
      }
    })
  }

  

}


module.exports = DomNodesCollection