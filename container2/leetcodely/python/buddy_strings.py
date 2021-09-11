"""Given two strings A and B of lowercase letters, return true if and only if we can swap two letters in A so
that the result equals B."""


class Solution(object):
    def buddyStrings(self, A, B):
        """
        :type A: str
        :type B: str
        :rtype: bool
        """
        if len(A) != len(B):
            return False
        if A == B:
            if len(set(A)) < len(A):
                return True
        diff = [(a, b) for a, b in zip(A, B) if a != b]
        return len(diff) == 2 and diff[0] == diff[1][::-1]


if __name__ == '__main__':
    solution = Solution()
    print(solution.buddyStrings("ab", "ba"))
    print(solution.buddyStrings("ab", "ab"))
    print(solution.buddyStrings("aa", "aa"))
    print(solution.buddyStrings("aaaaaaabc", "aaaaaaacb"))
    print(solution.buddyStrings("", "aa"))
