const graph = {
  a: {
    neighbors: [['b', 4], ['e', 8]]
  },
  b: {
    neighbors: [['a', 4], ['d', 7], ['c', 3]]
  },
  c: {
    neighbors: [['b', 3], ['d', 1], ['g', 1]]
  },
  d: {
    neighbors: [['e', 2], ['b', 7], ['f', 9], ['c', 1]]
  },
  e: {
    neighbors: [['a', 8], ['d', 2], ['f', 6]]
  },
  f: {
    neighbors: [['e', 6], ['d', 9], ['g', 5]]
  },
  g: {
    neighbors: [['c', 1], ['f', 5]]
  }
}

function dijkstra(graph) {
  const nodes = {}
  Object.keys(graph).forEach(node => {
    nodes[node] = { ...graph[node], path: '', distance: Infinity }
  })

  const unvisited = Object.keys(graph)

  const start = nodes['a']
  start.distance = 0
  start.path = 'a'

  let current
  while (unvisited.length) {
    current = unvisited.shift()
    currentNode = nodes[current]
    currentNode.neighbors.forEach(n => {
      const proposedDistance = currentNode.distance + n[1]
      const currDist = nodes[n[0]].distance
      if (proposedDistance < currDist) {
        nodes[n[0]].distance = proposedDistance
        nodes[n[0]].path = currentNode.path + ' -> ' + n[0]
      }
    })
  }

  Object.keys(nodes).forEach(key => {
    delete nodes[key].neighbors
  })

  return nodes
}

console.log(dijkstra(graph))
