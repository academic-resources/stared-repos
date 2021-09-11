require "byebug"
require_relative 'p04_linked_list'

class HashMap
  include Enumerable

  attr_accessor :count

  def initialize(num_buckets = 8)
    @store = Array.new(num_buckets) { LinkedList.new }
    @count = 0
  end

  def include?(key)
    bucket(key).include?(key)
  end

  def set(key, val)
    bucket_link = bucket(key)
    if bucket_link.include?(key)
      bucket_link.update(key, val)
    else
      bucket_link.append(key, val)
      self.count += 1
      resize! if count > num_buckets
    end
  end

  def get(key)
    bucket(key).get(key)
  end

  def delete(key)
    if include?(key)
      bucket(key).remove(key)
      self.count -= 1
    end
  end

  def each(&prc)
    @store.each do |bucket|
      bucket.each do |node|
        prc.call(node.key, node.val)
      end
    end
  end

  # uncomment when you have Enumerable included
  def to_s
    pairs = inject([]) do |strs, (k, v)|
      strs << "#{k.to_s} => #{v.to_s}"
    end
    "{\n" + pairs.join(",\n") + "\n}"
  end

  alias_method :[], :get
  alias_method :[]=, :set

  private

  def num_buckets
    @store.length
  end

  def resize!
    new_num_buckets = num_buckets * 2
    new_hash = Array.new(new_num_buckets) { LinkedList.new }
    self.each do |k, v|
      new_bucket = k.hash % new_num_buckets
      new_hash[new_bucket].append(k, v)
    end
    @store = new_hash
  end

  # optional but useful; return the bucket corresponding to `key`
  def bucket(key)
    @store[key.hash % num_buckets]
  end
end
