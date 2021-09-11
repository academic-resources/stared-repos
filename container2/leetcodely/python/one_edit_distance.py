"""Created by sgoswami on 7/17/17."""
"""Given two strings S and T, determine if they are both one edit distance apart."""


class Solution(object):

    def isOneEditDistance(self, s, t):
        """
        :type s: str
        :type t: str
        :rtype: bool
        """
        if s is None and t is None or len(s) == len(t) == 0 or s == t:
            return False
        return self.oneDel(s, t) or self.oneModify(s, t)

    def oneDel(self, s, t):
        if abs(len(s) - len(t)) > 1:
            return False
        longer = s if len(s) > len(t) else t
        shorter = s if longer == t else t
        for i in range(len(longer)):
            reduced = longer[:i] + longer[i+1:]
            if reduced == shorter:
                return True
        return False

    def oneModify(self, s, t):
        if len(s) != len(t):
            return False
        i, count = 0, 0
        while i < len(s):
            if s[i] != t[i]:
                count += 1
            i += 1
        return count <= 1
