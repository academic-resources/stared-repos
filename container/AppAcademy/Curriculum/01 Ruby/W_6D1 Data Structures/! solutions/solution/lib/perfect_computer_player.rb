require_relative 'minimax_node'
require_relative 'tic_tac_toe_node'

class PerfectComputerPlayer < ComputerPlayer
  def move(game, mark)
    puts "Just a moment...\n\n"
    minimax(game.board, mark)
  end

  def generate_child_nodes(board)
    board.open_positions.map do |open_position|
      child_board = board.dup
      child_board[open_position] = board.next_mark

      MinimaxNode.new(child_board, open_position)
    end

  end

  def minimax(board, mark)
    successor_function = Proc.new do |board|
      generate_child_nodes(board)
    end

    evaluation_function = Proc.new do |board|
      if board.winner == mark
        1
      elsif board.tied?
        0
      else
        -1
      end
    end

    termination_test = Proc.new do |board|
      board.over?
    end

    MinimaxNode.set_successor_function(successor_function)
    MinimaxNode.set_evaluation_function(evaluation_function)
    MinimaxNode.set_termination_test(termination_test)

    board_node = MinimaxNode.new(board)
    board_node.minimax
  end
end

if $PROGRAM_NAME == __FILE__
  puts "Play the perfect computer!"
  hp = HumanPlayer.new("Asher")
  cp = PerfectComputerPlayer.new

  TicTacToe.new(cp, hp).run
end
