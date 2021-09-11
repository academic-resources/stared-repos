class Solution:
    def removeOuterParentheses(self, S: str) -> str:
        res = []
        outer = 0
        for c in S:
            if c == '(' and outer > 0:
                res.append(c)
                outer += 1
            elif c == '(' and outer == 0:
                outer += 1
            elif c == ')' and outer > 1:
                res.append(c)
                outer -= 1
            elif c == ')' and outer <= 1:
                outer -= 1
        return ''.join(res)
