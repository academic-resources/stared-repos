// Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph. Each node in the graph contains a val (int) and a list (List[Node]) of its neighbors.

 

// Example:



// Input:
// {id:"1",neighbors:[{id:"2",neighbors:[{ref:"1"},{id:"3",neighbors:[{ref:"2"},{id:"4",neighbors:[{ref:"3"},{ref:"1"}],val:4}],val:3}],val:2},{ref:"4"}],val:1}

// Explanation:
// Node 1's value is 1, and it has two neighbors: Node 2 and 4.
// Node 2's value is 2, and it has two neighbors: Node 1 and 3.
// Node 3's value is 3, and it has two neighbors: Node 2 and 4.
// Node 4's value is 4, and it has two neighbors: Node 1 and 3.
 

// Note:

// The number of nodes will be between 1 and 100.
// The undirected graph is a simple graph, which means no repeated edges and no self-loops in the graph.
// Since the graph is undirected, if node p has node q as neighbor, then node q must have node p as neighbor too.
// You must return the copy of the given node as a reference to the cloned graph.

/**
 * // Definition for a Node.
 * function Node(val,neighbors) {
 *    this.val = val;
 *    this.neighbors = neighbors;
 * };
 */
/**
 * @param {Node} node
 * @return {Node}
 */

function Node(val,neighbors) {
  this.val = val;
  this.neighbors = neighbors;
};

var cloneGraph = function(node) {
    
  const map = new Map();

//copy each value first
  const dfs = (node) => {
      if (map.has(node)) return

      let copied = new Node(node.val, null);
      map.set(node, copied);
          for (let i = 0; i < node.neighbors.length; i++) {
              dfs(node.neighbors[i]);
          }
      }
  dfs(node);

//use map to copy the neighbors if it exists
  for (let [node, copy] of map) {

      if (node.neighbors) {
          copy.neighbors = [];
          for (let i = 0; i < node.neighbors.length; i++) {
              copy.neighbors.push(map.get(node.neighbors[i]));    
          }
      }
  }
  
  return map.get(node);
};

 let graph2 = {id:"1",neighbors:[{id:"2",neighbors:[{ref:"1"},{id:"3",neighbors:[{ref:"2"},{id:"4",neighbors:[{ref:"3"},{ref:"1"}],val:4}],val:3}],val:2},{ref:"4"}],val:1}

 //   1 --------- 2
 //   |           |
 //   3 --------- 4

let node1 = new Node(1)
let node2 = new Node(2)
let node3 = new Node(3)
let node4 = new Node(4)
node1.neighbors = [node2, node4]
node2.neighbors = [node1, node3]
node3.neighbors = [node2, node4]
node4.neighbors = [node1, node3]

let graph = node1
console.log(cloneGraph(graph))
console.log("==========")
console.log(cloneGraph(graph2))




function UndirectedGraphNode(label) {
  this.label = label
  this.neighbors = []
};

function cloneGraph2(graph) {

  if (!graph) return graph;
  var map = {};
  return traverse(graph);

  function traverse(node) {
    if (!map[node.label]) {
      var newNode = new UndirectedGraphNode(node.label);
      map[node.label] = newNode;
      newNode.neighbors = node.neighbors.map(traverse);
    }
    return map[node.label];
  }
}


var aNode = new UndirectedGraphNode('0');
var bNode = new UndirectedGraphNode('1');
var cNode = new UndirectedGraphNode('2');
 
aNode.neighbors.push(bNode, cNode);
bNode.neighbors.push(cNode);
cNode.neighbors.push(cNode);
 
console.log("=========")
// console.log(aNode);
// console.log(cloneGraph2(aNode));


