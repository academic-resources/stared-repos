
from singly_linked_list import LinkedList
"""
A stack is a data structure whose primary purpose is to store and
return elements in Last In First Out order. 
1. [X] Implement the Stack class using an array as the underlying storage structure.
   Make sure the Stack tests pass.
2. [X] Re-implement the Stack class, this time using the linked list implementation
   as the underlying storage structure.
   Make sure the Stack tests pass.
3. [X] What is the difference between using an array vs. a linked list when 
   implementing a Stack?
   Major difference is, arrays are index-based data structure and each element of the array is associated with an index.  With a linked list, it relies on pointers; each node has the data and then pointers to both previous and next elements.  You use binary or linear searches to traverse arrays; linear to traverse linked lists.  Arrays are directly or randomly accessed and you can access any element in them; stacks are accessed via last or first pointer only.
"""


class Stack:
    def __init__(self):
        self.size = 0
        self.storage = LinkedList()

    def __len__(self):
            return self.size

    def push(self, value):
            self.size += 1
            self.storage.add_to_head(value)

    def pop(self):
        if self.size == 0:
            return None
        else:
            self.size -= 1
            return self.storage.remove_from_head()
