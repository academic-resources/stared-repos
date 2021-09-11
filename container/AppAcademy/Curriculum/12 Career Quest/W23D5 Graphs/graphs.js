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

// ADJACENCY MATRIX
let matrix = [
  /*          A       B       C       D       E       F   */
  /*A*/    [true,  true,   true,   false,  true,   false],
  /*B*/    [false, true,   false,  false,  false,  false],
  /*C*/    [false, true,   true,   true,   false,  false],
  /*D*/    [false, false,  false,  true,   false,  false],
  /*E*/    [true,  false,  false,  false,  true,   false],
  /*F*/    [false, false,  false,  false,  true,   true ]
  ];

// ADJACENCY LIST
let graph = {
  'a': ['b', 'c', 'e'],
  'b': [],
  'c': ['b', 'd'],
  'd': [],
  'e': ['a'],
  'f': ['e']
};

// using GraphNode representation

function depthFirstRecur(node, visited=new Set()) {
  // if this node has already been visited, then return early
  if (visited.has(node.val)) return;

  // otherwise it hasn't yet been visited,
  // so print it's val and mark it as visited.
  console.log(node.val);
  visited.add(node.val);

  // then explore each of its neighbors
  node.neighbors.forEach(neighbor => {
      depthFirstRecur(neighbor, visited);
  });
}

depthFirstRecur(a);
console.log("==================")


function depthFirstIter(node) {
  let visited = new Set();
  let stack = [ node ];

  while (stack.length) {
      let node = stack.pop();

      // if this node has already been visited, then skip this node
      if (visited.has(node.val)) continue;

      // otherwise it hasn't yet been visited,
      // so print it's val and mark it as visited.
      console.log(node.val);
      visited.add(node.val);

      // then add its neighbors to the stack to be explored 
      stack.push(...node.neighbors);
  }
}

depthFirstIter(f)
console.log("==================")


// using Adjacency List representation

function depthFirstRecurAdjList(node, graph, visited=new Set()) {
  if (visited.has(node)) return;

  console.log(node);
  visited.add(node);

  graph[node].forEach(neighbor => {
      depthFirstRecurAdjList(neighbor, graph, visited);
  });
}

depthFirstRecurAdjList('f', graph);
console.log("==================")


function depthFirstIterAdjList(node, graph) {
  let visited = new Set();
  let stack = [ node ];

  while (stack.length) {
      let node = stack.pop();

      if (visited.has(node)) continue;

      console.log(node);
      visited.add(node);

      stack.push(...graph[node]);
  }
}

depthFirstRecurAdjList('f', graph);
console.log("==================")


function depthFirst(graph) {
  let visited = new Set();

  for (let node in graph) {
      _depthFirstRecur(node, graph, visited);
  }
}

function _depthFirstRecur(node, graph, visited) {
  if (visited.has(node)) return;

  console.log(node);
  visited.add(node);

  graph[node].forEach(neighbor => {
      _depthFirstRecur(neighbor, graph, visited);
  });
}

depthFirst(graph);
console.log("==================")


let graph2 = {
  'h': ['i', 'j'],
  'i': [],
  'j': ['k'],
  'k': [],
  'l': ['m'],
  'm': []
}

depthFirst(graph2);
// prints h, i, j, k, l, m
console.log("==================")