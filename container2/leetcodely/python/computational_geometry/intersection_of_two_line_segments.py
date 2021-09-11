"""Given two line segments represented by tuples, find if they interesect."""


class Solution:
    def intersect(self, p1, q1, p2, q2):
        o1 = self.find_orientation(p1, q1, p2)
        o2 = self.find_orientation(p1, q1, q2)
        o3 = self.find_orientation(p2, q2, p1)
        o4 = self.find_orientation(p2, q2, q1)
        if o1 != o2 and o3 != o4:
            return True
        if o1 == 0 and self.lies_on_segment(p1, p2, q1):
            return True
        if o2 == 0 and self.lies_on_segment(p1, q2, q1):
            return True
        if o3 == 0 and self.lies_on_segment(p2, p1, q2):
            return True
        if o4 == 0 and self.lies_on_segment(p2, q1, q2):
            return True
        return False

    # Given 3 points the function checks their orientation and returns 0 for colinear 1 for clockwise and -1 for anticlockwise
    def find_orientation(self, p, q, r):
        val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y)
        if val == 0:
            return 0
        return 1 if val > 0 else -1

    # Given 3 points the function checks if q lies in the line segment pr
    def lies_on_segment(self, p, q, r):
        if q.x <= max(p.x, r.x) and q.x >= min(p.x, r.x) and q.y <= max(p.y, r.y) and q.y >= min(p.y, r.y):
            return True
        return False


class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y


if __name__ == '__main__':
    solution = Solution()
    print(solution.intersect(Point(1, 1), Point(10, 1), Point(1, 2), Point(10, 2)))
    print(solution.intersect(Point(10, 0), Point(0, 10), Point(0, 0), Point(10, 10)))
    print(solution.intersect(Point(-5, -5), Point(0, 0), Point(1, 1), Point(10, 10)))