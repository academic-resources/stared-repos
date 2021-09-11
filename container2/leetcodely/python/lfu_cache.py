"""Created by sgoswami on 9/13/17."""
"""Design and implement a data structure for Least Frequently Used (LFU) cache. It should support the following operations: get and put.

get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
put(key, value) - Set or insert the value if the key is not already present. When the cache reaches its capacity, it should invalidate the least frequently used item before inserting a new item. For the purpose of this problem, 
when there is a tie (i.e., two or more keys that have the same frequency), the least recently used key 
would be evicted."""
import queue

class LFUCache(object):
    def __init__(self, capacity):
        """
        :type capacity: int
        """
        self.value_map = {}
        self.freq_map = {}
        self.usage_queue = queue.PriorityQueue(capacity, key=self.cmp_nodes)



    def get(self, key):
        """
        :type key: int
        :rtype: int
        """
        if key in self.value_map:
            self.freq_map[key].update()
            return self.value_map[key]
        else:
            return -1

    def put(self, key, value):
        """
        :type key: int
        :type value: int
        :rtype: void
        """
        if key in

    def cmp_nodes(self, n1, n2):
        return n1.freq < n2.freq


class Node:
    def __init__(self, key):
        self.key = key
        self.freq = 1

    def update(self):
        self.freq += 1
