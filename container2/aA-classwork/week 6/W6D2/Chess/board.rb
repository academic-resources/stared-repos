require_relative 'piece'
require_relative 'queen'
require_relative 'bishop'
require_relative 'knight'
require_relative 'king'
require_relative 'rook'
require_relative 'pawn'

require 'byebug'

class Board
    attr_reader :rows
    
    def initialize
        @rows = create_board
        
    end

    def create_board
        rook_pos = [[0,0],[0,7],[7,0],[7,7]]
        bishop_pos = [[0,2],[0,5], [7,2], [7,5]]
        knight_pos = [[0,1],[0,6],[7,1],[7,6]]
        king_pos = [[0,3],[7,3]] 
        queen_pos = [[0,4],[7,4]]

        new_board = Array.new(8) {Array.new(8)}
        (0..7).each do |row|
            (0..7).each do |col|
                if row == 1
                    new_board[row][col] = Pawn.new(:cyan, self, [row,col])
                elsif row == 6
                    new_board[row][col] = Pawn.new(:yellow, self, [row,col])
                elsif row > 1 && row < 6
                    new_board[row][col] = NullPiece.instance
                end
            end
        end
        rook_pos.each do |pos|
            color = pos[0] == 0 ? :cyan : :yellow
            new_board[pos[0]][pos[1]] = Rook.new(color, self, pos)
        end
        bishop_pos.each do |pos|
            color = pos[0] == 0 ? :cyan : :yellow
            new_board[pos[0]][pos[1]] = Bishop.new(color, self, pos)
        end
        knight_pos.each do |pos|
            color = pos[0] == 0 ? :cyan : :yellow
            new_board[pos[0]][pos[1]] = Knight.new(color, self, pos)
        end
        king_pos.each do |pos|
            color = pos[0] == 0 ? :cyan : :yellow
            new_board[pos[0]][pos[1]] = King.new(color, self, pos)
        end
        queen_pos.each do |pos|
            color = pos[0] == 0 ? :cyan : :yellow
            new_board[pos[0]][pos[1]] = Queen.new(color, self, pos)
        end
        new_board
    end

    def move_piece!(start_pos, end_pos)
        if self[start_pos].is_a?(NullPiece) || !valid_pos?(start_pos)
            raise "No piece at this position"
        end
        raise "Not a valid end position" unless valid_pos?(end_pos)
        
        self[end_pos] = self[start_pos]
        self[end_pos].pos = end_pos
        self[start_pos] = NullPiece.instance
    end

    def move_piece(start_pos, end_pos)
        if self[start_pos].is_a?(NullPiece) || !valid_pos?(start_pos)
            puts "No piece at this position"
            return false 
        end
        if !valid_pos?(end_pos)
            puts "Not a valid end position"
            return false
        end
        if self[start_pos].valid_moves.include?(end_pos)
            self[end_pos] = self[start_pos]
            self[end_pos].pos = end_pos
            self[start_pos] = NullPiece.instance
            return true
        else
            puts 'Not a valid move!'
            return false
        end
    end
    
    def [](pos)
        row, col = pos
        @rows[row][col]
    end

    def []=(pos, piece)
        row, col = pos
        @rows[row][col] = piece
    end

    def valid_pos?(pos)
        end_row, end_col = pos
        if (end_row < 0 || end_row > 7) || (end_col < 0 || end_col > 7)
            return false
        end
        true
    end

    def in_check?(color)
        king_pos = find_king(color)
        @rows.flatten.each do |piece|
            next if piece.is_a?(NullPiece)
            # debugger
            return true if piece.moves.include?(king_pos) && piece.color != color
        end
        false
    end

    def in_check_at_pos?(color, pos) 
        #debugger
        king_pos = pos
        @rows.flatten.each do |piece|
            next if piece.is_a?(NullPiece)
            # debugger
            return true if piece.moves.include?(king_pos) && piece.color != color
        end
        false
    end

    def checkmate?(color)
        return false unless in_check?(color)
        pieces = @rows.flatten.select { |piece| piece.color == color}
        pieces.all? do |piece|
            piece.valid_moves.empty?
        end
    end

    def find_king(color)
        @rows.flatten.each do |ele|
            return ele.pos if ele.is_a?(King) && ele.color == color
        end
    end

    def dupe
        dupe_board = Board.new
        (0..7).each do |row| 
            (0..7).each do |col|
                piece = self[[row,col]]
                if !piece.is_a?(NullPiece)
                    dupe_board[[row,col]] = piece.class.new(piece.color,dupe_board,piece.pos)
                else
                    dupe_board[[row,col]] = NullPiece.instance
                end
            end       
        end
        dupe_board
    end


end



# [[],[],[],[],[],[],[],[]] 0
# [[],[],[],[],[],[],[],[]] 1
# [[],[],[],[],[],[],[],[]] 2
# [[],[],[],[],[],[],[],[]] 3
# [[],[],[],[],[],[],[],[]] 4
# [[N],[N],[Q],[N],[N],[N],[N],[N]] 5
# [[P],[P],[P],[P],[P],[P],[P],[P]] 6
# [[R],[K],[B],[K],[Q],[B],[K],[R]] 7

# b[[5,2]] = Queen.new(:cyan, b, [5,2])