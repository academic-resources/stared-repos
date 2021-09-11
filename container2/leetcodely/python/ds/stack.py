class Stack:
    def __init__(self):
        self.top = None
        self.size = 0

    def __len__(self):
        return self.size

    def push(self, item):
        node = Node(item)
        if not self.top:
            self.top = node
        else:
            node.next = self.top
            self.top = node
        self.size += 1

    def pop(self):
        if self.size == 0:
            raise ValueError('Popping off an empty stack!')
        item = self.top.val
        self.top = self.top.next
        return item

    def peek(self):
        if self.size == 0:
            raise ValueError('Peeking into an empty stack!')
        return self.top.val

    def __str__(self):
        curr = self.top
        s = '['
        while curr:
            if curr.next:
                s += str(curr.val)
                s += '->'
            else:
                s += str(curr.val)
            curr = curr.next
        s += ']'
        return s


class Node:
    def __init__(self, val):
        self.val = val
        self.next = None


if __name__ == '__main__':
    stack = Stack()
    stack.push(12)
    stack.push(13)
    stack.push(9)
    for item in stack:
        print(item)
    print(stack.peek())
    print(stack)
    stack.pop()
    print(stack)
