require_relative 'tic_tac_toe'

class TicTacToeNode

  attr_reader :board, :next_mover_mark, :prev_move_pos

  def initialize(board, next_mover_mark, prev_move_pos = nil)
    @board = board
    @next_mover_mark = next_mover_mark
    @prev_move_pos = prev_move_pos
  end

  def inspect
    # @board.rows
    @next_mover_mark
  end

  def losing_node?(evaluator)
    return true if @board.over? && @board.winner != evaluator
    return false if @board.over? && @board.winner == evaluator
    p children
    # children.all? do |child|
    #   # losing_node?(child.next_mover_mark)
    # end
  end

  def winning_node?(evaluator)

  end
  
  def children
    children = []                                   #place to hold children
    @board.rows.each_with_index do |row, idx_1|     #iterate through everything
      row.each_with_index do |col, idx_2|
        pos = [idx_1, idx_2]        #temp var to help semantically
        if @board.empty?(pos)       #is position empty on board  
          next_board = @board.dup   #create a new board when position empty
          next_board[pos] = @next_mover_mark   #assign the new board the mover mark
          @next_mover_mark == :x ? new_mover_mark = :o : new_mover_mark = :x    #flip mark
          children << TicTacToeNode.new(next_board, new_mover_mark, pos)   #shovel new node
        end
      end
    end
    children
  end
    #    0 1 2 
    # 0 [_,_,_],
    # 1 [_,_,_],
    # 2 [_,_,_]
    # [[_,X,_],[_,_,_],[_,_,_]]

    #  node will contain:
    #   X  _  _
    #   _  O  _
    #   _  _  _
# Generate different states of the board for every single move
# after current node

    # starting from an empty board
    # use board.rows from tic_tac_toe.rb's Board Class?
end
