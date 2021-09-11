"""Created by sgoswami on 6/16/17."""
"""Given an array of n integers where n > 1, nums, return an array output such that output[i] is equal to the product 
of all the elements of nums except nums[i]
Solve it without division and in O(n).
For example, given [1,2,3,4], return [24,12,8,6]."""


class Solution(object):
    def productExceptSelf(self, nums):
        """
        :type nums: List[int]
        :rtype: List[int]
        """
        # left_product = [1 for _ in range(len(nums))]
        # right_product = [1 for _ in range(len(nums))]
        # cumulative_left, cumulative_right = 1, 1
        # for i in range(len(nums)):
        #     left_product[i] = cumulative_left
        #     cumulative_left *= nums[i]
        #     right_product[-i - 1] = cumulative_right
        #     cumulative_right *= nums[-i - 1]
        # print(left_product)
        # print(right_product)
        # return [left_product[i] * right_product[i] for i in range(len(nums))]
        left_product = [1 for i in range(len(nums))]

        left, right = 1, 1
        for i in range(len(nums)):
            pass


if __name__ == '__main__':
    solution = Solution()
    print(solution.productExceptSelf([1, 2, 3, 4]))
