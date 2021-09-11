"""Created by sgoswami on 7/22/17."""

"""Given a sorted array, remove the duplicates in place such that each element appear only once and return the new 
length.
Do not allocate extra space for another array, you must do this in place with constant memory.

For example,
Given input array nums = [1,1,2],
Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively. 
It doesn't matter what you leave beyond the new length."""


class Solution(object):
    def removeDuplicates(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        if len(nums) == 0:
            return 0
        curr, idx, count = nums[0], 1, 1

        for i, v in enumerate(nums):
            if v != curr:
                nums[idx] = v
                curr = v
                count += 1
                idx += 1
        print(nums)
        return count


if __name__ == '__main__':
    solution = Solution()
    print(solution.removeDuplicates([1, 1, 2, 2, 2, 3]))

