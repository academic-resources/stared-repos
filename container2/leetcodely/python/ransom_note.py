"""Given an arbitrary ransom note string and another string containing letters from all the magazines, write a function
that will return true if the ransom note can be constructed from the magazines ; otherwise, it will return false.
Each letter in the magazine string can only be used once in your ransom note.
You may assume that both strings contain only lowercase letters.
canConstruct("a", "b") -> false
canConstruct("aa", "ab") -> false
canConstruct("aa", "aab") -> true"""
import collections

class Solution:
    def canConstruct(self, ransomNote, magazine):
        """
        :type ransomNote: str
        :type magazine: str
        :rtype: bool
        """
        count_map = collections.Counter(magazine)
        for i,v in enumerate(ransomNote):
            if v not in count_map or count_map[v] <= 0:
                return False
            count_map[v] -= 1
        return True

if __name__ == '__main__':
    solution = Solution()
    print(solution.canConstruct('aa', 'aab'))
    print(solution.canConstruct('a', 'b'))
    print(solution.canConstruct('aa', 'ab'))
