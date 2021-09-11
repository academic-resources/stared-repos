from doubly_linked_list import DoublyLinkedList
class LRUCache:
    def __init__(self, limit=10):
        # Our LRUCache class keeps track of:
        # the max number of nodes it can hold
        self.max = limit
        # a doubly-linked list that holds the key-value entries in the correct order
        self.node_list = DoublyLinkedList()
        # a storage dict that provides fast access to every node stored in the cache
        self.storage = dict()

    def get(self, key):
        if not key in self.storage:
            return None
        list_value = self.storage[key]
        if list_value is not None:
            lruc_node = self.node_list.find(key)
            self.node_list.move_to_front(lruc_node)
        return list_value

        # needs to move the key-value pair to the end of the order such that the pair is considered most-recently used
        if key in self.keys:
            # Retrieves the value associated with the given key
            index = self.keys.index(key)
            self.keys.pop(index)
            self.keys.append(key)
            # Returns the value associated with the key
            return self.storage[key]

        # Returns None if the key-value pair doesn't exist in the cache.
        else:
           return None

    def set(self, key, value):
        # Adds the given key-value pair to the cache. The newly- added pair should be considered the most-recently used entry in the cache.
        if not key in self.storage:
            self.storage[key] = value
            self.node_list.add_to_head(key)
        # Additionally, in the case that the key already exists in the cache, we simply want to overwrite the old value associated with the key with the newly-specified value.
        else:
            self.storage[key] = value
            lruc_node = self.node_list.find(key)
            self.node_list.move_to_front(lruc_node)
        # If the cache is already at max capacity before this entry is added, then the oldest entry in the cache needs to be removed to make room.
        if len(self.node_list) > self.max:
            del self.storage[self.node_list.tail.value]
            self.node_list.remove_from_tail()

