const DomNodeCollection = require('./dom_node_collection')

// function $l (arg) {
//   let nodes
//   if (typeof arg === "string") {
//     nodes = Array.from(document.querySelectorAll(arg))
//   } 
//   if (arg instanceof HTMLElement) {
//       nodes = [arg]
//   }

//   return new DomNodeCollection(nodes)
// }

const allFuncs = []

// $l(() => '2')
// $l(() => '3')
// $l(() => alert('1'))

function $l (arg) {
  if (arg instanceof Function) {
    allFuncs.push(arg)
  } else {
    let nodes
    if (typeof arg === "string") {
      nodes = Array.from(document.querySelectorAll(arg))
    } 
    if (arg instanceof HTMLElement) {
        nodes = [arg]
    }
    return new DomNodeCollection(nodes)
  }
}

window.addEventListener('DOMContentLoaded', (event) => {
    allFuncs.forEach( func => func())
})
window.$l = $l
window.DomNodeCollection = DomNodeCollection


