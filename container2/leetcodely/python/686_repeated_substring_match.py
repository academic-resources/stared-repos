"""Given two strings A and B, find the minimum number of times A has to be repeated such that B is a substring of it.
If no such solution, return -1.
For example, with A = "abcd" and B = "cdabcdab". """

class Solution(object):
    def repeatedStringMatch(self, A, B):
        """
        :type A: str
        :type B: str
        :rtype: int
        """
        curr = A
        count = 1
        while len(curr) < len(B):
            curr += A
            count += 1
        if B in curr:
            return count
        if B in curr+A:
            return count + 1
        return -1


if __name__ == '__main__':
    solution = Solution()
    print(solution.repeatedStringMatch("bb", "bbbbbbb"))

