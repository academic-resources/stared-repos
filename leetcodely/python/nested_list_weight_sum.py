"""Created by sgoswami on 7/26/17."""
"""Given a nested list of integers, return the sum of all integers in the list weighted by their depth.
Each element is either an integer, or a list -- whose elements may also be integers or other lists.

Example 1:
Given the list [[1,1],2,[1,1]], return 10. (four 1's at depth 2, one 2 at depth 1)

Example 2:
Given the list [1,[4,[6]]], return 27. (one 1 at depth 1, one 4 at depth 2, and one 6 at depth 3; 1 + 4*2 + 6*3 = 27)"""


# """
# This is the interface that allows for creating nested lists.
# You should not implement it, or speculate about its implementation
# """
class NestedInteger(object):
    def __init__(self, item=None):
        self.item = item

    def isInteger(self):
        """
        @return True if this NestedInteger holds a single integer, rather than a nested list.
        :rtype bool
        """
        if type(self.item) == int:
            return True
        return False

    def getInteger(self):
        """
        @return the single integer that this NestedInteger holds, if it holds a single integer
        Return None if this NestedInteger holds a nested list
        :rtype int
        """
        if type(self.item) == int:
            return self.item
        return None

    def getList(self):
        """
        @return the nested list that this NestedInteger holds, if it holds a nested list
        Return None if this NestedInteger holds a single integer
        :rtype List[NestedInteger]
        """
        if type(self.item) == list:
            return self.item
        return None


class Solution(object):
    def depthSum(self, nestedList):
        """
        :type nestedList: List[NestedInteger]
        :rtype: int
        """
        res = [0]

        def helper(lst, level):
            for item in lst:
                if item.isInteger():
                    res[0] += item.getInteger() * level
                else:
                    helper(item.getList(), level + 1)

        helper(nestedList, 1)
        return res[0]


if __name__ == '__main__':
    nested_list = []
    nested_list.append(NestedInteger([1, 1]))
    nested_list.append(NestedInteger(2))
    nested_list.append(NestedInteger([1, 1]))


    # print(nested_list)
    solution = Solution()
    print(solution.depthSum(nested_list))
