from collections import deque
from python.ds.graph.graph import Graph


def build_distance_table(graph, source):
    _source = graph.vertex_map[source]
    distance_table = {value: (0, None) for value in graph.vertex_map.values()}
    distance_table[_source] = (0, _source)
    queue = deque()
    queue.append(_source)
    while len(queue) > 0:
        curr_vertex = queue.popleft()
        curr_distance = distance_table[curr_vertex][0]
        for neighbor in curr_vertex.get_neighbors():
            if distance_table[neighbor][1] is None:
                distance_table[neighbor] = (1 + curr_distance, curr_vertex)
                if len(neighbor.get_neighbors()) > 0:
                    queue.append(neighbor)
    return distance_table


def shortest_path(graph, source, destination):
    _source = graph.vertex_map[source]
    _destination = graph.vertex_map[destination]
    distance_table = build_distance_table(graph, source)
    path = [_destination]
    previous_vertex = distance_table.get(_destination)[1]

    while previous_vertex and previous_vertex is not _source:
        path.append(previous_vertex)
        previous_vertex = distance_table.get(previous_vertex)[1]

    if not previous_vertex:
        return []
    else:
        path.append(_source)
        return list(reversed(path))


if __name__ == '__main__':
    graph = Graph(directed=False)
    graph.add_edge(1, 2)
    graph.add_edge(2, 3)
    graph.add_edge(1, 3)
    graph.add_edge(3, 4)
    graph.add_edge(4, 5)
    graph.add_edge(5, 6)
    graph.add_edge(3, 7)
    # graph.breadth_first()
    # print(graph)
    # graph.depth_first(1)
    # print(graph)

    # print(graph.topological_sort())
    # print(build_distance_table(graph, 2))
    print(shortest_path(graph, 2, 5))
