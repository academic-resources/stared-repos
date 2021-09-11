"""Given an array of integers, return indices of the two numbers such that they add up to a
    specific target.You may assume that each input would have exactly one solution."""

"""Store the number against the index in a dict
While traversing the dict if target - curr is in the dict, return the curr index and the index of target - curr """


def two_sum(nums, target):
    index_map = {}
    for i in range(len(nums)):
        if target - nums[i] in index_map:
            return i, index_map[target - nums[i]]
        index_map[nums[i]] = i