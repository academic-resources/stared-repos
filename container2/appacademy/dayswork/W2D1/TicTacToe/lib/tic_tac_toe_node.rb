require_relative 'tic_tac_toe'
require "byebug"


class TicTacToeNode

  attr_reader :board, :next_mover_mark, :prev_move_pos

  def initialize(board, next_mover_mark, prev_move_pos = nil)
    @board = board
    @next_mover_mark = next_mover_mark
    @prev_move_pos = prev_move_pos
  end

  def losing_node?(evaluator)
    return true if @board.over? && @board.winner != evaluator
    return false if @board.over? && (@board.winner.nil? || @board.winner == evaluator)
    if @next_mover_mark == evaluator
      self.children.all? do |node|
        node.losing_node?(evaluator)
      end
    else
      self.children.any? do |node|
        node.losing_node?(evaluator)
      end
    end
  end

  def winning_node?(evaluator)
    return true if @board.over? && @board.winner == evaluator
    return false if @board.over? && (@board.winner.nil? || @board.winner != evaluator)
    if @next_mover_mark == evaluator
      self.children.any? do |node|
        node.winning_node?(evaluator)
      end
    else
      self.children.none? do |node|
        # node.losing_node?(next_mover_mark)
        node.winning_node?(@next_mover_mark)
      end
    end
  end

  # This method generates an array of all moves that can be made after
  # the current move.
  def children
    possible_moves = []
    empty = []
    (0..2).each do |row|
      (0..2).each do |col|
        empty << [row,col] if @board.empty?([row,col])
      end
    end
    empty.each do |pos|
      dup_board = board.dup
      dup_board[pos] = @next_mover_mark
      possible_moves << TicTacToeNode.new(dup_board, next_marker, pos)
    end
    possible_moves
  end

  def next_marker
    @next_mover_mark == :x ? :o : :x
  end
end
