class HashSet
  attr_reader :count

  def initialize(num_buckets = 8)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end

  def insert(key)
    unless include?(key)
      resize! if @count == num_buckets
      self[key.hash] << key
      @count += 1
    end
  end

  def include?(key)
    bucket = self[key.hash]
    bucket.include?(key)
  end

  def remove(key)
    if include?(key)
      bucket = self[key.hash]
      bucket.delete(key)
      @count -= 1
    end
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
