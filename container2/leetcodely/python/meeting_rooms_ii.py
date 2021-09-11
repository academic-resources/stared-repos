"""Created by sgoswami on 7/6/17."""
"""Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), 
find the minimum number of conference rooms required."""
import heapq


class Interval(object):
    def __init__(self, s=0, e=0):
        self.start = s
        self.end = e


class Solution(object):
    def minMeetingRooms(self, intervals):
        """
        :type intervals: List[Interval]
        :rtype: int
        """
        if not intervals or len(intervals) == 0:
            return 0
        queue = []
        intervals = sorted(intervals, key=lambda x: x.start)
        heapq.heappush(queue, intervals[0].end)
        for i in range(1, len(intervals)):
            if intervals[i].start >= queue[0]:
                heapq.heappop(queue)
            heapq.heappush(queue, intervals[i].end)
        return len(queue)


if __name__ == '__main__':
    solution = Solution()
    intervals = [Interval(s=0, e=30), Interval(s=5, e=10), Interval(s=15, e=20)]
    print(solution.minMeetingRooms(intervals))
