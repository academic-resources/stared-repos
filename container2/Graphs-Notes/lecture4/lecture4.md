1. [Lecture IV: Maze Traversal](#Lecture-IV:-Maze-Traversal)  
    <br>a. [Social Network Model Solution](#Social-Network-Model-Solution)  
    <br>b. [Implement Degrees of Separation](#Implement-Degrees-of-Separation)  
    <br>c. [Earliest Ancestor](#Earliest-Ancestor)  
    <br>d. [Word Transformation](#Word-Transformation)  
    <br>h. [Adventure Map Traversing](#Adventure-Map-Traversing)  
    <br>
<br>

# Lecture IV: Maze Traversal

[CS18 Social Graph, Map Traversal: Brady Fukumoto](https://www.youtube.com/watch?v=p263i-Shn9o)  

[CS19 Graphs IV, Earliest Ancestors: Brian Doyle](https://youtu.be/s3jZ7dKFtyI)  
For CS19 notes, go straight to [Earliest Ancestor](#Earliest-Ancestor).

<br>

[How to Get That Job at Google](https://steve-yegge.blogspot.com/2008/03/get-that-job-at-google.html)  
[DFS and BFS Visualization](https://visualgo.net/en/dfsbfs)  
[BFS Tutorial and Notes](https://www.hackerearth.com/practice/algorithms/graphs/breadth-first-search/tutorial/)  


<br>

## Social Network Model Solution

_CS18 went over the Social project solution in Lecture IV. CS19 skips down to the [Earliest Ancestory solution](#Earliest-Ancestor)_

<br>

We want to create a number of users and randomly distribute friendships between them, such that the average friendships per user matches the given integer.

Remember, friendship relationships are (usually) undirected so we always need to create two edges. You cannot be friends with yourself or create a duplicate one.

First we want to add users in our `social.py` file:

```
        # Add users
        for i in range(numUsers):
            self.addUser(f"User {i + 1}")
```

Now we need to create all possible friendships:

<br>

```
# Create friendships
# numUsers * average number of friendships is how many we should create
# n = total users * average friendships / 2

# First generate all possible friendships (if user 1 is friends with everyone, 2-10; then, user 2 doesn't need to add user 1, but 3 -10, etc.. until every possible friendship that could be created is generated)

possibleFriendships = []
for userID in self.users:
    # this doesn't include the users ID but does include the last possible friend ID
    for friendID in range(userID + 1, self.lastID + 1):
        possibleFriendships.append((userID, friendID))
    # This prints all possible combos without duplicates
```

<br>

What is the time complexity of this? 

`O(n)` for the first loop because we are iterating through all the users; but on the nested loop, we go through some (but not all) of the users on each loop (progressively fewer with each loop as we near the end).

This is still `O(n^2)` even though the second loop doesn't go through all of n with each loop, it averages 1/2 * n ( `O(n/2)` ), but removing the qualifying integer, it's still O(n) * O(n) = `O(n^2)`.

Now let's actually create the friendships and assign them friendships:

<br>

```
# Now we need to actually create users and assign them friendships at random

friendshipsToCreate = random.sample(possibleFriendships, (numUsers * avgFriendships) // 2)
print(friendshipsToCreate)

for friendship in friendshipsToCreate:
    self.addFriendship(friendship[0], friendship[1])

# This results in roughly 2 average friendships per user, even though the friendships are randomly assigned (so some will have 3 or 4, and others only 1 or 2)
```

<br>

If we wanted to do this with a shuffle instead of a random.sample(), it might look like this:

<br>

```
        friendshipsToCreate = (numUsers * avgFriendships) // 2
        random.shuffle(possibleFriendships)
```

<br>

We can check the time it takes to run by adding in some time variables and printing the difference:

<br>

```
if __name__ == '__main__':
    sg = SocialGraph()
    start_time = time.time()
    sg.populateGraph(10, 2)
    print(sg.friendships)
    end_time = time.time()
    connections = sg.getAllSocialPaths(1)

    print(f'Runtime: {end_time - start_time} seconds')
    print(connections)
```

<br>
<br>


## Implement Degrees of Separation

Now let's try to `getAllSocialPathts(self, userID)`. We'll pass in a userID and return the extended network, and the shortest path between the user and each person in the extended network. 

We're going between each user in the extended network and calculating the distance between that user and the primary user.

We need to use a Breadth First Search (shortest path). We'll need to store the result in a dictionary instead of a set.

```
visited = {}  # Note that this is a dictionary, not a set
# Create empty queue
q = Queue()
q.enqueue( [userID] )
while q.size() > 0:
    path = q.dequeue()
    v = path[-1]
    # Check if visited
    if v not in visited:
        # Store the social path in the visited dictionary
        visited[v] = path
        # Friendships is our edges adjacency list
        for neighbor in self.friendships[v]
            path_copy = list[path]
            path_copy.append(neighbor)
            q.enqueue(path_copy)
return visited
```

This is following the same BFS algorithm that we've worked with all week. Again, memorizing the basic outline will help to implement BFS and DFS easily.

Is this model accurate to real life?

Not exactly. Friendships aren't random. They're usually formed in clusters - Lambda school friendships are probably clustered around the cohort they're in.

Randomness is a powerful tool but can also be limited in reflecting real life.

What is another way we could create these friendships at a linear runtime?

Here we'll account for collisions and continue to run the algorithm until we don't run into a collision.

```
def populateGraphLinear(self, numUsers, avgFriendships):
    # reset graph
    self.lastID = 0
    self.users = {}
    self.friendships = {}

    for i in range(numUsers):
        self.addUser(f'User {i +1}')

    targetFriendships = numUsers * avgFriendships
    totalFriendships = 0
    # A collision is a failed friendship - trying to create one with yourself or one that already exists
    collisions = 0
    while totalFriendships < targetFriendships:
        userID = random.randint(1, self.lastID)
        friendID = random.randint(1, self.lastID)
        if self.addFriendship(userID, friendID):
            totalFriendships += 2
        else:
            collisions += 1
    print(f"Collisions: {collisions}")
```

This has a _much_ faster run time than our previous solution, which has `O(n^2)` runtime, when accounting for the worst case scenario with the nested loops.

If we consider this within an app, knowing if our scale reaches over 10,000 users, the run time of our previous solution would be unacceptable.

Despite this efficiency, when would we maybe not want to use this solution?

The total number of friendships must be less than the number of users - but if it was only _one_ less.... (100 users, each with 99 friends), the number of times it runs into collisions becomes high enough to be detrimental to performance.

In that case, the quadratic equation would perform better because it does not have collision issues.

If we were to write this for a network where we might assume that almost everyone in the network is a friend with everyone else, the quadratic solution would be more performant, even if it doesn't scale well.

Random sampling performs better with sparse graphs.

The shuffle quadratic sampling performs better with dense graphs.

<br>
<br>

## Earliest Ancestor

The Earliest Ancestor problem is as follows:

Suppose we have some input data describing a graph of relationships between parents and children over multiple generations. The data is formatted as a list of (parent, child) pairs, where each individual is assigned a unique integer identifier.

For example, in this diagram and the sample input, 3 is a child of 1 and 2, and 5 is a child of 4:

<br>

```
 10
 /
1   2   4  11
 \ /   / \ /
  3   5   8
   \ / \   \
    6   7   9
```

<br>

Write a function that, given the dataset and the ID of an individual in the dataset, returns their earliest known ancestor – the one at the farthest distance from the input individual. If there is more than one ancestor tied for "earliest", return the one with the lowest numeric ID. If the input individual has no parents, the function should return -1.

<br>

```
Example input
  6

  1 3
  2 3
  3 6
  5 6
  5 7
  4 5
  4 8
  8 9
  11 8
  10 1
Example output
  10
```

<br>

Clarifications:
* The input will not be empty.
* There are no cycles in the input.
* There are no "repeated" ancestors – if two individuals are connected, it is by exactly one path.
* IDs will always be positive integers.
* A parent may have any number of children.

<br>

A helpful starting point is to look at the tests. We find in our test file an example of the graph:

<br>

```
test_ancestors = [(1, 3), (2, 3), (3, 6), (5, 6), (5, 7), (4, 5), (4, 8), (8, 9), (11, 8), (10, 1)]
```

<br>

Some key words also stand out: 
* `furthest distance` = looking for the _longest_ shortest path (BFS)
* `relationships` (or `connections`) = a graph problem
* `Integer ID` = node/vertex
* `Parent Child Pair` = edges
* `Only look up to an ancestor` = Directional Graph

Knowing that it's a directional graph simplifies how we approach this problem. For example, 6 has an edge with 3 and 5, but because it's directed, 3 does _not_ share an edge with 6 (it's not bidirectional) and only cares about its shared edges with 1 and 2.

`Furthest distance` is tricky because we have to find what are even viable paths first (not all relationships are the same), then track the paths to each ancestor, but only return the _longest_ of those shortest paths. It's like BFS, but a little different.

<br>

First, we need to make a graph. Then we'll traverse the graph, looking for the shortest paths between any two nodes, keeping track of the length of each path to return the longest one.

Our psuedo-code looks like so:

<br>

```
def earliest_ancestor(ancestors, starting_node):
    # Make a graph
    # If no parents, return -1


    # Traverse the graph with BFS
    # Look for the shortest paths between any two nodes

    # Keep track of the lengths of the paths
    # Return where the longest path ends
    # If a tie, return lowest node number
```

<br>

We'll need access to the Queue class as well to run BFS.

Let's create a Graph class to build our graph:

<br>

```
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
```

<br>


Using our Graph class, we'll setup our graph using the passed in ancestors:

<br>

```
def earliest_ancestor(ancestors, starting_node):
    # Make a graph
    graph = Graph()

    # Fill in the graph
    for pair in ancestors:
        graph.add_vertex(pair[0])
        graph.add_vertex(pair[1])

    # Add edge (child to parent)
        graph.add_edge(pair[1], pair[0])
```

<br>

Next, we'll add in variables to track:

<br>

```
# Traverse the graph with BFS
# Look for the shortest paths between any two nodes
q = Queue()
q.enqueue( [starting_node] )

# Track length of current longest path, and current earliest ancestor
max_path_length = 1
# if no parents, will return -1
earliest_ancestor = -1
```

<br>

Now we need to implement the BFS for traversing the graph.

<br>

```
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
```

<br>

This solution now passes all tests and returns the earliest ancestor, or lowest earliest ancestor in the case of a tie. The full code is available in [lecture4.py](lecture4.py), along with an alternate solution.

<br>
<br>

## Word Transformation

Given two words (beginWord and endWord), and a dictionary's word list, return the shortest transformation sequence from beginWord to endWord, such that:

Only one letter can be changed at a time.
Each transformed word must exist in the word list. Note that beginWord is not a transformed word.

Note:

Return None if there is no such transformation sequence.
All words have the same length.
All words contain only lowercase alphabetic characters.
You may assume no duplicates in the word list.
You may assume beginWord and endWord are non-empty and are not the same.

Sample:
beginWord = "hit"
endWord = "cog"
return: ['hit', 'hot', 'cot', 'cog']

beginWord = "sail"
endWord = "boat"
['sail', 'bail', 'boil', 'boll', 'bolt', 'boat']

beginWord = "hungry"
endWord = "happy"
None

We can use the 2MB [words.txt](words.txt) file to test against with its dictionary of words.

<br>

Let's look for key words to tell us about how to tackle the problem

<br>

* `dictionary` = words are nodes
* `Shortest` = Breadth First Search
* `transformation sequence` = path

<br>

As before, we need to build the graph, traverse the graph, and return the proper result.

To work with our `words.txt` file, we'll use the following steps:

<br>

```
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
```

<br>

Rather than constructing a graph, we can traverse the existing list of words to find neighbors:

<br>

```
def get_neighbors(word):
    neighbors = []
    # Turn the word into a list of characters
    compare_word = list(word)
```

<br>

`list[word]` is a Python trick to turn a string into a list of characters. We'll need to traverse the alphabet next. We could do it with a list like so:

> alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

Or we could do it like this:

> for letter in list('abcdefghijklmnopqrstuvwxyz'):

On the loop we want to loop through the compare_word and change each letter to check if it's a word in the provided word dictionary. We need to store a copy of the mutated word.

We want to avoid building out a graph because this is a very dense graph, it would take up a lot of memory, and we can derive information we need from the original source of data, rather than storing it in a new data structure.

<br>

```
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
```

<br>

Now we can find all of the word neighbors, we should run our search.

<br>

```
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
```

<br>

If we run the test cases:

<br>

```
print(find_word_ladder('hit', 'cog'))
# return: ['hit', 'hot', 'cot', 'cog']

print(find_word_ladder('sail', 'boat'))
# ['sail', 'bail', 'boil', 'boll', 'bolt', 'boat']

print(find_word_ladder('hungry', 'happy'))
# None
```

<br>

We receive back:

> ['hit', 'cit', 'cot', 'cog']  
> ['sail', 'bail', 'boil', 'boll', 'bolt', 'boat']  
> None  

So it looks like it's passing our pre-defined tests!

<br>
<br>


## Adventure Map Traversing

This last portion of the project is both the project and Sprint Challenge. Because of its level of difficulty, there is extra time to work on it.

Like a previous repo, we have an `adv.py` file and associated room, player and room files that help us travel (in the class Player).

Our 500 room map allows us to walk North, South, East and West.

There is also visualization code (`python3 adv.py`) to see the map with built in tests that show how many rooms are unvisited.

If we uncomment the REPL code in that file, we can walk around to experiment with how to navigate through the maze.

Our job is to fill out the traversal path with directions.

If we fill it in like so:

```
traversalPath = ['n']
```

Our tests will return that we have 498 unvisited rooms (since we successfully moved to a new room).

We might continue to fill it out like so:

```
traversalPath = ['n', 's', 's', 'w']
```

We can add this code to our room class to print when we visit a room:

```
def __repr__(self):
    return self.name
```

There are also smaller graphs that we can uncomment to use as easier sample graphs for building and testing a solution.

Thinking about this, it's a depth first search because we are not searching level by level, but instead by path.

If we implemented BFS, we'd be backtracking constantly.

With DFS, we're only backtracking after hitting the end of any single path.

Start a graph and begin to build it as you traverse the graph:

```
graph = {}
graph[0] = {'n': '?', 's': '?', 'w': '?', 'e': '?'}


print(player.currentRoom.id)
print(player.currentRoom.getExits())
```

If we move north one room, we'll see that we're now in room one, so we know now that 'n' actually leads to room 1, and that in room 1, 's' leads to room 0:

```
graph[0]['n'] = 1
graph[1] = {'n': '?', 's': '?', 'w': '?', 'e': '?'}
graph[1]['s'] = 0
```

Keep building an algorithm that explores every possible exit and fills in the explored paths.

But when we hit a room where all the explored exits have been marked, how do we determine where to go from our graph code?

A room with an unexplored exit has a '?', so we need to find the nearest room with a '?'. We might use BFS to find the _nearest_ (aka, shortest) path with an unexplored exit.

Solely backtracking will get us to a room we have not fully explored, but that's not the most efficient way to get there (as you might backtrack along paths fully explored, to deep levels).

How do you know when your path is complete and you've explored every single room?

Our traversalPath length won't match the number of rooms because we will need to backtrack eventually - so it'll actually be roughly twice as many path moves than rooms.

When entries in the graph equal the number of rooms, then we know it's complete - or when the exit dictionary contains no question marks.

> HINT: A stack DFS might not be the best. It may lead you to complications.

> HINT: How do you turn a list of exits (n, s, e, w), into a dictionary filled with question marks?

An additional Q&A about this project with Brady Fukumoto can be found [here](https://www.youtube.com/watch?v=6z9nWnygG2I).

<br>

When in doubt, use POLYA and stayed neat, organized, and well-planned.

>Beautiful is better than ugly.  
>Explicit is better than implicit.  
>Simple is better than complex.  
>Complex is better than complicated.  
>Flat is better than nested.  
>Sparse is better than dense.  
>Readability counts.  
>Special cases aren't special enough to break the rules.  
>Although practicality beats purity.  
>Errors should never pass silently.  
>Unless explicitly silenced.  
>In the face of ambiguity, refuse the temptation to guess.  
>There should be one-- and preferably only one --obvious way to do it.  
>Although that way may not be obvious at first unless you're Dutch.  
>Now is better than never.  
>Although never is often better than *right* now.  
>If the implementation is hard to explain, it's a bad idea.  
>If the implementation is easy to explain, it may be a good idea.  
>Namespaces are one honking great idea -- let's do more of those!  

<br>
<br>
<br>