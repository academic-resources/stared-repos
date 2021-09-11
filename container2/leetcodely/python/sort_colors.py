"""Created by sgoswami on 7/19/17."""
"""Given an array with n objects colored red, white or blue, sort them so that objects of the same color are adjacent, 
with the colors in the order red, white and blue.

Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.

Note:
You are not suppose to use the library's sort function for this problem."""
import collections


class Solution(object):
    def sortColors(self, nums):
        """
        :type nums: List[int]
        :rtype: void Do not return anything, modify nums in-place instead.
        """
        count_map = collections.Counter(nums)
        a, b, c = count_map[0], count_map[1], count_map[2]
        i = 0
        while a > 0:
            nums[i] = 0
            i += 1
            a -= 1
        while b > 0:
            nums[i] = 1
            i += 1
            b -= 1
        while c > 0:
            nums[i] = 2
            i += 1
            c -= 1
        print(nums)


if __name__ == '__main__':
    solution = Solution()
    print(solution.sortColors([1, 1, 0, 2, 2, 1, 0, 2, 1, 2, 0, 0]))