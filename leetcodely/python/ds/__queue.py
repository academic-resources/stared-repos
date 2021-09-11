"""File appended with _ in the beginning as PyCharm debugger confuses it to be a native class."""


class Queue:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0

    def push(self, item):
        self.size += 1
        if not self.head:
            self.head = Node(item)
            self.tail = self.head
        else:
            p = Node(item)
            self.tail.next = p
            p = self.tail

    def pop(self):
        if not self.head:
            raise ValueError("Popping off an empty queue")

        self.size -= 1
        p = self.head
        self.head = self.head.next
        return p.val

    def peek(self):
        return self.head.val

    def __len__(self):
        return self.size

    def __iter__(self):
        self.top = self.head
        return self

    def __next__(self):
        if self.top:
            curr = self.top
        else:
            raise StopIteration()
        self.top = self.top.next
        return curr.val


class Node:
    def __init__(self, item):
        self.val = item
        self.next = None
