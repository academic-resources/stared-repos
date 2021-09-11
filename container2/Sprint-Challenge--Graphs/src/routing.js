/**
 * Edge class
 */
class Edge {
  constructor(destination, weight = 1) {
    this.destination = destination
    this.weight = weight
  }
}

/**
 * Vertex class
 */
class Vertex {
  constructor(value = 'vertex') {
    this.value = value
    this.edges = []
  }
}

/**
 * Graph class
 */
class Graph {
  constructor() {
    this.vertexes = []
  }

  /**
   * Breadth-First search from a starting vertex
   */
  bfs(start) {
    const queue = []
    start.color = 'gray'
    queue.push(start)
    while (!!queue.length) {
      const curr = queue[0]
      for (let edge of curr.edges) {
        const vert = edge.destination
        if (!vert.color) {
          vert.color = 'gray'
          vert.parent = curr
          queue.push(vert)
        }
      }
      queue.shift()
      curr.color = 'black'
    }
  }

  /**
   * Find a vertex by its value
   *
   * Return null if the vertex isn't found
   */
  findVertex(value) {
    for (let vert of graph.vertexes) {
      if (vert.value === value) return vert
    }
  }

  /**
   * Print out the route from the start vert back along the parent
   * pointers (set in the previous BFS)
   */
  route(start) {
    const colors = ['\x1b[32m','\x1b[33m','\x1b[34m','\x1b[35m','\x1b[36m','\x1b[37m']
    const output = [`\x1b[31m${start.value}`]
    let i = 0
    while (start.parent) {
      output.push(`${colors[i]}${start.parent.value}`)
      i++
      start = start.parent
    }
    console.log(output.join(' 👉 ') + ' 🥔')
  }
}

/**
 * Helper function to add bidirectional edges
 */
function addEdge(v0, v1) {
  v0.edges.push(new Edge(v1))
  v1.edges.push(new Edge(v0))
}

/**
 * Main
 */

// Test for valid command line
const args = process.argv.slice(2)

if (args.length != 2) {
  console.error('usage: routing hostA hostB')
  process.exit(1)
}

// Build the entire Internet
// (it's only a model)
const graph = new Graph()
const vertA = new Vertex('HostA')
const vertB = new Vertex('HostB')
const vertC = new Vertex('HostC')
const vertD = new Vertex('HostD')
const vertE = new Vertex('HostE')
const vertF = new Vertex('HostF')
const vertG = new Vertex('HostG')
const vertH = new Vertex('HostH')

addEdge(vertA, vertB)
addEdge(vertB, vertD)
addEdge(vertA, vertC)
addEdge(vertC, vertD)
addEdge(vertC, vertF)
addEdge(vertG, vertF)
addEdge(vertE, vertF)
addEdge(vertH, vertF)
addEdge(vertH, vertE)

graph.vertexes.push(vertA)
graph.vertexes.push(vertB)
graph.vertexes.push(vertC)
graph.vertexes.push(vertD)
graph.vertexes.push(vertE)
graph.vertexes.push(vertF)
graph.vertexes.push(vertG)
graph.vertexes.push(vertH)

// Look up the hosts passed on the command line by name to see if we can
// find them.

const hostAVert = graph.findVertex(args[0])

if (hostAVert === null) {
  console.error('routing: could not find host: ' + args[0])
  process.exit(2)
}

const hostBVert = graph.findVertex(args[1])

if (hostBVert === null) {
  console.error('routing: could not find host: ' + args[1])
  process.exit(2)
}

// Route from one host to another

graph.bfs(hostBVert)
graph.route(hostAVert)
