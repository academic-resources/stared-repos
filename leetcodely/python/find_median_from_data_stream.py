import heapq


class MedianFinder:

    def __init__(self):
        """
        initialize your data structure here.
        """
        self.max_heap = []
        self.min_heap = []
        self.median = float('inf')

    def addNum(self, num: int) -> None:
        if num < self.median:
            heapq.heappush(self.max_heap, -1 * num)
        else:
            heapq.heappush(self.min_heap, num)
        self._rebalance()
        self._update_median()

    def findMedian(self) -> float:
        return self.median

    def _rebalance(self) -> None:
        if abs(len(self.max_heap) - len(self.min_heap)) > 1:
            if len(self.max_heap) > len(self.min_heap):
                temp = heapq.heappop(self.max_heap)
                heapq.heappush(self.min_heap, -1 * temp)
            else:
                temp = heapq.heappop(self.min_heap)
                heapq.heappush(self.max_heap, -1 * temp)

    def _update_median(self) -> None:
        if (len(self.max_heap) + len(self.min_heap)) % 2 == 0:
            self.median = ((self.max_heap[0] * -1) + self.min_heap[0]) / 2
        else:
            if len(self.max_heap) > len(self.min_heap):
                self.median = -1 * self.max_heap[0]
            else:
                self.median = self.min_heap[0]

# Your MedianFinder object will be instantiated and called as such:
# obj = MedianFinder()
# obj.addNum(num)
# param_2 = obj.findMedian()
