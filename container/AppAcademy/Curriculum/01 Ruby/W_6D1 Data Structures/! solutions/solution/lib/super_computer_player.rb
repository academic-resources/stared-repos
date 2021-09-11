require_relative 'tic_tac_toe_node'

class SuperComputerPlayer < ComputerPlayer
  def move(game, mark)
    node = TicTacToeNode.new(game.board, mark)

    # The computer looks gets the array of places it can move to. We
    # shuffle the array so that the computer will play differently
    # each time (though it will always make a winning move if
    # possible, and a non-losing move if there are no winning moves).
    #
    # The shuffling is optional.
    possible_moves = node.children.shuffle

    # If any move results in a #winning_node? we want to choose that
    # one. Find picks the first of the winning moves in
    # `possible_moves`.
    node = possible_moves.find { |child| child.winning_node?(mark) }

    # Stop if we found a winner. `node` may be `nil` if there are no
    # winning moves to make.
    return node.prev_move_pos if node

    # Maybe there is no winning move. Then at least don't pick a
    # loser.
    node = possible_moves.find { |child| !child.losing_node?(mark) }

    return node.prev_move_pos if node

    # If the computer plays perfectly, we should never be able to
    # force it to lose. Let's raise an alarm in that case!
    raise "Wait, it looks like I'm going to lose?"
  end
end

if $PROGRAM_NAME == __FILE__
  puts "Play the brilliant computer!"
  hp = HumanPlayer.new("Jeff")
  cp = SuperComputerPlayer.new

  TicTacToe.new(hp, cp).run
end
