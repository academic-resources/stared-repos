class DisjointSet:
    def __init__(self, vertices):
        self.parent = {vertex: vertex for vertex in vertices}

    def union(self, a, b):
        x = self.find(a)
        y = self.find(b)
        if x != y:
            self.parent[x] = y

    def find(self, item):
        if self.parent[item] == item:
            return item
        while self.parent != item:
            item = self.parent[self.parent[item]]
        return self.parent[item]

    def count(self):
        count = 0
        for key, val in self.parent.items():
            if key == val:
                count += 1
        return count


data = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
sets = [('a', 'c'), ('b', 'e', 'd'), ('f', 'g')]
d = DisjointSet(data)
d.union('a', 'c')
d.union('b', 'e')
d.union('b', 'd')
d.union('e', 'd')
d.union('f', 'g')
print(d.count())



