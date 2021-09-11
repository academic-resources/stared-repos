"""Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.
If such arrangement is not possible, it must rearrange it as the lowest possible order (ie, sorted in ascending order).
The replacement must be in-place and use only constant extra memory.
Here are some examples. Inputs are in the left-hand column and its corresponding outputs are in the right-hand column.

1,2,3 → 1,3,2
3,2,1 → 1,2,3
1,1,5 → 1,5,1

"""


class Solution:

    def nextPermutation(self, nums):
        """
        :type nums: List[int]
        :rtype: void Do not return anything, modify nums in-place instead.
        """

        if not nums:
            return nums
        l = len(nums)
        i, j = l - 1, l - 1
        while i >= 0 and nums[i] >= nums[i + 1]:
            i -= 1
        while j > i and nums[j] <= nums[i]:
            j -= 1
        nums[i], nums[j] = nums[j], nums[i]
        nums[i + 1:] = sorted(nums[i + 1:])


if __name__ == '__main__':
    solution = Solution()
    print(solution.nextPermutation([1, 2, 3]))
    print(solution.nextPermutation([3, 2, 1]))
    print(solution.nextPermutation([1, 1, 5]))
