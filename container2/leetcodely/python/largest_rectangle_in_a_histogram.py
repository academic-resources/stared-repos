"""Created by sgoswami on 9/4/17."""
"""Given n non-negative integers representing the histogram's bar height where the width of each bar is 1, find 
the area of largest rectangle in the histogram."""

#TODO: Still not completely correct
import sys


class Stack:
    def __init__(self):
        self.store = []
        self.size = 0

    def push(self, item):
        self.store.append(item)
        self.size += 1

    def peek(self):
        if self.size == 0:
            return KeyError('Peeking an empty stack')
        return self.store[-1]

    def pop(self):
        if self.size == 0:
            return KeyError('Popping an empty stack')
        self.size -= 1
        return self.store.pop()

    def is_empty(self):
        return self.size == 0


class Solution(object):
    def largestRectangleArea(self, heights):
        """
        :type heights: List[int]
        :rtype: int
        """
        if not heights or len(heights) == 0:
            return 0
        stack = Stack()
        max_area = -sys.maxsize
        for i in range(len(heights)):
            if stack.is_empty() or stack.peek() < heights[i]:
                stack.push(heights[i])
            else:
                while stack.peek() > heights[i] or stack.is_empty():
                    count = 1
                    curr = stack.pop()
                    area = count * curr
                    max_area = max(area, max_area)
                    count += 1
        while stack.is_empty():
            count = 1
            curr = stack.pop()
            area = count * curr
            max_area = max(area, max_area)
            count += 1

        return max_area


if __name__ == '__main__':
    solution = Solution()
    print(solution.largestRectangleArea([2, 1, 5, 6, 2, 3]))


