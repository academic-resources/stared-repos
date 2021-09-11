class Solution:

    def largestComponentSize(self, A: [int]) -> int:
        parent = {c: c for c in A}

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

        def common(a, b):
            for i in range(2, min(a, b)):
                if a % i == 0 and b % i == 0:
                    return True
            return False

        for i in range(len(A)):
            for j in range(i+1, len(A)):
                if common(A[i], A[j]):
                    union(A[i], A[j])