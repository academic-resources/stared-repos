"""Created by sgoswami on 10/7/17."""
"""Design a data structure that supports all following operations in average O(1) time.

insert(val): Inserts an item val to the set if not already present.
remove(val): Removes an item val from the set if present.
getRandom: Returns a random element from current set of elements. Each element must have the same probability of 
being returned."""
import random


class RandomizedSet(object):
    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.map = {}
        self.store = []
        self.curr_index = 0

    def insert(self, val):
        """
        Inserts a value to the set. Returns true if the set did not already contain the specified element.
        :type val: int
        :rtype: bool
        """
        if val in self.map:
            return False
        self.map[val] = self.curr_index
        self.store.append(val)
        self.curr_index += 1
        return True

    def remove(self, val):
        """
        Removes a value from the set. Returns true if the set contained the specified element.
        :type val: int
        :rtype: bool
        """
        if val not in self.map:
            return False
        swap_index = self.map[val]
        self.map[self.store[self.curr_index - 1]] = swap_index
        self.store[swap_index], self.store[self.curr_index - 1] = self.store[self.curr_index - 1], self.store[
            swap_index]
        self.store.pop()
        self.curr_index -= 1
        self.map.pop(val)
        return True

    def getRandom(self):
        """
        Get a random element from the set.
        :rtype: int
        """
        index = random.randint(0, self.curr_index -1)
        return self.store[index]
