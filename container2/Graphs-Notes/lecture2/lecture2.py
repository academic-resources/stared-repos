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
    """Represent a graph as a dictionary of vertices mapping labels to edges."""
    def __init__(self):
        self.vertices = {}

    def add_vertex(self, vertex):
        """
        Add a vertex to the graph.
        """
        if not vertex in self.vertices:
            self.vertices[vertex] = set()
        else:
            print("Warning: vertex exists.")

    def add_edge(self, vertex_from, vertex_to):
        """
        Add a directed edge to the graph.
        """
        if vertex_from in self.vertices and vertex_to in self.vertices:
            self.vertices[vertex_from].add(vertex_to)
        else:
            raise IndexError("That vertex does not exist!")

    def bft(self, starting_vertex):
        """
        Print each vertex in breadth-first order
        beginning from starting_vertex.
        """
        # Create an empty set to store visited nodes
        visited = set()

        # Create an empty Queue and enqueue the starting vertex
        q = Queue()
        q.enqueue(starting_vertex)

        # While the queue is not empty...
        while q.size() > 0:
            # Dequeue the first vertex from the queue
            vertex = q.dequeue()

            # If that vertex has not been visited...
            if vertex not in visited:

                # Mark it as visited
                visited.add(vertex)

                # Then add all of its neighbors to the back of the queue
                for neighbor in self.vertices[v]:
                    q.enqueue(neighbor)

    def dft(self, starting_vertex):
        """
        Print each vertex in depth-first order
        beginning from starting_vertex.
        """
        # Create an empty set to store visited nodes
        visited = []

        # Create an empty Stack and push the starting vertex
        s = Stack()
        s.push(starting_vertex)

        # While the Stack is not empty...
        while s.size() > 0:

            # Pop the first vertex from the stack
            vertex = s.pop()

            # If that vertex has not been visited...
            if vertex not in visited:

                # Mark it as visited
                visited.append(vertex)

                # Then add all of its neighbors to the top of the Stack
                for neighbor in self.vertices[vertex]:
                    s.push(neighbor)

    def dft_recursive(self, starting_vertex, visited=None):
        """
        Print each vertex in depth-first order
        beginning from starting_vertex.
        This should be done using recursion.
        """
        # Print each vertex in depth-first order beginning from starting_verex. This should be done using recursion.
        if visited is None:
            visited = []
        # If the node hasn't been visited...
        if starting_vertex not in visited:
            # Mark the node as visited
            # print(starting_vertex)
            visited.add(starting_vertex)
        # Then call DFT_recursive on each child
        for child_vert in self.vertices[starting_vertex]:
            self.dft_recursive(child_vert, visited)

    def bfs(self, starting_vertex, destination_vertex):
        """
        Return a list containing the shortest path from
        starting_vertex to destination_vertex in
        breadth-first order.
        """
        #Create an empty list to store the visited vertices
        visited = []
        # Create an empty Queue and enqueue & PATH TO the starting vertex
        q = Queue()
        q.enqueue( [starting_vertex] )

        # While the queue is not empty...
        while q.size() > 0:
            # Dequeue the first PATH
            path = q.dequeue()
            # GRAB THE VERTEX FROM THE END OF THE PATH
            vertex = path[-1]

            # IF VERTEX = TARGET, RETURN PATH
            if vertex == destination_vertex:
                return path

            # If that vertex has not been visited...
            if vertex not in visited:
                # Mark it as visited
                visited.append(vertex)
                # Then add & PATH TO all of its neighbors to the back of the queue
                for neighbor in self.vertices[vertex]:
                    # Copy the path so that the append is being added to the list copy, not to the actual list
                    path_copy = list(path)
                    # Append neighbor to the back of the copy
                    path_copy.append(neighbor)
                    # Enqueue copy
                    q.enqueue(path_copy)

        # If nothing matched and we hit the end, we return None
        return None
    
    def dfs(self, starting_vertex, destination_vertex):
        """
        Return a list containing a path from
        starting_vertex to destination_vertex in
        depth-first order.
        """
        # Create an empty list to store visited nodes
        visited = []

        # Create an empty Stack and enqueue & PATH TO the starting vertex
        s = Stack()
        s.push([starting_vertex])

        # While the stack is not empty...
        while s.size() > 0:
            # Pop the first PATH
            path = s.pop()
            # GRAB THE VERTEX FROM THE END OF THE PATH
            vertex = path[-1]

            # IF VERTEX = TARGET, RETURN PATH
            if vertex == destination_vertex:
                return path

            # If that vertex has not been visited...
            if vertex not in visited:
                # Mark it as visited
                visited.append(vertex)
                # Then add & PATH TO all of its neighbors to the back of the queue
                for neighbor in self.vertices[vertex]:
                    # Copy the path
                    path_copy = list(path)
                    # Append neighbor to the back of the copy
                    path_copy.append(neighbor)
                    # Enqueue copy
                    s.push(path_copy)

        return None

    
if __name__ == '__main__':
    graph = Graph()
    graph.add_vertex(1)
    graph.add_vertex(2)
    graph.add_vertex(3)
    graph.add_vertex(4)
    graph.add_vertex(5)
    graph.add_vertex(6)
    graph.add_vertex(7)
    graph.add_edge(5, 3)
    graph.add_edge(6, 3)
    graph.add_edge(7, 1)
    graph.add_edge(4, 7)
    graph.add_edge(1, 2)
    graph.add_edge(7, 6)
    graph.add_edge(2, 4)
    graph.add_edge(3, 5)
    graph.add_edge(2, 3)
    graph.add_edge(4, 6)
    print(graph.vertices)