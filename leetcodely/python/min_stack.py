"""Created by sgoswami on 10/7/17."""
"""Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

push(x) -- Push element x onto stack.
pop() -- Removes the element on top of the stack.
top() -- Get the top element.
getMin() -- Retrieve the minimum element in the stack."""
import sys


class MinStack(object):
    def __init__(self):
        """
        initialize your data structure here.
        """
        self.stack = []
        self.min_stack = []

    def push(self, x):
        """
        :type x: int
        :rtype: void
        """
        self.stack.append(x)
        if len(self.min_stack) == 0 or x <= self.min_stack[-1]:
            self.min_stack.append(x)

    def pop(self):
        """
        :rtype: void
        """
        if self.stack[-1] == self.min_stack[-1]:
            self.stack.pop()
            self.min_stack.pop()
        else:
            self.stack.pop()

    def top(self):
        """
        :rtype: int
        """
        return self.stack[-1]

    def getMin(self):
        """
        :rtype: int
        """
        return self.min_stack[-1]


if __name__ == '__main__':
    minStack = MinStack()
    minStack.push(12)
    minStack.push(9)
    minStack.push(13)
    minStack.push(3)
    print(minStack.getMin())
    minStack.pop()
    print(minStack.getMin())
    print(minStack.top())



