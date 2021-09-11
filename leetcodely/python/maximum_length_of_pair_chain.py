"""Created by sgoswami on 10/8/17."""
"""You are given n pairs of numbers. In every pair, the first number is always smaller than the second number.
Now, we define a pair (c, d) can follow another pair (a, b) if and only if b < c. Chain of pairs can be formed 
in this fashion.
Given a set of pairs, find the length longest chain which can be formed. You needn't use up all the given pairs. 
You can select pairs in any order."""


class Solution(object):
    def findLongestChain(self, pairs):
        """
        :type pairs: List[List[int]]
        :rtype: int
        """
        sorted_pairs = sorted(pairs, key= lambda x:x[1])
        if len(sorted_pairs) == 0:
            return 0
        curr = sorted_pairs[0][1]
        chain_len = 1
        for i, pair in enumerate(sorted_pairs):
            if curr < pair[0]:
                chain_len += 1
                curr = pair[1]
        return chain_len


if __name__ == '__main__':
    solution = Solution()
    print(solution.findLongestChain([[1, 2], [2, 3], [3, 4]]))


