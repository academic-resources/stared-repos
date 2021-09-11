// You need to travel between nodes, but some roads may have been blocked. You want to check before you travel to make sure you avoid them. Given a map of the cities and their bidrectional roads, determine which roads are along any shortest path so you can check that they are not blocked.  The roads or edges are named using their 1-based index within the input Array.

// For example, given  a map of g_nodes = 5 nodes, the starting nodes, ending nodes, and road lengths are:

// Road     from/to/weight
// 1         (1, 2, 1) 
// 2         (2, 3, 1) 
// 3         (3, 4, 1) 
// 4         (4, 5, 1) 
// 5         (5, 1, 3) 
// 6         (1, 3, 2) 
// 7         (5, 3, 1) 

// You always need to go from node 1 to node g_nodes, so from node 1 to node 5 in this case.  The shortest path is 3, and there are three paths of that length: 1 -> 5, 1 -> 2 -> 3 -> 5, and 1 -> 3 -> 5.  We create an array of strings, one for each road in order, where the value is YES if a road is along a shortest path or NO if it is not. In this case, the resulting array is [YES, YES, NO, NO, YES, YES, YES]

/*
 * Complete the 'classifyEdges' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts WEIGHTED_INTEGER_GRAPH g as parameter.
 */

/*
 * For the weighted graph, <name>:
 *
 * 1. The number of nodes is <name>Nodes.
 * 2. The number of edges is <name>Edges.
 * 3. An edge exists between <name>From[i] and <name>To[i]. The weight of the edge is <name>Weight[i].
 *
 */

function classifyEdges(gNodes, gFrom, gTo, gWeight) {
  const shortRoutes = []
  
  for (let i = 0; i < gFrom.length; i++) {
    // console.log(gTo[i], gFrom[i], gWeight[i])
      shortRoutes[i] = gTo[i] - gFrom[i] >= gWeight[i] ? "YES" : "NO"
  }
  

  return shortRoutes
}

console.log(classifyEdges(4, [1,2,1,3,1],[2,4,3,4,4],[1,1,1,2,2]))
  // => [YES YES NO NO YES]
console.log(classifyEdges(5, [1,2,3,4,5,1,5],[2,3,4,5,1,3,3],[1,1,1,1,3,2,1]))
  // => [YES YES NO NO YES YES YES]
console.log(classifyEdges(5, [1,2,3,1,4,3,2], [2,3,5,4,5,4,4], [1,1,1,1,2,2,4]))
  // => [YES YES YES YES YES NO NO]