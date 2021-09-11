"""Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window."""
from collections import deque


class MovingAverage(object):

    def __init__(self, size):
        """
        Initialize your data structure here.
        :type size: int
        """
        self.capacity = size
        self.size = 0
        self.queue = deque()
        self.total = 0

    def next(self, val):
        """
        :type val: int
        :rtype: float
        """
        if self.size < self.capacity:
            self.queue.appendleft(val)
            self.total += val
            self.size += 1
            return self.total / self.size

        else:
            p = self.queue.pop()
            self.total -= p
            self.queue.appendleft(val)
            self.total += val
            return self.total / self.size


if __name__ == '__main__':
    m = MovingAverage(3)
    print(m.next(1))
    print(m.next(10))
    print(m.next(3))
    print(m.next(5))
