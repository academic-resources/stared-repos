let graph = {
  'a': { 'c': 1, 'b': 7 },
  'b': { 'a': 7, 'd': 12, 'e': 13 },
  'c': { 'a': 1, 'd': 20, 'f': 4 },
  'd': { 'b': 12, 'c': 20, 'e': 5 },
  'e': { 'b': 13, 'd': 5, 'f': 9 },
  'f': { 'c': 4, 'e': 9 }
};

// NOTE: Costs are symmetric in adjacency lists  a -> b = b -> a
//              f
//            /   \
//          4       9
//        /           \
//       c--20--d---5--e
//       |      |     /
//       1     12  13
//       |      | /
//       a--7---b

// Given a graph with weighted edges and a source node, calculate the shortest path between that source and all other nodes in the graph.

function dijkstrasCoreAlg(graph, source) {
  let distance = {}
  for (let node in graph) {
    distance[node] = Infinity
  }
  distance[source] = 0

  let unvisited = new Set(Object.keys(graph))

  while (unvisited.size > 0) {
    let currentNode = getSmallestNode(unvisited, distance)
    unvisited.delete(currentNode)

    for (let neighbor in graph[currentNode]) {
      let distanceToNeighbor = graph[currentNode][neighbor]
      let totalDistance = distanceToNeighbor + distance[currentNode]
      if (totalDistance < distance[neighbor]) distance[neighbor] = totalDistance
    }
  }
  return distance
}

function getSmallestNode(unvisited, distance) {
  return Array.from(unvisited).reduce((minNode, node) => {
    if (distance[node] < distance[minNode]) {
      return node
    } else {
      return minNode
    }
  })
}

console.log(dijkstrasCoreAlg(graph, 'a'))


function dijkstras(graph, source) {
  let distance = {};
  // initialize all nodes to be Infinity distance away from the source
  for (let node in graph) {
      distance[node] = Infinity;
  }

  // the source is 0 distance away from itself
  distance[source] = 0;
  
  // initialize all nodes to be unvisited
  let unvisited = new Set(Object.keys(graph));
  // prepare an object to track the optimal paths
  let previous = {};

  // while some nodes are still unvisited
  while (unvisited.size > 0) {
    // find the closest unvisited node
    let currNode = minDistanceNode(unvisited, distance);
    // and mark it as visited
    unvisited.delete(currNode);
    // consider all neighbors of the current node
    for (let neighbor in graph[currNode]) {
      // calculate the total distance of the neighbor 
      //  if we travel through the current node to get to that neighbor
      let distanceFromCurrToNeighbor = graph[currNode][neighbor];
      let totalNeighborDistance = distance[currNode] + distanceFromCurrToNeighbor;
      // if the total distance is better than the old distance we calculated for neighbor,
      if (distance[neighbor] > totalNeighborDistance) {
        // then replace it
        distance[neighbor] = totalNeighborDistance;
        // and now we say that the optimal path has `currNode` followed by `neighbor`
        previous[neighbor] = currNode;
      }
    }
  }
  return { distance, previous };
}

// this helper function will find the unvisited node with the smallest distance
function minDistanceNode(nodes, distance) {
  return Array.from(nodes).reduce((minNode, node) => (
      distance[node] < distance[minNode] ? node : minNode
  ));
}

let un = new Set(['a', 'b', 'c'])
let dist = { 'a': 5, 'b': 2, 'c': 3 }
console.log(minDistanceNode(un, dist))

let { distance, previous } = dijkstras(graph, 'a');

console.log(distance);
console.log(previous);

console.log(dijkstras(graph, 'a'))

// Time Complexity Analysis
// We implemented the same core algorithm that Dr. Edsger Wybe Dijkstra wrote himself in 1956. This algorithm has a runtime of O(n2) where n is the number of nodes in the graph. Here is the derivation for this complexity:

// - n is the number of nodes in the graph
// - The while loop will iterate once for every node, so in isolation it contributes O(n) steps
// - The minDistanceNode helper iterates through every unvisited node, so in isolation it contributes O(n) steps
// - The helper call is nested in the while loop, so combined they contribute O(n2)
// - Over the course of the whole algorithm, the inner for loop will iterate once for every edge of the graph. The number of edges in a graph of n nodes is guaranteed to be less than n2. So this loop does not contribute to the overall complexity.

// Since it's original inception, computer scientists have figured out further ways to optimize the algorithm by more efficiently calculating the node with the minimum distance (our minDistanceNode function). Those implementations require more advanced data structures like Fibonacci Heaps to get O(e + nlog(n)) runtime where n is the number of nodes and e is the number of edges. We'll save that battle for another day, perhaps in the heaps section!