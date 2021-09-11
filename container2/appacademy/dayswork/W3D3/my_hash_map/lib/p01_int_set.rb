class MaxIntSet
  def initialize(max)
    @max = max
    @store = Array.new(max, false)
  end

  def insert(num)
    raise "Out of bounds" unless is_valid?(num)
    @store[num] = true
  end

  def remove(num)
    raise "Out of bounds" unless is_valid?(num)
    @store[num] = false
  end

  def include?(num)
    @store[num]
  end

  private

  def is_valid?(num)
    num.between?(0, @max)
  end

  def validate!(num)
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
    bucket = self[num]
    bucket.delete(num)
  end

  def include?(num)
    bucket = self[num]
    bucket.include?(num)
  end

  private

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

  def insert(num)
    unless include?(num)
      resize! if @count == num_buckets
      self[num] << num
      @count += 1
    end
  end

  def remove(num)
    if include?(num)
      bucket = self[num]
      bucket.delete(num)
      @count -= 1
    end
  end

  def include?(num)
    bucket = self[num]
    bucket.include?(num)
  end

  private

  def [](num)
    @store[num % num_buckets]
  end

  def num_buckets
    @store.length
  end

  def resize!
    old_store = @store.dup.flatten
    @store = Array.new(num_buckets * 2) { [] }
    @count = 0
    old_store.each { |int| insert(int) }
  end
end
