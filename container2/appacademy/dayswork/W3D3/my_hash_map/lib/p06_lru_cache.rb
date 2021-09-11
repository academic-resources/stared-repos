require_relative 'p05_hash_map'
require_relative 'p04_linked_list'

class LRUCache
  def initialize(max, prc)
    @map = HashMap.new(max)
    @store = LinkedList.new
    @max = max
    @prc = prc
  end

  def count
    @map.count
  end

  def get(key)
    result = @map.get(key)
    if result.nil?
      eject! if count == @max
      @store.append(key, @prc.call(key))
      @map.set(key, @store.last )
    else
      update_node!(result)
    end
    @store.last.val
  end
  
  def to_s
    'Map: ' + @map.to_s + '\n' + 'Store: ' + @store.to_s
  end
  
  private
  
  def calc!(key)
    # suggested helper method; insert an (un-cached) key
  end
  
  def update_node!(node)
    @store.remove(node.key)
    @store.append(node.key, node.val)
    @map.set(node.key, @store.last )
  end

  def eject!
    oldest = @store.first
    @store.remove(oldest.key)
    @map.delete(oldest.key)
  end
end

