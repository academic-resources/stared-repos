class Integer
  # Integer#hash already implemented for you
  
end

# [1, 2, 3].hash => 9759640876809870
# [3, 1, 2].hash => 1242164353867556
class Array
  def hash
    result = 0
    self.each_with_index { |el, i| result += (el.hash * (i + 3) ) }
    result
  end
end

class String
  def hash
    result = 0
    self.each_char.with_index { |el, i| result += el.ord.hash * (i + 3) }
    result
  end
end

class Hash
  # This returns 0 because rspec will break if it returns nil
  # Make sure to implement an actual Hash#hash method
  def hash
    # result = 0
    # puts self
    self.to_a.sort_by(&:hash).hash
    # result
  end
end
