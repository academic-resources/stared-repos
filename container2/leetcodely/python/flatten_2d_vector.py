"""Implement an iterator to flatten a 2d vector."""


class Vector2D(object):

    def __init__(self, vec2d):
        """
        Initialize your data structure here.
        :type vec2d: List[List[int]]
        """

        def get():
            for row in vec2d:
                for col in row:
                    yield col

        self.itr = iter(get())
        self.curr = next(self.itr, None)

    def next(self):
        """
        :rtype: int
        """
        if self.hasNext():
            p = self.curr
            self.curr = next(self.itr, None)
            return p

    def hasNext(self):
        """
        :rtype: bool
        """
        return self.curr is not None
