"""Given a column title as appear in an Excel sheet, return its corresponding column number.
For example:
A -> 1
B -> 2
C -> 3
...
Z -> 26
AA -> 27
AB -> 28 """


class Solution:
    def titleToNumber(self, s):
        """
        :type s: str
        :rtype: int
        """
        res = 0
        for c in s:
            res = (res * 26) + (ord(c) - 65 + 1)
        return res


if __name__ == '__main__':
    solution = Solution()
    print(solution.titleToNumber('ABB'))
