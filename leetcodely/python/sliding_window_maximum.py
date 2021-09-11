"""Created by sgoswami on 10/4/17."""
"""Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the
 very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position."""
import sys


class Solution(object):
    def maxSlidingWindow(self, nums, k):
        """
        :type nums: List[int]
        :type k: int
        :rtype: List[int]
        """
        results = []
        curr_max_left, curr_max_right = nums[0], nums[-1]
        max_left = [0 for _ in range(len(nums))]
        max_right = [0 for _ in range(len(nums))]
        for i in range(len(nums)):
            j = i % k
            if j == 0:
                curr_max_left = nums[i]
                max_left[i] = curr_max_left
            else:
                curr_max_left = max(nums[i], curr_max_left)
                max_left[i] = curr_max_left

        for i in range(len(nums) -1, -1, -1):
            j = i % k
            if j == 0:
                curr_max_right = nums[i]
                max_right[i] = curr_max_right
            else:
                curr_max_right = max(nums[i], curr_max_right)
                max_right[i] = curr_max_right

        for i in range(len(nums) - k):
            curr_max = max(max_left[i], max_right[i + k -1])
            results.append(curr_max)
        return results

if __name__ == '__main__':
    solution = Solution()
    print(solution.maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))


#TODO: Still needs debugging.