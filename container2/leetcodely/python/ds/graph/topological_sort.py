from collections import deque


def topological_sort(graph):
    indegree_map = {v: 0 for v in graph.vertex_map.values()}
    for v in graph.vertex_map.values():
        neighbors = v.get_neighbors()
        for neighbor in neighbors:
            indegree_map[neighbor] += 1
    queue = deque()
    for k, v in indegree_map.items():
        if v == 0:
            queue.appendleft(k)
    result = []
    while len(queue) > 0:
        vertex = queue.pop()
        result.append(vertex)
        for neighbor in vertex.get_neighbors():
            indegree_map[neighbor] -= 1
            if indegree_map[neighbor] == 0:
                queue.appendleft(neighbor)
    return result
