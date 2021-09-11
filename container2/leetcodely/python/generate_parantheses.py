"""Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
For example, given n = 3, a solution set is:
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
"""


class Solution:
    def generateParenthesis(self, n):
        """
        :type n: int
        :rtype: List[str]
        """
        res = []

        def _helper(left, right, path):
            if left == 0 and right == 0:
                res.append(path[:])
                return
            if right >= left:
                if left != 0:
                    _helper(left - 1, right, path + '(')
                if right != 0:
                    _helper(left, right - 1, path + ')')

        _helper(n - 1, n, "(")
        return res


if __name__ == '__main__':
    solution = Solution()
    print(solution.generateParenthesis(2))
