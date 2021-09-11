class Node:
    def __init__(self, id, value):
        self.id = id
        self.value = value
        self.neighbors = set()

    def add_edge(self, v):
        if v.id == self.id:
            raise ValueError("Vertex cannot be added to itself!")
        self.neighbors.add(v)

    def get_neighbors(self):
        return sorted(list(self.neighbors))

    def __lt__(self, other):
        return self.id < other.id

    def __gt__(self, other):
        return self.id > other.id

    def __eq__(self, other):
        return self.id == other.id

    def __hash__(self):
        return hash((self.id, self.value))

    def __repr__(self):
        return '{}'.format(self.value)