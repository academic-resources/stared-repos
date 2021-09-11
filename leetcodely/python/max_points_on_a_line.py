from collections import Counter, defaultdict


class Solution:
    def maxPoints(self, points: list[list[int]]) -> int:
        if not points or len(points) == 0:
            return 0
        points = [(point[0], point[1]) for point in points]
        repeated = Counter(points)
        points = list(set(points))
        if len(points) < 3:
            return sum(repeated.values())
        lines = {}

        def slope(p1, p2):
            if p1[1] == p2[1]:
                return 0
            return (p2[0] - p1[0])/(p2[1] - p1[1])
        count = 0
        for i in range(len(points) - 1):
            lines[count] = [points[i], points[i+1]]
            j = 2
            while i+j < len(points):
                curr = points[i+j]
                if slope(points[i], points[i+1]) == slope(points[i], points[i+j]):
                    lines[count].append(points[i+j])
                j += 1
            count += 1


#TODO: Incomplete