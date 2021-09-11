class Pawn < Piece

    def initialize(color,board,pos)
        super
        
    end

    def symbol
        '  ♙  '.colorize(color)
    end

    def moves
        forward_steps + side_attacks
    end

    def at_start_row?
        return true if color == :cyan && pos[0] == 1 
        return true if color == :yellow && pos[0] == 6 
        false
    end

    def forward_dir
        color == :cyan ? 1 : -1
    end

    def forward_steps
        ret_arr = []
        ret_arr << [forward_dir, 0]
        ret_arr << [(forward_dir*2), 0] if at_start_row?

        moves = []
        pos = @pos.dup
        ret_arr.each do |dir|
            new_pos = [ pos[0] + dir[0], pos[1] + dir[1] ]
            if @board.valid_pos?(new_pos) && @board[new_pos].is_a?(NullPiece)
                moves << new_pos
            end
        end
        moves
    end

    def side_attacks
        moves = []
        pos_x , pos_y = @pos
        potential_moves = [ [forward_dir + pos_x, pos_y - 1],  [forward_dir + pos_x, pos_y + 1] ]
        potential_moves.each do |pos|
            next if @board[pos].is_a?(NullPiece)
            moves << pos if @board.valid_pos?(pos) && @board[pos].color != color
        end
        moves
    end
end