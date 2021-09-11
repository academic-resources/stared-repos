"""Given a string s and a list of strings dict, you need to add a closed pair of bold tag <b> and </b> to wrap the
substrings in s that exist in dict. If two such substrings overlap, you need to wrap them together by only one
pair of closed bold tag. Also, if two substrings wrapped by bold tags are consecutive, you need to combine them. """


class Solution(object):
    def addBoldTag(self, s, dict):
        """
        :type s: str
        :type dict: List[str]
        :rtype: str
        """

        def find(s, dict):
            words = set(dict)
            intervals = []
            for i in range(len(s)):
                for word in words:
                    if s.startswith(word, i):
                        intervals.append([i, i + len(word)])
            intervals = sorted(intervals, key=lambda x: x[0])
            return intervals

        def merge_intervals(intervals):
            i = 0
            while i < len(intervals) -1:
                s1, e1 = intervals[i]
                s2, e2 = intervals[i+1]
                if e1 < s2:
                    i += 1
                else:
                    intervals.pop(i + 1)
                    intervals.pop(i)
                    intervals.insert(i, [s1, max(e1, e2)])
            return intervals

        def create_string(s, intervals):
            for i in range(len(intervals) - 1, -1, -1):
                start, end = intervals[i]
                s = s[:start] + "<b>" + s[start:end] + "</b>" + s[end:]
            return s
        return create_string(s, merge_intervals(find(s, dict)))