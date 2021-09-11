from collections import deque

from python.ds.graph.graph_errors import GraphError


def breadth_first(graph, start):
    if not start:
        return GraphError('Invalid starting node.')
    p = graph.vertex_map.get(start)
    if not p:
        raise GraphError('Invalid key')

    queue = deque()
    queue.appendleft(p)
    visited = set()
    while len(queue) > 0:
        vertex = queue.pop()
        print(vertex)  # This can be replaced by any processing that needs to be done on the node during traversal
        if vertex not in visited:
            neighbors = vertex.get_neighbors()
            for neighbor in neighbors:
                if neighbor not in visited:
                    queue.appendleft(neighbor)


def depth_first(graph, start):
    if not start:
        raise GraphError('Invalid start point')
    p = graph.vertex_map.get(start)
    if not p:
        raise GraphError('Not a valid key for this graph')
    visited = set()

    def helper(node):
        if node in visited:
            return
        print(node)  # This can be replaced by any processing that needs to be done on the node during traversal
        visited.add(node)
        for vertex in node.get_neighbors():
            helper(vertex)
    helper(p)
