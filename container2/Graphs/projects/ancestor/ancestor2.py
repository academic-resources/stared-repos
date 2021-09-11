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


class Graph:
    '''
    Represent a graph as a dictionary of vertices mapping labels to edges
    Easy to read, not a dense graph so preferable to a matrix, and no adverse consequences are apparent.
    '''
    def __init__(self):
        self.vertices = {}

    def add_vertex(self, vertex_id):
        # Check if the vertex is already there before adding
        if vertex_id not in self.vertices:
            # Use a set instead of a list for quick lookup, avoids duplicates. Should keep in mind that in Python, it is unordered but auto-sorted
            self.vertices[vertex_id] = set()
        else:
            # Error
            pass
    
    def add_edge(self, vertex_from, vertex_to):
        # Make sure vertices exist
        if vertex_from in self.vertices and vertex_to in self.vertices:
            # Only add one way because it's one-directional
            # If we weren't using a set, we should check that we aren't setting duplicates
            self.vertices[vertex_from].add(vertex_to)
        else:
            # Error
            pass


def earliest_ancestor(ancestors, starting_node):
    # Make a graph
    graph = Graph()

    # Fill in the graph
    for pair in ancestors:
        graph.add_vertex(pair[0])
        graph.add_vertex(pair[1])

    # Add edge (child to parent)
        graph.add_edge(pair[1], pair[0])
    

    # Traverse the graph with BFS
    # Look for the shortest paths between any two nodes
    q = Queue()
    q.enqueue( [starting_node] )

    # Track length of current longest path, and current earliest ancestor
    max_path_length = 1
    # if no parents, will return -1
    earliest_ancestor = -1

    # While... if we find a longer path, replace those values
    while q.size() > 0:
        path = q.dequeue()
        parent = path[-1]

        # If a tie, return lowest node number
        if ((len(path) > max_path_length) or
            (len(path) == max_path_length and parent < earliest_ancestor)):

            earliest_ancestor = parent
            max_path_length = len(path)
        
        for neighbor in graph.vertices[parent]:
            new_path = list(path)
            new_path.append(neighbor)
            q.enqueue(new_path)

    # Return where the longest path ends
    return earliest_ancestor

test_ancestors = [(1, 3), (2, 3), (3, 6), (5, 6), (5, 7), (4, 5), (4, 8), (8, 9), (11, 8), (10, 1)]
