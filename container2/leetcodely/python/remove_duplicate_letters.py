import collections

class Solution(object):
    def removeDuplicateLetters(self, s):
        """
        :type s: str
        :rtype: str
        """
        count_map = collections.Counter(s)
        stack = []
        for c in s:
            if len(stack) == 0:
                stack.append(c)
                count_map[c] -= 1
            elif c in stack:
                while ord(c) < ord(stack[-1]) and count_map[stack[-1]] > 0:
                    stack.pop()
                stack.append(c)
                count_map[c] -= 1
        return ''.join(stack)


if __name__ == '__main__':
    solution = Solution()
    print(solution.removeDuplicateLetters('cbacdcbc'))









