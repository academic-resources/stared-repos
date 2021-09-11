class Queue():
    def __init__(self):
        self.queue = []

    def enqueue(self, value):
        self.queue.append(value)

    def dequeue(self):
        if self.size() > 0:
            return self.queue.pop(0)
        else:
            return None

    def size(self):
        return len(self.queue)


class Stack():
    def __init__(self):
        self.stack = []

    def push(self, value):
        self.stack.append(value)

    def pop(self):
        if self.size() > 0:
            return self.stack.pop()
        else:
            return None

    def size(self):
        return len(self.stack)

class Graph:
    def __init__(self):
        self.vertices = {}

    def add_vertex(self, vertex_id):
        # add a key/vertice:
        # '2': set(),
        # '3': {'0'}
        self.vertices[vertex_id] = set()
        return self.vertices

    def add_edge(self, v1, v2):
        # Add a directed edge to the graph.
        if v1 in self.vertices and v2 in self.vertices:
            self.vertices[v1].add(v2)
        elif v1 not in self.vertices:
            print(f"There is no vertex {v1}.  Try again!")

    def get_neighbors(self, vertex_id):
        # Get all neighbors (edges) of a vertex.
        if vertex_id in self.vertices:
            return self.vertices.get(vertex_id)
        else:
            return "This vertex has no neighbors."
