
require 'byebug'
require_relative '00_tree_node'

class Kpf

  attr_reader :start_pos, :root_node, :considered_positions

    def self.valid_moves(node_value)
      x, y = node_value
      moves = [
      [x + 2, y + 1],
      [x + 2, y - 1],
      [x - 2, y - 1],
      [x - 2, y + 1],
      [x + 1, y + 2],
      [x + 1, y - 2],
      [x - 1, y - 2],
      [x - 1, y + 2] 
      ]
      moves.select do |move|
        move[0] < 8 && move[0] >= 0 && 
        move[1] < 8 && move[1] >= 0 
      end
    end

    def initialize
      puts "Enter starting Row: "
      start_x = gets.chomp.to_i
      puts "Enter starting Collumn: "
      start_y = gets.chomp.to_i
      @start_pos = start_x, start_y
      p @start_pos
      @root_node = PolyTreeNode.new(@start_pos)
      @considered_positions = [@start_pos]
      build_move_tree
    end

    def new_move_positions(node_value)
      new_positions = Kpf.valid_moves(node_value).select do |pos|
        !@considered_positions.include?(pos)
      end
      @considered_positions += new_positions
      new_positions
    end

    def build_move_tree
      queue = [@root_node]
      until queue.empty?
        current_node = queue.shift
        new_move_positions(current_node.value).each do |pos|
          child = PolyTreeNode.new(pos)
          current_node.add_child(child)
          queue << child 
        end
      end
    end
 
    def find_path
      puts "Enter desired end Row: "
      end_x = gets.chomp.to_i
      puts "Enter desired end Collumn: "
      end_y = gets.chomp.to_i
      end_pos = end_x, end_y
      p end_pos
      trace_path_back(@root_node.bfs(end_pos))
    end

    def trace_path_back(end_node)
      path = []
      current_node = end_node
      until current_node.nil?
        path.unshift(current_node)
        current_node = current_node.parent
      end
      path
    end

end

board = Kpf.new
p board.find_path

# [x, y]

# 3 points
# - tell my pair what I think they do well
# - tell my pair what I think I could do better
# - tell your pair what they think they could do better
