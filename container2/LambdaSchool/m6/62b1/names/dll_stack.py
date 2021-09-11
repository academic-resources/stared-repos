import sys
sys.path.append('../doubly_linked_list')
from doubly_linked_list import DoublyLinkedList

# FIFO
class Stack:
    def __init__(self):
        self.size = 0
        self.storage = []

    def push(self, value):
        return self.storage.insert(0, value)

    def pop(self):
        if len(self.storage) == 0:
            return None
        item = self.storage.pop(0)
        return item

    def len(self):
        return len(self.storage)
