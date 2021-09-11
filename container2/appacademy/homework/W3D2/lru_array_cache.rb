class LRUCache
  def initialize(size)
    @cache = []
    @max_size = size
  end

  def count
    @cache.count
  end

  def add(el) # O(n)
    if idx = @cache.find_index(el) # O(n)
      @cache.delete_at(idx) # O(n)
      @cache << el # O(1)
      return
    end
    if count == @max_size
      @cache.shift(1) # O(n)
    end
    @cache << el # O(1)
  end

  def show
    print @cache
  end

  private

  # helper methods go here!

end

johnny_cache = LRUCache.new(4)

johnny_cache.add("I walk the line")
johnny_cache.add(5)

p johnny_cache.count # => returns 2

johnny_cache.add([1, 2, 3])
johnny_cache.add(5)
johnny_cache.add(-5)
johnny_cache.add({ a: 1, b: 2, c: 3 })
johnny_cache.add([1, 2, 3, 4])
johnny_cache.add("I walk the line")
johnny_cache.add(:ring_of_fire)
johnny_cache.add("I walk the line")
johnny_cache.add({ a: 1, b: 2, c: 3 })

johnny_cache.show # => prints [[1, 2, 3, 4], :ring_of_fire, "I walk the line", {:a=>1, :b=>2, :c=>3}]
