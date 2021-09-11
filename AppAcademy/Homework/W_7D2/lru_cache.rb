class LRUCache
  def initialize(cache_size)
    @cache_size = cache_size
    @cache = []
  end

  # returns number of elements currently in cache
  def count
    @cache.length
  end

  # adds element to cache according to LRU principle
  def add(el)
    return @cache << el unless count == 4
    @cache.include?(el) ? @cache.delete(el) : @cache.shift
    @cache << el
  end

  # shows the items in the cache, with the LRU item first
  def show
    print @cache
    puts
  end

  # helper methods go here!
  private

end

johnny_cache = LRUCache.new(4)

johnny_cache.add("I walk the line")
johnny_cache.add(5)

p johnny_cache.count # => returns 2

johnny_cache.add([1,2,3])
johnny_cache.add(5)
johnny_cache.add(-5)
johnny_cache.add({a: 1, b: 2, c: 3})
johnny_cache.add([1,2,3,4])
johnny_cache.add("I walk the line")
johnny_cache.add(:ring_of_fire)
johnny_cache.add("I walk the line")
johnny_cache.add({a: 1, b: 2, c: 3})


johnny_cache.show # => prints [[1, 2, 3, 4], :ring_of_fire, "I walk the line", {:a=>1, :b=>2, :c=>3}]