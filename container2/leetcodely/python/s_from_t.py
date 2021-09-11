from collections import Counter

def solution(S, T):

    def oneDel(self, s, t):

        longer = s if len(s) > len(t) else t
        shorter = s if longer == t else t
        for i in range(len(longer)):
            reduced = longer[:i] + longer[i + 1:]
            if reduced == shorter:
                return True
        return False

    def oneModify(self, s, t):
        i, count = 0, 0
        while i < len(s):
            if s[i] != t[i]:
                count += 1
            i += 1
        return count <= 1

    if abs(len(S) - len(T)) > 1:
        return "IMPOSSIBLE"

    if len(S) == len(T) and oneModify(S, T):
        t_map, s_map = Counter(T), Counter(S)
        for k, v in t_map.items():
            if k not in s_map or s_map[k] != v:
                return "REPLACE "
