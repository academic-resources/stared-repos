class Integer
  # Integer#hash already implemented for you
end

class Array
  def hash
    self.each_with_index.reduce(12345678) { |acc, pair| (acc ^ (pair[0] * (pair[1] + 1))) }.to_s(2).to_i
  end
end

class String
  def hash
    self.each_char.map.with_index { |c, i| c.ord * (i + 1) }
      .each_with_index.reduce(12345678) do |acc, pair|
      (acc ^ (pair[0] * pair[1]))
    end.to_s(2).to_i
  end
end

class Hash
  # This returns 0 because rspec will break if it returns nil
  # Make sure to implement an actual Hash#hash method
  def hash
    self.each.reduce(12345678) do |acc, pair|
      acc ^ (self[pair[0]].hash)
    end.to_s(2).to_i
  end
end
