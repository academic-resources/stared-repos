require_relative 'p05_hash_map'
require_relative 'p04_linked_list'

class LRUCache
  def initialize(max, prc)
    @map = HashMap.new
    @store = LinkedList.new
    @max = max
    @prc = prc
  end

  def count
    @map.count
  end

# buckets have linkedlists
# Cache is also a linked list
# @Store only keeps track of Cache_Nodes, has value we want
# use prc only IF key does not have a value 
# @prc.call(key)

#@map is a hash that contains buckets
#each bucket is a linked list that contains on avg 1 node (aside from head and tail)

#@store is a separate linked list which stores the same keys (not values) in the buckets
#the purpose of @store is just to keep track of their order (in LRU)

# @map holds keys and NODES as values
# When we ask for a value from our Hash, it is returning a node

#in get:
#we need to locate the bucket where key would live if it already exists
#search bucket for key, if it is there:
#   the node in the bucket that matches the key has a value that is a node
#      and that node is the same node that lives in our @store link-list
#      (same object IDs)
#   this means we can jump to that specific node in the @store's link list,
#   remove it and append it to the end (most recently used)
#if the key isn't there
#   add it to the cache (we used calc!)
#   and then add the key to the bucket with the node reference
#   append it to the end of the @store linked list

  def get(key)
    if @map.include?(key)
      store_node = @map.get(key)
      update_node!(store_node)
      store_node.val
    else
      calc!(key)
    end

  end

  def to_s
    'Map: ' + @map.to_s + '\n' + 'Store: ' + @store.to_s
  end

  private

  # suggested helper method; insert an (un-cached) key
  # insert key in hash map, but not linked list

  # find the bucket to be inserted into
  # then should create a node and insert node into that bucket
  # then should add another node to the store with a value affected by prc
  # these are two separate node objects
  # the node in the hash has a key and the value is a node
  # the node in the cache => key is the node, and value is prc.call(node)
  def calc!(key)
    cache_node = Node.new(key, @prc.call(key))
    bucket_node = Node.new(key, cache_node)
    @map.set(key, cache_node)
    @store.append(cache_node.key, cache_node.val)
    eject! if count > @max
    cache_node.val
  end

  # suggested helper method; move a node to the end of the list
  def update_node!(node)
    node.remove
    @store.append(node.key, node.val)
  end

  def eject!
    @store.first.remove 
    @map.delete(@store.first.key)
  end
end

