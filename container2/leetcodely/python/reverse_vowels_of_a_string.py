"""Write a function that takes a string as input and reverse only the vowels of a string."""


class Solution(object):
    def reverseVowels(self, s):
        """
        :type s: str
        :rtype: str
        """
        if not s or len(s) == 0:
            return None
        vowels = set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'])
        index_list = []
        vowel_list = []
        for i, c in enumerate(s):
            if c in vowels:
                index_list.append(i)
                vowel_list.append(c)
        vowel_list = vowel_list[::-1]
        l = list(s)
        for i in range(len(index_list)):
            l[index_list[i]] = vowel_list[i]
        return ''.join(l)


if __name__ == '__main__':
    solution = Solution()
    print(solution.reverseVowels("hello"))
