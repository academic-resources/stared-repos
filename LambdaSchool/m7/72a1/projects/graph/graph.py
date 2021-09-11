from util import Queue, Stack

class Graph:

    """Represent a graph as a dictionary of vertices mapping labels to edges."""
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

    def bft(self, current_vertex):
        # Write a function within your Graph class that takes a starting node as an argument, then performs BFT. Your function should print the resulting nodes in the order they were visited. Note that there are multiple valid paths that may be printed.

        # create string of visited vertices
        visited_vertices = ""
        # if current vertex is in possible vertices, print and add to visited string
        if current_vertex in self.vertices.keys():
            print(current_vertex)
            visited_vertices = visited_vertices + str(current_vertex)
        # loop through each vertex in vertices
        for vertex in self.vertices:
            # if it's not current and it's one of current's children:
                # print and add to visited string
            if vertex != current_vertex and (vertex - current_vertex == 1):
                print(str(vertex))
                visited_vertices = visited_vertices + ", " + str(vertex)
                current_vertex += 1
        # return visited string 
        return visited_vertices

    def dft(self, current_vertex):
        # Write a function within your Graph class that takes takes a starting node as an argument, then performs DFT. Your function should print the resulting nodes in the order they were visited. Note that there are multiple valid paths that may be printed.
        # {1: 2, 2: 3, 3: 5, 4: 6, 5: 3, 6: 3, 7: 6}

        # empty traversing path
        traversing_path = Stack()
        # put starting vertex first on traversing path
        traversing_path.push(current_vertex)
        # set up visited set
        visited_vertices = set()

        # loop while traversing path not empty
        while traversing_path.size() > 0:
            # remove from traversing path since it's visited
            current_vertex = traversing_path.pop()
            # if current is unvisited:
            if current_vertex not in visited_vertices:
                # print, add to visited, and add neighbors to traversing path by looping
                print(current_vertex)
                visited_vertices.add(current_vertex)
                neighbors = self.get_neighbors(current_vertex)
                for next_vertex in neighbors:
                    traversing_path.push(next_vertex)

    def dft_recursive(self, current_vertex, visited_vertices=set()):
        # Write a function within your Graph class that takes takes a starting node as an argument, then performs DFT using recursion. Your function should print the resulting nodes in the order they were visited. Note that there are multiple valid paths that may be printed.

        # Write a function within your Graph class that takes takes a starting node as an argument, then performs DFT. Your function should print the resulting nodes in the order they were visited. Note that there are multiple valid paths that may be printed.
        # {1: 2, 2: 3, 3: 5, 4: 6, 5: 3, 6: 3, 7: 6}
        
        if current_vertex not in visited_vertices:
            # print starting/current vertex
            print(current_vertex)
            # add starting/current vertex to visited
            visited_vertices.add(current_vertex)
            # loop through its neighbors and recursively run
            neighbors = self.get_neighbors(current_vertex)
            for next_vertex in neighbors:
                self.dft_recursive(next_vertex, visited_vertices)

    def bfs(self, current_vertex, destination_vertex):
        # Write a function within your Graph class that takes takes a starting node and a destination node as an argument, then performs BFS. Your function should return the shortest path from the start node to the destination node. Note that there are multiple valid paths.

        # create visited, current, and traversing path lists
        traversing_path = Queue()
        visited_vertices = []
        traversed_path = []

        # add starting vertex to the queue
        traversing_path.enqueue(current_vertex)
        # adds current vertex to traversed path and visited path
        traversed_path.append(current_vertex)
        visited_vertices.append(current_vertex)
        # loop while traversing path not empty 
        while traversing_path.size():
            edges = self.get_neighbors(current_vertex)
            # removes current item from queue
            traversing_path.dequeue()
            # get value (edges) of current vertex
            for edge in edges:
                visited_vertices.append(edge)
                traversed_path.append(edge)
                # if any edges are destination, add it to path and return path
                if edge == destination_vertex:
                    return traversed_path
                # if edge is not destination:
                else:
                    # get neighbors of the edge
                    subedges = self.get_neighbors(edge)
                    # loop through neighbors
                    for subsubedge in subedges:
                        # add each neighbor to visited
                        visited_vertices.append(subsubedge)
                        # get neighbors of each neighbor
                        subsubsubedges = self.get_neighbors(subsubedge)
                        # if neighbor is destination, add to path and return path
                        if subsubedge == destination_vertex:
                            traversed_path.append(subsubedge)
                            return traversed_path
                        # if destination is in neighbor's neighbors:
                            # add both neighbor and neighbor's neighbor to path and return path
                        if destination_vertex in subsubsubedges:
                            traversed_path.append(subsubedge)
                            traversed_path.append(destination_vertex)
                            return traversed_path
        # return path
        return traversed_path
            
    def dfs(self, current_vertex, destination_vertex):
        # Write a function within your Graph class that takes takes a starting node and a destination node as an argument, then performs DFS. Your function should return a valid path (not necessarily the shortest) from the start node to the destination node. Note that there are multiple valid paths.

        # new traversing path
        traversing_path = Stack()
        # adds current vertex to path
        traversing_path.push([current_vertex])
        # new visited list of vertices
        visited_vertices = set()
        # loop while traversing path not empty
        while traversing_path.size() > 0:
            # get current path list
            traversed_path = traversing_path.pop()
            # get current vertex in current list 
            vertex = traversed_path[-1]
            # if current vertex unvisited, do the following
            if vertex not in visited_vertices:
                # if it matches destination, return path
                if vertex == destination_vertex:
                    return traversed_path
                # else, add to visited and repeat going down tree
                visited_vertices.add(vertex)
                for next_vertex in self.vertices[vertex]:
                    # get current path list
                    new_path = list(traversed_path)
                    # add each vertex to the current and traversing path lists
                    new_path.append(next_vertex)
                    traversing_path.push(new_path)
        # return path
        return traversed_path

    def dfs_recursive(self, current_vertex, destination_vertex, visited_vertices=None, traversed_path=None):
        # Write a function within your Graph class that takes takes a starting node and a destination node as an argument, then performs DFS using recursion.  Your function should return a valid path (not necessarily the shortest) from the start node to the destination node.  Note that there are multiple valid paths.

        # recursive, so need to only assign visited/path if non-existent
        # else remain as they are (also are parameters)
        if visited_vertices is None:
            visited_vertices = set()
        if traversed_path is None:
            traversed_path = []
        # adds current vertex to path
        traversed_path = traversed_path + [current_vertex]
        visited_vertices.add(current_vertex)
        # if we've arrived at destination_vertex return path
        if current_vertex == destination_vertex:
            return traversed_path
        # else get neighbors and loop through them
        neighbors = self.get_neighbors(current_vertex)
        for neighbor in neighbors:
            # if neighbor is unvisited, recursively run
            if neighbor not in visited_vertices:
                recursive_path = self.dfs_recursive(
                    neighbor, destination_vertex, visited_vertices, traversed_path)
                # when it exists, return the recursive path
                if recursive_path:
                    return recursive_path



