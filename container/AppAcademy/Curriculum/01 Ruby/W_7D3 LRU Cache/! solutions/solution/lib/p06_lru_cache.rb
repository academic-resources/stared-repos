require_relative 'p05_hash_map'
require_relative 'p04_linked_list'

class LRUCache
  attr_reader :max, :prc

  def initialize(max, prc)
    @map = HashMap.new
    @store = LinkedList.new
    @max = max
    @prc = prc
  end

  def count
    map.count
  end

  def get(key)
    if map[key]
      node = map[key]
      update_node!(node)
      node.val
    else
      calc!(key)
    end
  end

  def to_s
    'Map: ' + map.to_s + '\n' + 'Store: ' + store.to_s
  end

  private

  attr_reader :store, :map

  def calc!(key)
    val = self.prc.call(key)
    new_node = store.append(key, val)
    map[key] = new_node

    eject! if count > self.max
    val
  end

  def update_node!(node)
    node.remove
    map[node.key] = store.append(node.key, node.val)
  end

  def eject!
    rm_node = store.first
    rm_node.remove
    map.delete(rm_node.key)
    nil
  end
end
