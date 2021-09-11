require_relative 'p04_linked_list'

class HashMap
  include Enumerable

  attr_accessor :store, :count

  def initialize(num_buckets = 8)
    @store = Array.new(num_buckets) { LinkedList.new }
    @count = 0
  end

  def include?(key)
    bucket(key).include?(key)
  end

  def set(key, val)
    resize! if self.count >= num_buckets

    if include?(key)
      bucket(key).update(key, val)
    else
      bucket(key).append(key, val)
      self.count += 1
    end
  end

  def get(key)
    bucket(key).get(key)
  end

  def delete(key)
    removal = bucket(key).remove(key)
    self.count -= 1 if removal
    removal
  end

  def each
    self.store.each do |bucket|
      bucket.each { |link| yield [link.key, link.val] }
    end
  end

  def to_s
    pairs = inject([]) do |strs, (k, v)|
      strs << "#{k} => #{v}"
    end
    "{\n" + pairs.join(",\n") + "\n}"
  end

  alias_method :inspect, :to_s
  alias_method :[], :get
  alias_method :[]=, :set

  private

  def num_buckets
    self.store.length
  end

  def resize!
    old_store = self.store
    self.store = Array.new(num_buckets * 2) { LinkedList.new }
    self.count = 0

    old_store.each do |bucket|
      bucket.each { |link| set(link.key, link.val) }
    end
  end

  def bucket(key)
    self.store[key.hash % num_buckets]
  end
end
