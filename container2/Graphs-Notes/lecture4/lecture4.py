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


########################

# Alternate solution:

def earliest_ancestor1(ancestry_list, node):
    # If no parent node, return -1
    valid_node = False
    for parent in ancestry_list:
            if parent[1] == node:
                valid_node = True
                break
    if valid_node == False:
        return -1

    # Use BFS to find earliest ancestor
    # Create an empty Queue to store paths to visited ancestors
    q = []
    # Enqueue with starting node
    q.append( [node] )
    visited = set()

    # While the queue is not empty...
    while len(q) > 0:
        # Dequeue the first path
        path = q.pop(0)
        # Grab the current node to search for ancestors
        curr_node = path[-1]
        # Find curr_node's ancestors
        if curr_node not in visited:
            visited.add(curr_node)
        
        no_parent = False

        for parent in ancestry_list:
            if parent[1] == curr_node:
                path_copy = list(path)
                path_copy.append(parent[0])
                q.append(path_copy)
                no_parent = True
        # If curr_node has no ancestors, break the loop
        if no_parent == False:
            q.append(list(path))
            break

    earliest = []
    for path in q:
        if len(path) > len(earliest):
            earliest = list(path)
        elif len(path) == len(earliest):
            if path[-1] < earliest[-1]:
                earliest = list(path)

    return earliest[-1]


###################################

# WORD LIST PROBLEM

# Open our word file as read only
f = open('words.txt', 'r')

# Stores a list of all the words, split by each line
words = f.read().split("\n")

# Add all words to a set, making sure all are lower case.
word_set = set()
for word in words:
    word_set.add(word.lower())

# close the file
f.close()


# Rather than constructing a graph, we can traverse the existing list of words to find neighbors
def get_neighbors(word):
    neighbors = []
    # Turn the word into a list of characters
    compare_word = list(word)

    for i in range(len(compare_word)):
        # loop through compare_word and change each letter to a new letter, checking if that new version is a word in the word dictionary
        for letter in list('abcdefghijklmnopqrstuvwxyz'):
            temp_word = list(compare_word)
            temp_word[i] = letter
            new_word = "".join(temp_word)
            # Make sure the mutated word doesn't equal the starting word
            if new_word != word and new_word in word_set:
                neighbors.append(new_word)
    
    return neighbors

# Search
def find_word_ladder(beginWord, endWord):
    visited = list()
    q = Queue()
    q.enqueue( [beginWord] )

    while q.size() > 0:
        path = q.dequeue()
        vertex = path[-1]

        if vertex not in visited:
            visited.append(vertex)

            # End when we find endWord
            if vertex == endWord:
                return path
            
            # If not endWord, find next word neighbors and keep searching
            for neighbor in get_neighbors(vertex):
                path_copy = list(path)
                path_copy.append(neighbor)
                q.enqueue(path_copy)


print(find_word_ladder('hit', 'cog'))
# return: ['hit', 'hot', 'cot', 'cog']

print(find_word_ladder('sail', 'boat'))
# ['sail', 'bail', 'boil', 'boll', 'bolt', 'boat']

print(find_word_ladder('hungry', 'happy'))
# None
