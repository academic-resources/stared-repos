require_relative '00_tree_node'

class KnightPathFinder
  attr_reader :start_pos

  MOVES = [
    [-2, -1],
    [-2,  1],
    [-1, -2],
    [-1,  2],
    [ 1, -2],
    [ 1,  2],
    [ 2, -1],
    [ 2,  1]
  ]

  def self.valid_moves(pos)
    valid_moves = []

    cur_x, cur_y = pos
    MOVES.each do |(dx, dy)|
      new_pos = [cur_x + dx, cur_y + dy]

      if new_pos.all? { |coord| coord.between?(0, 7) }
        valid_moves << new_pos
      end
    end

    valid_moves
  end

  def initialize(start_pos)
    @start_pos = start_pos
    @considered_positions = [start_pos]

    build_move_tree
  end

  def find_path(end_pos)
    end_node = root_node.dfs(end_pos)

    trace_path_back(end_node)
      .reverse
      .map(&:value)
  end

  private_constant :MOVES

  private

  attr_accessor :root_node, :considered_positions

  def build_move_tree
    self.root_node = PolyTreeNode.new(start_pos)

    # build the tree out in breadth-first fashion
    nodes = [root_node]
    until nodes.empty?
      current_node = nodes.shift

      current_pos = current_node.value
      new_move_positions(current_pos).each do |next_pos|
        next_node = PolyTreeNode.new(next_pos)
        current_node.add_child(next_node)
        nodes << next_node
      end
    end
  end

  def new_move_positions(pos)
    KnightPathFinder.valid_moves(pos)
      .reject { |new_pos| considered_positions.include?(new_pos) }
      .each { |new_pos| considered_positions << new_pos }
  end

  def trace_path_back(end_node)
    nodes = []

    current_node = end_node
    until current_node.nil?
      nodes << current_node
      current_node = current_node.parent
    end

    nodes
  end
end

if $PROGRAM_NAME == __FILE__
  kpf = KnightPathFinder.new([0, 0])
  p kpf.find_path([7, 7])
end
