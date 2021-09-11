require_relative "../PolyTree/lib/00_tree_node.rb"

class KnightPathFinder

    def initialize(start)
        @root_node = PolyTreeNode.new(start)
        @considered_positions = [@root_node.value]
    end

    def self.valid_moves(pos)
        x, y = pos

        relative_moves = [
            [1,2],
            [1,-2],
            [-1,2],
            [-1,-2],
            [2,1],
            [2,-1],
            [-2,1],
            [-2,-1]
        ]

        moves = relative_moves.map {|pair| [pair.first + x, pair.last + y] }
        moves.reject { |pair|  pair.first < 0 || pair.first > 7 || pair.last < 0 || pair.last > 7}


    end

    def new_move_positions(pos)
        possible_moves = KnightPathFinder.valid_moves(pos)
        new_pos = possible_moves.reject { |move| @considered_positions.include?(move)}
        @considered_positions += new_pos
        new_pos
    end

    def build_move_tree
        queue = []
        queue << @root_node

        until queue.empty?
            candidate = queue.shift
            positions = self.new_move_positions(candidate.value)
            positions.each do |pos|
                child = PolyTreeNode.new(pos)
                child.parent = candidate
                candidate.add_child(child)
                queue << child
            end
        end

    end

    def find_path(end_pos)
        self.build_move_tree if @root_node.children.empty?
        end_node = @root_node.dfs(end_pos)
        trace_path_back(end_node)
    end

    def trace_path_back(end_node)
        found_path = [end_node.value]
        current_node = end_node
        until current_node == @root_node
            current_node = current_node.parent
            found_path.unshift(current_node.value)
        end
        found_path
    end

    def inspect
        { 'pos' => @root_node.value, "children" => @root_node.children.map { |c| c.inspect }}
    end

end



