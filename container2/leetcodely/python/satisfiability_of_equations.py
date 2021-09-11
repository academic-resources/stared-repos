import string


class Solution:
    def equationsPossible(self, equations: [str]) -> bool:
        parent = {c: c for c in string.ascii_lowercase}

        def union(a, b):
            x = find(a)
            y = find(b)
            if x != y:
                parent[x] = y

        def find(item):
            if parent[item] == item:
                return item
            parent[item] = find(parent[item])
            return parent[item]

        for equation in equations:
            if equation[1] == '=':
                union(equation[0], equation[-1])

        for equation in equations:
            if equation[1] == '!':
                if find(equation[0]) == find(equation[-1]):
                    return False

        return True


solution = Solution()
print(solution.equationsPossible(["b==a","a==b"]))