if __name__ == '__main__':
    graph = Graph()  # Instantiate your graph
    # https://github.com/LambdaSchool/Graphs/blob/master/objectives/breadth-first-search/img/bfs-visit-order.png
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
    graph.add_edge(0, 4)

    '''
    Should print:
        {1: {2}, 2: {3, 4}, 3: {5}, 4: {6, 7}, 5: {3}, 6: {3}, 7: {1, 6}}
    '''
    print(graph.vertices)

    '''
    Valid BFT paths:
        1, 2, 3, 4, 5, 6, 7
        1, 2, 3, 4, 5, 7, 6
        1, 2, 3, 4, 6, 7, 5
        1, 2, 3, 4, 6, 5, 7
        1, 2, 3, 4, 7, 6, 5
        1, 2, 3, 4, 7, 5, 6
        1, 2, 4, 3, 5, 6, 7
        1, 2, 4, 3, 5, 7, 6
        1, 2, 4, 3, 6, 7, 5
        1, 2, 4, 3, 6, 5, 7
        1, 2, 4, 3, 7, 6, 5
        1, 2, 4, 3, 7, 5, 6
    '''
    graph.bft(1)

    '''
    Valid DFT paths:
        1, 2, 3, 5, 4, 6, 7
        1, 2, 3, 5, 4, 7, 6
        1, 2, 4, 7, 6, 3, 5
        1, 2, 4, 6, 3, 5, 7
    '''

    graph.dft(1)
    graph.dft_recursive(1)


    '''
    Valid BFS path:
        [1, 2, 4, 6]
    '''
    print(graph.bfs(1, 6))

    '''
    Valid DFS paths:
        [1, 2, 4, 6]
        [1, 2, 4, 7, 6]
    '''
    print(graph.dfs(1, 6))
    print(graph.dfs_recursive(1, 6))
