// I AM ENOUGH

// Given a directed graph, design an algorithm to find out whether there is a route between two nodes.

class GraphNode {
  constructor(val) {
      this.val = val;
      this.neighbors = [];
  }
}

let a = new GraphNode('a');
let b = new GraphNode('b');
let c = new GraphNode('c');
let d = new GraphNode('d');
let e = new GraphNode('e');
let f = new GraphNode('f');
a.neighbors = [e, c, b];
c.neighbors = [b, d];
e.neighbors = [a];
f.neighbors = [e];


//  E ⟺ A ⟹ B
//  ⬆︎    ⬇︎ ⬈
//  F     C
//        ⬇︎
//        D

let graph = {
  'a': ['b', 'c', 'e'],
  'b': [],
  'c': ['b', 'd'],
  'd': [],
  'e': ['a'],
  'f': ['e']
};

function hasRouteBetweenNodes(startNode, endNode) {
  let visited = new Set()

  let queue = [startNode]
  
  while (queue.length) {
    let currNode = queue.shift()
    if (endNode.val === currNode.val) return true
    if (visited.has(currNode.val)) continue
    visited.add(currNode.val)
    queue.push(...currNode.neighbors)
  }
  return false
}

//  E ⟺ A ⟹ B
//  ⬆︎    ⬇︎ ⬈
//  F     C
//        ⬇︎
//        D

console.log(hasRouteBetweenNodes(a, a)) // => true
console.log(hasRouteBetweenNodes(a, e)) // => true
console.log(hasRouteBetweenNodes(d, c)) // => false
console.log(hasRouteBetweenNodes(f, b)) // => true
console.log(hasRouteBetweenNodes(c, b)) // => true
console.log(hasRouteBetweenNodes(b, c)) // => false
