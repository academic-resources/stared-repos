class Integer
  # Integer#hash already implemented for you
end

class Array
  def hash
    # turn an array into a long random integer
    # hash every element inside the array
    self.map.with_index { |el, i| el.hash * (i + 1) }.sum
  end
end

class String
  def hash
    self.chars.map.with_index { |char, i| char.ord.hash * (i + 1) }.sum 
  end
end

class Hash
  # This returns 0 because rspec will break if it returns nil
  # Make sure to implement an actual Hash#hash method
  def hash
    self.keys.map { |key| key.to_s.hash }.sum
  end
end
