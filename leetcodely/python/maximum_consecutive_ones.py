class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        curr_window, max_window = 0, 0
        for i in range(len(nums)):
            if nums[i] == 1:
                curr_window += 1
            else:
                max_window = max(max_window, curr_window)
                curr_window = 0
        return max(max_window, curr_window)