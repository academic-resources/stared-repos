"""Given two strings S and T, return if they are equal when both are typed into empty text editors. # means a
backspace character."""


class Solution(object):
    def backspaceCompare(self, S, T):
        """
        :type S: str
        :type T: str
        :rtype: bool
        """

        def next_char(s):
            bs = 0
            for c in s[::-1]:
                if c == '#':
                    bs += 1
                elif bs > 0:
                    bs -= 1
                else:
                    yield c

        _S = next_char(S)
        _T = next_char(T)


if __name__ == '__main__':
    solution = Solution()
    print(solution.backspaceCompare("ab#c", "ad#c"))
    print(solution.backspaceCompare("ab##", "c#d#"))
    print(solution.backspaceCompare("a##c", "#a#c"))
    print(solution.backspaceCompare("a#c", "b"))
