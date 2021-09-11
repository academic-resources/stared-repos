class Array
    def my_uniq
        output = []
        self.each do |el|
            output << el unless output.include?(el)
        end
        output
    end

    def two_sum
        output = []
        (0...self.length - 1).each do |i|
            (i...self.length).each do |j|
                output << [i,j] if self[i] + self[j] == 0
            end
        end
        output
    end

    def my_transpose
        output = Array.new(self.length) { Array.new(self.length) }
        (0...self.length).each do |row|
            (0...self.length).each do |col|
                output[col][row] = self[row][col]
            end
        end
        output
    end
end