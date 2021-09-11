import sys
sys.path.append('../doubly_linked_list')
from doubly_linked_list import DoublyLinkedList


class Queue:
    def __init__(self):
        self.size = 0
        # Why is our DLL a good choice to store our elements?
        self.storage = []

    def enqueue(self, value):
        return self.storage.append(value)

    def dequeue(self):
        if len(self.storage) == 0:
            return None
        item = self.storage.pop(0)
        return item

    def len(self):
        return len(self.storage)
