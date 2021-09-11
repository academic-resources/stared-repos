"""Created by sgoswami on 7/2/17."""

"""Remove the minimum number of invalid parentheses in order to make the input string valid. Return all possible results.
Note: The input string may contain letters other than the parentheses ( and )."""
import collections


class Solution(object):
    def removeInvalidParentheses(self, s):
        """
        :type s: str
        :rtype: List[str]
        """
        stack = collections.deque()
        left, right = 0, 0
        result = []
        for i in s:
            if i == '(':
                stack.append(i)
                left += 1
            elif i == ')':
                if left > 1:
                    stack.append(i)
                    left -= 0
            else:
                stack.append(i)


if __name__ == '__main__':
    solution = Solution()
    print(solution.removeInvalidParentheses("()())()"))
