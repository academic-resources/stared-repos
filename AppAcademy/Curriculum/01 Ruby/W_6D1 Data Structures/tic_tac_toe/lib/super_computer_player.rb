require_relative 'tic_tac_toe_node'

class SuperComputerPlayer < ComputerPlayer
  
  def initialize
    @name = "Hal 9000"
  end

  def move(game, mark)
    node = TicTacToeNode.new(game.board, mark)
    ops_mark = node.children.first.next_mover_mark
    possible_moves = node.children
    winning_nodes = possible_moves.select do |node|
      node.winning_node?(mark)
    end
    # print "these are the winning_nodes #{winning_nodes}"
    blocking_nodes = possible_moves.reject do |node|
      node.winning_node?(ops_mark)
    end
    # print "these are the blocking_nodes #{blocking_nodes}"
    non_lose_nodes = possible_moves.reject do |node|
      node.losing_node?(mark)
    end
    # print "these are the non_lose_nodes #{non_lose_nodes}"
    
    node = non_lose_nodes.sample
    node = blocking_nodes.sample unless blocking_nodes.empty?
    node = winning_nodes.sample unless winning_nodes.empty?

    node.prev_move_pos
  end

end

if __FILE__ == $PROGRAM_NAME
  puts "Play the brilliant computer!"
  hp = HumanPlayer.new("Jeff")
  cp = SuperComputerPlayer.new

  TicTacToe.new(hp, cp).run
end
