"""Design a max stack that supports push, pop, top, peekMax and popMax.

push(x) -- Push element x onto stack.
pop() -- Remove the element on top of the stack and return it.
top() -- Get the element on the top.
peekMax() -- Retrieve the maximum element in the stack.
popMax() -- Retrieve the maximum element in the stack, and remove it. If you find more than one maximum elements,
only remove the top-most one."""


class MaxStack:

    def __init__(self):
        """
        initialize your data structure here.
        """
        self.stack = []
        self.max_stack = []

    def push(self, x):
        """
        :type x: int
        :rtype: void
        """
        self.stack.append(x)
        if len(self.max_stack) == 0 or x > self.max_stack[-1]:
            self.max_stack.append(x)

    def pop(self):
        """
        :rtype: int
        """
        if self.stack[-1] == self.max_stack[-1]:
            self.stack.pop()
            self.max_stack.pop()
        else:
            self.stack.pop()

    def top(self):
        """
        :rtype: int
        """
        return self.stack[-1]

    def peekMax(self):
        """
        :rtype: int
        """
        return self.max_stack[-1]

    def popMax(self):
        """
        :rtype: int
        """