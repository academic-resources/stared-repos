# Problem 1:  Find the Duplicate Number

# Given an array nums containing n + 1 integers where each integer is between 1 and n (inclusive), prove that at least one duplicate number must exist. Assume that there is only one duplicate number, find the duplicate one.


def findDuplicate(nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        set_array = list(set(nums))

        if set_array == nums:
            return None
        else:
            sorted_nums = sorted(nums)
            for x in range(0, len(sorted_nums)):
                if x <= len(sorted_nums)-2:
                    if sorted_nums[x] == sorted_nums[x + 1]:
                        return sorted_nums[x]

findDuplicate([3, 1, 3, 4, 2])

# Problem 2:  Search in Rotated Sorted Array

def search(nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: int
        """

        '''
        Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.
        (i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).
        You are given a target value to search. If found in the array return its index, otherwise return -1.
        You may assume no duplicate exists in the array.
        runtime complexity must be in the order of O(log n).
        '''
        if target not in nums:
            return -1
        else:
            return nums.index(target)
            

search([4, 5, 6, 7, 0, 1, 2], 3)
search([4, 5, 6, 7, 0, 1, 2], 0)
