def bfs(self, starting_vertex, destination_vertex):
    #Create an empty set to store the visited vertices
    visited = set()
    # Create an empty Queue and enqueue & PATH TO the starting vertex
    q = Queue()
    q.enqueue( [starting_vertex] )
    # While the queue is not empty...
    while q.size() > 0:
        # Dequeue the first PATH
        path = q.dequeue()
        # GRAB THE VERTEX FROM THE END OF THE PATH
        v = path[-1]
        # IF VERTEX = TARGET, RETURN PATH
        if v == destination_vertex:
            return path
        # If that vertex has not been visited...
        if v not in visited
            # Mark it as visited
            visited.add(v)
            # Then add & PATH TO all of its neighbors to the back of the queue
            for neighbor in self.vertices[v]:
                # Copy the path so that the append is being added to the list copy, not to the actual list which would result in 
                path_copy = list(path)
                # Append neighbor to the back of the copy
                path_copy.append(neighbor)
                # Enqueue copy
                q.enqueue(path_copy)

                
## Recursive DFS solution

def dft_recursive(self, starting_vertex, visited=None ):
    # Print each vertex in depth-first order beginning from starting_verex. This should be done using recursion.
    if visited is None:
        visited = set()
    # If the node hasn't been visited...
    if starting_vertex not in visited:
        # Mark the node as visited
        print(starting_vertex)
        visited.add(starting_vertex)
    # Then call DFT_recursive on each child
    for neighbor in self.vertices[starting_vertex]:
        self.dft_recursive(neighbor, visited)

    
def dfs(self, starting_vertex, destination_vertex):
    # Return a list containing a path from starting_vertex to destination_vertex in depth-first order

    # Create an empty set to store visited nodes
    # Create an empty Queue and enqueue & PATH TO the starting vertex
    # While the queue is not empty...
        # Dequeue the first PATH
        # GRAB THE VERTEX FROM THE END OF THE PATH
        # IF VERTEX = TARGET, RETURN PATH
        # If that vertex has not been visited...
            # Mark it as visited
            # Then add & PATH TO all of its neighbors to the back of the queue
                # Copy the path
                # Append neighbor to the back of the copy
                # Enqueue copy



wordList = ["hot", "dot", "dog", "lot", "log", "cog"]

word_set = set(["hot", "dot", "dog", "lot", "log", "cog"])

letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

# Get neighbors function
def get_neighbors(word):
    # A neighbor is all words in the word list that differ by exactly one letter
    
    # create an empty neighbors list
    neighbors = []
    # turn our word into an array of characters
    string_word = list(word)
    # for each letter in the word...
    for i in range(len(string_word)):
        # For each letter in the alphabet...
        for letter in letters:
            # Make a copy so we don't override our item
            # swap that letter with a letter in the alphabet
            temp_word = list(string_word)
            temp_word[i] = letter
            # reform it into a word string and check if it's in word_set
            w = "".join(temp_word)
            # if it doesn't equal the original word and it's in the set, add to neighbors
            if w !== word and w in word_set:
                neighbors.append(w)


# Implement our traversal
def find_ladders(beginWord, endWord):
    visited = set()
    q = Queue()
    q.enqueue( [beginWord] )
    while q.size() > 0:
        path = q.dequeue()
        v = path[-1]
        if v not in visited:
            visited.add(v)
            if v == endWord:
                return path
            for neighbor in get_neighbors(v):
                path_copy = list(path)
                path_copy.append(neighbor)
                q.enqueue(path_copy)




    def dft_recursive(self, starting_vertex):
        """
        Print each vertex in depth-first order
        beginning from starting_vertex.
        This should be done using recursion.
        """
        pass  # TODO
    def bfs(self, starting_vertex, destination_vertex):
        """
        Return a list containing the shortest path from
        starting_vertex to destination_vertex in
        breath-first order.
        """
        pass  # TODO
    def dfs(self, starting_vertex, destination_vertex):
        """
        Return a list containing a path from
        starting_vertex to destination_vertex in
        depth-first order.
        """
        pass  # TODO