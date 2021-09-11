require 'byebug'
require_relative '00_tree_node'

class KnightPathFinder

    def self.valid_moves(pos)

    end

    def initialize(start_pos)
      @start_pos = start_pos
      @root_node = PolyTreeNode.new(@start_pos)
      @considered_positions = [start_pos]
      # build_move_tree(@root_node)
    end

    # def build_move_tree(start_pos)

    # end

    def new_move_positions(pos)
      valid_moves(pos) # => [val_moves...]
    end

end



# [x, y]


# [x + 2, y + 1]
# [x + 2, y - 1]
# [x - 2, y - 1]
# [x - 2, y + 1]
# [x + 1, y + 2]
# [x + 1, y - 2]
# [x - 1, y - 2]
# [x - 1, y + 2]