require_relative "card.rb" # card.rb?

class Board
  LETTERS = "ABCDEFGH"

  attr_accessor :grid

  def initialize
    @grid = Array.new(4) { Array.new(4) }
  end

  def populate
    LETTERS.each_char do |l|
        2.times do 
            slot = find_empty_grid_slot     # @grid argument?
            # insert_card(Card.new(l), slot) 
            self[slot] = Card.new(l)
        end
    end
  end

  def render 
    system("clear")
    puts "  0 1 2 3"
    # iterate through each cell
    @grid.each_with_index do |row, j|
      row_render = []
      row.each_index do |i|
        card = row[i]
        revealed = !card.face_down
        row_render << (revealed ? row[i].to_s : " ")
      end
      puts "#{j} #{row_render.join(' ')}"
    end
    # print face value if face up, blank if not
  end

  def find_empty_grid_slot
    empty_slots = []
    @grid.each_with_index do |row, i|
        row.each_with_index do |cell, j| 
            empty_slots << [i, j] if cell.nil?
        end
    end
    
    empty_slots.shuffle[0]
  end

  # def insert_card(card, slot)
  #   row, col = slot
  #   @grid[row][col] = card
  # end
  
  def [](pos)
    row, col = pos
    @grid[row][col]
  end

  def []=(pos, value)
    row, col = pos
    @grid[row][col] = value
    # self[pos] = value
  end

  def won?
    @grid.flatten.all? { |card| !card.face_down }
  end

  def reveal(guessed_pos)
    card = self[guessed_pos] 
    if card.face_down
        card.reveal
        card.face_value
    end
  end

  private
 

end