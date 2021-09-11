require 'byebug'

module Stepable

    def moves
        moves = []
        pos = @pos.dup
        move_diffs.each do |dir|
            new_pos = [ pos[0] + dir[0], pos[1] + dir[1] ]
            if @board.valid_pos?(new_pos) && ( @board[new_pos].is_a?(NullPiece) || @board[new_pos].color != self.color) 
                moves << new_pos
            end
        end
        moves
    end

    def move_diffs
        
    end
end