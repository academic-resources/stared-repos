"""Given string S and a dictionary of words words, find the number of words[i] that is a subsequence of S."""


class Solution(object):
    def numMatchingSubseq(self, S, words):
        """
        :type S: str
        :type words: List[str]
        :rtype: int
        """
        count = 0
        for word in words:
            if self.is_subsequence(word, S):
                count += 1
        return count

    def is_subsequence(self, a, b):
        if len(a) == 0:
            return True
        i, j = 0, 0
        while j < len(b):
            if a[i] == b[j]:
                i += 1
                if i == len(a):
                    return True
            j += 1
        return False
