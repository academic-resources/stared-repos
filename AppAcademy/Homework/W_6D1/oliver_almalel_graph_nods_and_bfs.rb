class GraphNode
  attr_accessor :val, :neighbors

  def initialize(val)
    @val = val
    @neighbors = []
  end
end

a = GraphNode.new('a')
b = GraphNode.new('b')
c = GraphNode.new('c')
d = GraphNode.new('d')
e = GraphNode.new('e')
f = GraphNode.new('f')
a.neighbors = [b, c, e]
c.neighbors = [b, d]
e.neighbors = [a]
f.neighbors = [e]

graph = {
  'a': ['b', 'c', 'e'],
  'b': [],
  'c': ['b', 'd'],
  'd': []
  'e': ['a'],
  'f': ['e']
}

def dfs(node)
    puts node.val
    node.neighbors.each do |neighbor|
      depth