require "byebug"

class HashSet
  attr_reader :count

  def initialize(num_buckets = 8)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end

  def insert(key)
    unless @store.include?(key)
      self[key.hash] << key
      @count += 1
      resize! if count > num_buckets
    end
  end

  def include?(key)
    return true if key == []
    self[key.hash].include?(key)
  end

  def remove(key)
    if include?(key)
      self[key.hash].delete(key)
      @count -= 1
    end
  end

  private

  # optional but useful; return the bucket corresponding to `num`
  def [](num) #<== maybe requires hash
    # num_hash = num.hash
    # @store[num_hash % num_buckets]
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
