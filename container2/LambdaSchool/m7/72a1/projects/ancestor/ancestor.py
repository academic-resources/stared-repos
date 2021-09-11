from util import Queue, Stack, Graph

def earliest_ancestor(ancestors, current_vertex):
    # create blank graph for ancestors
    current_graph = Graph()
    # loop through and add all ancestors
    for ancestor in ancestors:
        current_graph.add_vertex(ancestor[0])
        current_graph.add_vertex(ancestor[1])
    # loop through and add all edges
    for ancestor in ancestors:
        current_graph.add_edge(ancestor[1], ancestor[0])

    max_path = 1
    # if the input has no parents return -1
    earliest_ancestor = -1
    # create blank traversing path
    traversing_path = Stack()
    # Start traversing path with the first vertex
    traversing_path.push([current_vertex])

    # while traversing path not empty
    while traversing_path.size() > 0:
        # start traversed path
        traversed_path = traversing_path.pop()
        # get last vertex in the traversed path
        last_vertex = traversed_path[-1]
        # get length of traversed path
        tp_length = len(traversed_path)
        # (if traversed path is longer than or equal to max_path AND
        # if last vertex is smaller than current earliest ancestor )
        # ##### OR
        # if traversed path is longer than max_path
        if(tp_length >= max_path and last_vertex < earliest_ancestor) or (tp_length > max_path):
            # set earliest ancestor as last vertex
            # set max path as last item in traversed path
            earliest_ancestor = last_vertex
            max_path = len(traversed_path)
        # get neighbors of last vertex
        neighbors = current_graph.vertices[last_vertex]
        # loop through each neighbor
        for neighbor in neighbors:
            # get current path list, append neighbor to it, and add to traversing path
            new_path = list(traversed_path)
            new_path.append(neighbor)
            traversing_path.push(new_path)
    # return earliest ancestor
    return earliest_ancestor
