require_relative 'tic_tac_toe_node'

class SuperComputerPlayer < ComputerPlayer
  def move(game, mark)

    ttt_node = TicTacToeNode.new(game.board, mark)

    next_node = (ttt_node.children.select do |node|
      node.winning_node?(mark)
    end).first

    if !next_node
      next_node = (ttt_node.children.select do |node|
      !node.losing_node?(mark)
      end).first
    end


    next_node.prev_move_pos


  end
end

if __FILE__ == $PROGRAM_NAME
  puts "Play the brilliant computer!"
  hp = HumanPlayer.new("Jeff")
  cp = SuperComputerPlayer.new

  TicTacToe.new(hp, cp).run
end
