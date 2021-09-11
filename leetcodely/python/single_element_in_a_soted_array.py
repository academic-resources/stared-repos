"""Created by sgoswami on 6/5/17."""


class Solution(object):
    def singleNonDuplicate(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        low, high = 0, len(nums) -1
        while low < high:
            mid = low + (high -low)/2
            if nums[mid] != nums[mid -1] and nums[mid] != nums[mid +1]:
                return nums[mid]
            elif nums[mid] == nums[mid-1] and mid%2 == 0:
                high = mid -1
            elif nums[mid] == nums[mid +1] and mid%2 != 0:
                high = mid -1
            else:
                low = mid +1

        return nums[low]
