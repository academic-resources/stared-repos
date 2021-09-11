class Array

  def my_uniq
    array = []
    self.each { |el| array << el unless array.include?(el) }
    array
  end

  def two_sum
    pairs = []
    
    (0...length - 1).each do |i1|
      (i1 + 1...length).each do |i2|
        pairs << [i1, i2].sort if self[i1] + self[i2] == 0
      end
    end
    
    pairs 
  end

  def my_transpose
    transposed = []

    self.each_with_index do |row, i|
      nest = []
      self.each do |col|
        nest << col[i]
      end
      transposed << nest
    end
    
    transposed
  end

  def stock_picker
    [self.index(self.min), self.index(self.max)]
  end

end