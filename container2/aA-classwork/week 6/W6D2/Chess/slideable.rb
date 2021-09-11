module Slideable
require 'byebug'
    HORIZONTAL_DIRS = [
        [1, 0], [-1, 0], [0, 1], [0, -1]
    ]
    
    DIAGONAL_DIRS = [
        [1, 1], [-1, -1], [-1, 1], [1, -1]
    ]

    def horizontal_dirs
        HORIZONTAL_DIRS
    end

    def diagonal_dirs
        DIAGONAL_DIRS
    end


    def moves
        moves = []
        move_dirs.each do |dir|
            
            moves += grow_unblocked_moves_in_dir(dir[0],dir[1])
        end
        moves.uniq
    end

    def move_dirs
    end

    def grow_unblocked_moves_in_dir(dx,dy)
        possible_moves = []
        occupied = false
        pos = @pos.dup
        until occupied
            occupied = true
            new_pos = [ pos[0] += dx, pos[1] += dy ]
            #debugger
            if @board.valid_pos?(new_pos) && @board[new_pos].is_a?(NullPiece) 
                occupied = false
                possible_moves << new_pos
            
            elsif @board.valid_pos?(new_pos) && @board[new_pos].color != self.color
                possible_moves << new_pos
                break
            end
        end
        possible_moves.uniq
    end
end