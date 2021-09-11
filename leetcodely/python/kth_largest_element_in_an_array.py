"""Created by sgoswami on 9/13/17."""
"""Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, 
not the kth distinct element.

For example,
Given [3,2,1,5,6,4] and k = 2, return 5."""
import heapq

class Solution(object):
    def findKthLargest(self, nums, k):
        """
        :type nums: List[int]
        :type k: int
        :rtype: int
        """
        queue = []
        for num in nums:
            heapq.heappush(queue, num)
        return heapq.nlargest(k, queue)[-1]


if __name__ == '__main__':
    solution = Solution()
    print(solution.findKthLargest([3, 2, 1, 5, 6, 4], 2))
