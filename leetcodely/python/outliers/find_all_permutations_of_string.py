"""Find all permutations of a string and return them in a sorted order."""


class Solution:
    def permutations(self, s):
        result = []
        self.helper('', s, result)
        return len(list(sorted(result)))

    def helper(self, prefix, suffix, arr):
        if not suffix:
            arr.append(prefix)
            return
        for i in range(len(suffix)):
            self.helper(suffix[i]+prefix, suffix[:i]+suffix[i+1:], arr)


if __name__ == '__main__':
    solution = Solution()
    print(solution.permutations('abcde'))