"""Created by sgoswami on 7/18/17."""
"""Given a collection of intervals, merge all overlapping intervals.

For example,
Given [1,3],[2,6],[8,10],[15,18],
return [1,6],[8,10],[15,18]."""

# Definition for an interval.


class Interval(object):
    def __init__(self, s=0, e=0):
        self.start = s
        self.end = e

    def __repr__(self):
        return '[' + str(self.start) + ', ' + str(self.end) + ']'


class Solution(object):
    def merge(self, intervals):
        """
        :type intervals: List[Interval]
        :rtype: List[Interval]
        """
        if not intervals:
            return []
        result = []
        intervals = sorted(intervals, key=lambda x: x.start)
        previous = intervals[0]
        for i in range(1, len(intervals)):
            curr = intervals[i]
            if previous.end < curr.start:
                result.append(previous)
                previous = curr
            elif previous.end >= curr.start:
                curr = Interval(s=previous.start, e=max(previous.end, curr.end))
                previous = curr
        result.append(previous)
        return result


if __name__ == '__main__':
    solution = Solution()
    print(solution.merge([Interval(1, 3), Interval(2, 6), Interval(8, 10), Interval(15, 18)]))
