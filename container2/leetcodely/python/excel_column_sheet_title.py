"""Created by sgoswami on 9/3/17."""
"""Given a positive integer, return its corresponding column title as appear in an Excel sheet.

For example:

    1 -> A
    2 -> B
    3 -> C
    ...
    26 -> Z
    27 -> AA
    28 -> AB """


class Solution(object):
    def convertToTitle(self, n):
        """
        :type n: int
        :rtype: str
        """
        result = []
        while n > 0:
            result.append(chr((n-1) % 26 + ord('A')))
            print(result)
            n = (n - 1) // 26
        return ''.join(reversed(result))


if __name__ == '__main__':
    solution = Solution()
    print(solution.convertToTitle(562))