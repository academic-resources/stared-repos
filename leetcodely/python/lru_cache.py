"""Design and implement a data structure for Least Recently Used (LRU) cache.
    It should support the following operations: get and set.

    get(key) - Get the value (will always be positive) of the key
    if the key exists in the cache, otherwise return -1.

    set(key, value) - Set or insert the value if the key is not already present.
    When the cache reached its capacity, it should invalidate the least recently
    used item before inserting a new item."""


class LRUCache:
    def __init__(self, capacity):
        """
        :type capacity: int
        """
        self.head = None
        self.tail = None
        self.table = {}
        self.capacity = capacity
        self.curr_index = 0

    def get(self, key):
        """
        :type key: int
        :rtype: int
        """
        if key in self.table:
            p = self.table[key]
            self._update(p)
            # p.prev.next = p.next if p.next else None
            # p.next.prev = p.prev if p.prev else None
            # p.next = self.head
            # self.head.prev = p
            # self.head = p
            return self.head.value
        else:
            return -1

    def put(self, key, value):
        """
        :type key: int
        :type value: int
        :rtype: void
        """
        if key in self.table:
            p = self.table[key]
            p.value = value
        else:
            p = Node(key, value)
            self.table[key] = p
            if self.capacity == 0:
                q = self.table[self.tail.key]
                self.table.pop(q.key)
                self.tail.prev = self.tail
                self.tail.next = None
                p.next = self.head
                self.head.prev = p
                self.head = p

            else:
                if not self.head:
                    self.head = self.tail = p
                else:
                    p.next = self.head
                    self.head.prev = p
                    self.head = p
                self.capacity -= 1

    def _update(self, p):
        if p.next and p.prev:
            p.next.prev = p.prev
            p.prev.next = p.prev
        elif p.next:
            p.next.prev = None
        elif p.prev:
            p.prev.next = None


class Node:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None


if __name__ == '__main__':
    cache = LRUCache(2)

    print(cache.get(2))
    cache.put(2, 6)
    print(cache.get(1))  # returns 1
    cache.put(1, 5)  # evicts key 2
    cache.put(1, 2)  # evicts key 1
    print(cache.get(1))  # returns - 1(not found)
    print(cache.get(2))  # returns 3

"""On get update order
On put -> if key already present update order
If key new pop the least recently used and update key"""
