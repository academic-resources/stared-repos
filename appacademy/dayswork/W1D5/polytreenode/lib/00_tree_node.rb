require "byebug"

class PolyTreeNode
    def initialize(value)
        @value = value
        @parent = nil
        @children = []
    end

    def parent
        @parent
    end 

    def children
        @children
    end

    def value
        @value
    end

    def parent=(node)
        unless @parent.nil?
            @parent.children.reject! { |ele| ele == self }
        end
        @parent = node
        unless node.nil?
            node.children << self unless node.find_child(self)
        end
    end

    def find_child(child)
        idx = @children.find_index(child)
        idx ? @children[idx] : nil
    end

    def add_child(child)
        unless find_child(child)
            self.children << child
            child.parent = self
        end
    end

    def remove_child(child)
        raise "Not a child" unless find_child(child)

        child.parent = nil
        self.children.reject! {|ele| ele == child}
    end

    def dfs(target)
        return self if self.value == target
        self.children.each do |node|
            found = node.dfs(target)
            return found unless found.nil?
        end
        nil
    end

    def bfs(target)
        queue = []
        queue << self
        until queue.empty?
            current_node = queue.shift
            return current_node if current_node.value == target
            queue += current_node.children
        end
        nil
    end
end
