"""Created by sgoswami on 7/19/17."""
"""Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), 
determine if a person could attend all meetings.

For example,
Given [[0, 30],[5, 10],[15, 20]],
return false."""
import heapq

# Definition for an interval.
class Interval(object):
    def __init__(self, s=0, e=0):
        self.start = s
        self.end = e


class Solution(object):
    def canAttendMeetings(self, intervals):
        """
        :type intervals: List[Interval]
        :rtype: bool
        """
        if not intervals or len(intervals) == 0:
            return True
        heap = []
        intervals = sorted(intervals, key=lambda x: x.start)
        heapq.heappush(heap, intervals[0].end)
        for i in range(1, len(intervals)):
            if intervals[i].start >= heap[0]:
                heapq.heappop(heap)
            heapq.heappush(heap, intervals[i].end)
        return len(heap) == 1
