"""A move consists of taking a point (x, y) and transforming it to either (x, x+y) or (x+y, y).
Given a starting point (sx, sy) and a target point (tx, ty), return True if and only if a sequence of moves exists to
transform the point (sx, sy) to (tx, ty). Otherwise, return False."""


class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __lt__(self, other):
        if self.x < other.x or self.y < other.y:
            return True

    def __eq__(self, other):
        if self.x == other.x and self.y == other.y:
            return True


class Solution(object):
    def reachingPoints(self, sx, sy, tx, ty):
        """
        :type sx: int
        :type sy: int
        :type tx: int
        :type ty: int
        :rtype: bool
        """
        if sx == tx and sy == ty:
            return True
        if sx > tx and sy > ty:
            return False
        return self.reachingPoints(sx + sy, sy, tx, ty) or self.reachingPoints(sx, sx + sy, tx, ty)


if __name__ == '__main__':
    solution = Solution()
    print(solution.reachingPoints(1, 1, 3, 5))
