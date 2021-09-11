require "byebug"
require "set"

class GraphNode
  attr_accessor :val, :neighbors

  def initialize(val)
    @val = val
    @neighbors = []
  end
end

def bfs(starting_node, target_value)
  visited = Set.new()
  queue = [starting_node]
  until queue.empty?
    current = queue.shift
    if !visited.include?(current)
      visited << current
      return current if current.val == target_value
      current.neighbors.each do |node|
        queue << node
      end
    end
  end
  nil
end

a = GraphNode.new("a")
b = GraphNode.new("b")
c = GraphNode.new("c")
d = GraphNode.new("d")
e = GraphNode.new("e")
f = GraphNode.new("f")
a.neighbors = [b, c, e]
c.neighbors = [b, d]
e.neighbors = [a]
f.neighbors = [e]

p bfs(a, "b").val
p bfs(a, "f")
