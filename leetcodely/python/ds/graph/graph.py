from collections import deque
from python.ds.graph.graph_errors import GraphError
from python.ds.graph.node import Node


class Graph:
    def __init__(self, directed=False):
        self.vertices = 0
        self.directed = directed
        self.vertex_map = {}

    def add_edge(self, v1, v2, weight=1):
        if v1 in self.vertex_map:
            V1 = self.vertex_map[v1]
        else:
            self.vertices += 1
            V1 = Node(self.vertices, v1)
            self.vertex_map[v1] = V1
        if v2 in self.vertex_map:
            V2 = self.vertex_map[v2]
        else:
            self.vertices += 1
            V2 = Node(self.vertices, v2)
            self.vertex_map[v2] = V2
        try:
            V1.add_edge(V2)
            if not self.directed:
                V2.add_edge(V1)
        except ValueError as e:
            raise GraphError(str(e))

    def get_edge_weight(self, v1, v2):
        pass

    def get_all_nodes(self):
        return [(key.id, key.value) for key, value in self.vertex_map.items()]

    def __repr__(self):
        s = "{ "
        for k, v in self.vertex_map.items():
            s += str(k)
            s += ":"
            s += str(v)
            s += '\n'
        s += " }"
        return s

    def __len__(self):
        return self.vertices
