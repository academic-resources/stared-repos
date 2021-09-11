"""Created by sgoswami on 8/6/17."""
"""The set S originally contains numbers from 1 to n. But unfortunately, due to the data error, one of the numbers 
in the set got duplicated to another number in the set, which results in repetition of one number and loss of another 
number.

Given an array nums representing the data status of this set after the error. Your task is to firstly find the number 
occurs twice and then find the number that is missing. Return them in the form of an array."""
import collections


class Solution(object):
    def findErrorNums(self, nums):
        """
        :type nums: List[int]
        :rtype: List[int]
        """
        index_map = {i+1: 0 for i in range(len(nums))}
        duplicate, missing = -1, -1
        for item in nums:
            index_map[item] += 1
        for k, v in index_map.items():
            if v == 2:
                duplicate = k
            if v == 0:
                missing = k

        return [duplicate, missing]


if __name__ == '__main__':
    solution = Solution()
    print(solution.findErrorNums([1, 5, 3, 2, 2, 7, 6, 4, 8, 9]))