require 'byebug'

class PolyTreeNode
  
  attr_reader :parent, :children, :value

  def initialize(value)
    @parent = nil
    @children = []
    @value = value
  end

  def inspect
    @children.inspect
    @value.inspect

  end

  def parent=(node)
    return if node == @parent
    @parent.children.delete(self) unless @parent.nil? # referring to old parent
    if node.nil?  # checking if new node is nil
      @parent = nil     # current node is now nil
    else 
      @parent = node       # current node = new node
      @parent.children << self   # node adopts old parent
    end
  end

  def add_child(node)
    node.parent = self  #node's parent is now self
  end

  def remove_child(node)
    node.parent = nil
    raise "Not a child" if node.parent.nil?
  end

  def dfs(target)
    return self if self.value == target
    self.children.each do |child|
        result = child.dfs(target)
      return result unless result.nil?
      end
    nil
  end

  def bfs(target)
    queue = [self]
    until queue.empty? 
      first = queue.shift
      return first if first.value == target
      queue += first.children
    end
    nil
  end

end


# [a]  !a
# [b, c]   !b
# [c, d, e]   !c
# [d, e, f, g]   !d
# [e, f, g]   !e
# [f, g]   !f
# [g]   !g




=begin
sudo code
def dfs(root, target) => node instance || nil
  #   check to see if root value is target value

  #   dfs on the children
  #   Memoize the recursive call
  #   What was returned?  If nil, return node


  # nil
end


def bfs(root, target)
  # queue = []
  # queue << root
  # until queue is empty
  #   shift off the first element
  #   check that element
  #   queue up children if not target
  # 
  # implicit nil
end


=end