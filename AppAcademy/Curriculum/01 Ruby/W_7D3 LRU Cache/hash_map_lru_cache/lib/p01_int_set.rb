class MaxIntSet
  def initialize(max)
    @store = Array.new(max) { false }
  end

  def insert(num)
    raise "Out of bounds" if is_valid?(num)
    @store[num] = true 
  end

  def remove(num)
    @store[num] = false 
  end

  def include?(num)
    @store[num] == true 
  end

  private

  def is_valid?(num)
    num > @store.length || num < 0
  end

  def validate!(num)
    raise "not a valid number!" unless is_valid?(num)
  end
end


class IntSet
  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
  end

  def insert(num)
    self[num] << num
  end

  def remove(num)
    self[num].delete(num)
  end

  def include?(num)
    self[num].include?(num)
  end

  private

  # optional but useful; return the bucket corresponding to `num`
  def [](num)
    @store[num % num_buckets]
  end

  def num_buckets
    @store.length
  end
end

class ResizingIntSet
  attr_reader :count

  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end

  def inspect
    "#{@count}"
  end

  def insert(num)
    unless include?(num)
      self[num] << num 
      @count += 1
      resize! if count > num_buckets
    end 
  end

  def remove(num)
    if include?(num)
      self[num].delete(num)
      @count -= 1
    end
  end

  def include?(num)
    self[num].include?(num)
  end

  private

  def [](num)
    # optional but useful; return the bucket corresponding to `num`
    @store[num % num_buckets]
  end

  def num_buckets
    @store.length
  end

  def resize!
    new_num_buckets = num_buckets * 2
    new_array = Array.new(new_num_buckets) { Array.new }
    @store.flatten.each { |el| new_array[el % new_num_buckets] << el } 
    @store = new_array
  end
end
