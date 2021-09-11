# Connected Components
# You are given a file which looks like so:

# AA BB
# DD FF
# CC EE
# EE DD
# Each line of the file contains a pair of strings. Each string represents is the name of a vertex. The line represents an edge connecting two vertices.

# Your task is to find the connected components of the graph. A connected component is a subset of vertices all connected to each other. In this example, the connected components are [["AA", "BB"], ["CC", "DD", "EE", "FF"]].

# You don't have to return the elements of the components in any particular order.

# Solutions
# Running time is linear in the number of edges.

lines = File.readlines(FILE_NAME)

matrix = {}
lines.each do |line|
  v1, v2 = line.split(" ")
  matrix[v1] ||= []
  matrix[v1] << v2
  matrix[v2] ||= []
  matrix[v2] << v1
end

components = []
until matrix.empty?
  component = []

  first_key = matrix.keys.first
  queue = [first_key]
  until queue.empty?
    key = queue.shift
    next unless matrix.has_key?(key)
    neighbors = matrix.delete(key)

    component << key
    queue.concat(neighbors)
  end

  components << component
end

# In this solution, we start by reading in the file. We will represent our graph as a hash in which the keys represent each vertex, and the values are an array of their connections (the other vertices).

# From there, we can generate a list of connected components by traversing our hash. We start by taking an arbitrary key from our hash and breadth first searching for connected vertices. We start a queue as well as an array representing our component. We search outwards, adding each key to the component and deleting it from the hash as we encounter it. We then add its neighbors to the queue. When our queue is empty, we've finished our current component, and check the next key in our hash to grab the next component.
