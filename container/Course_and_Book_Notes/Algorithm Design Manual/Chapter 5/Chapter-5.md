## Chapter 5: Graph Traversal

A graph _G_ = _(V, E)_ consists of vertex _V_ together with a set of _E_ of vertex pairs or edges. The key to using using graph algorithms effectively is modeling your problem to take advantage of existing algorithms. First step in any graph problem is figuring out what type of graph you are dealing with:

- _Undirected_ vs _directed_: A graph is undirected if the edges are present in both directions -> any path has paths going from _A_ to _B_ and from _B_ to _A_, etc.

- _Weighted_ vs _unweighted_: Each edge in a weighted graph is assigned a numerical value (weight)

- _Simple_ vs _non-simple_: Some types of edges complicate working with graphs and graphs that do not have these types of edges are considered simple. Examples of complicated edges are self-loops where an edge involves only one vertex and multi-edge edges which occur more than once in a graph.

- _Sparse_ vs _dense_: Graphs are considered sparse when only a small fraction of possible vertex pairs have edges between them and dense if a large fraction do.

- _Cyclic_ vs _acyclic_: Acyclic graphs are those without cycles. Trees are an example of connected, acyclic graphs. Directed Acyclic Graphs (DAGs) arise naturally in scheduling problems where a directed edge (x, y) indicates that activity _x_ must occur before _y_. Topological sorting orders the vertices of a DAG to respect precedence constraints.

- _Embedded_ vs _topological_: A graph is embedded if the vertices and edges are assigned geometric positions - any drawing of a grpah is an embedding. Underlying topology is the complete graph connecting each part of vertices.

- _Implicit_ vs _Explicit_: Some graphs are not constructed and traversed, but built as we use them. An example of this is backtrack search. The vertices of these implicit search graphs are the states of the search vector while edges link pairs of states that can be directly generated from each other. Because you don't have to store the entire graph, often easier to work with an implicit graph.

- _Labeled_ vs _unlabeled_: Each vertex is assigned a name or identifier in a labeled graph to distinguish it from other vertices. A common problem is isomorphism testing - determining whether the topological structure of two graphs are identical if labels are ignored. Such problems usually solved using backtracking to assign each vertex in each graph a label such that the structures are identical.

### Friendship Graph - Social network

- _If I am your friend, are you my friend?_ - Asking if the graph is directed or undirected
- _How close a friend are you?_ - This could add weight to a graph
- _Am I my own friend?_ - Addresses whether graph is simple
- _Who has the most friends?_ - Degree of a vertex is the number of edges adjacent to it. The most popular person defines the vertex of highest degree in the friendship graph
- _Do my friends live near me?_ - Many of your friends are friends based on geography. A full understanding of social networks requires an embedded graph where each vertex is associated with a point where they live
- _Oh, you also know her?_ - Social networking sites are based on explicitly defining links between people, but a complete friendship graph of the world is represented implicitly - each person knows who their friends are but not who their friends are friends with without directly asking.
- _Are you truly an individual or just one of the faceless crowd?_ - Whether the graph is labeled or unlabeled

### Take Home:

Graphs can be used to model a wide variety of structures and relationships. Graph theoretic terminology gives us a language to talk about them.

### Data Structures for Graphs

Selecting the right graph data structure can have an enormous impact on performance.

- _Adjacency Matrix_ - Edges[i, j] = 1 if edge of graph, 0 if not. May use excessive space if many vertices and few edges.
- _Adjacency List_ - Use linked lists to store neighbors adjacent to each vertex

| Comparison                             | Winner                                      |
| -------------------------------------- | ------------------------------------------- |
| Faster to test if (x, y) in graph?     | Adjacency matrixes                          |
| Faster to find the degree of a vertex? | Adjacency lists                             |
| Less memory on small graphs?           | Adjacency lists (m + n) vs (n<sup>2</sup>)  |
| Less memory on big graphs?             | Adjacency matrixes (small win)              |
| Edge insertion or deletion?            | Adjacency matrices O(1) vs O(d)             |
| Faster to traverse the graph?          | Adjacency list O(m + n) vs O(n<sup>2</sup>) |
| Better for most problems?              | Adjacency lists                             |

### Take Home:

Adjacency lists are the right data structure for most applications of graphs.

We represent a graph using following data type. For each graph, we keep a count of number of vertices and assign each vertex a unique ID from 1 to _n_ vertices. Represent edges with linked lists.

```
#define MAXV    1000 /* max number of vertices */

typedef struct {
    int y; /* adjacency info */
    int weight; /* edge weight, if any */
    struct edgenode *next; /* next edge in list */
} edgenode;
```

```
typedef struct {
    edgenode *edges[MAXV + 1]; /* adjacency info */
    int degree[MAXV + 1]; /* outdegree of each vertex */
    int nvertices; /* number of vertices in graph */
    int nedges; /* number of edges in graph */
    bool directed; /* is the graph directed? */
} graph;
```

Degree field counts the number of meaningful entries for a given vertex.

A typical graph format consists of an initial line with the number of vertices and edges in the graph followed by a listing of the edges at one vertex pair per line.

```
initialize_graph(graph *g, bool directed) {
    int i; /* counter */
    g->nvertices = 0;
    g->nedges = 0;
    g->directed = directed;
    for (i = 1; i < MAXV; i++) g->degree[i] = 0;
    for (i = 1; i <= MAXV; i++) g->edges[i] = NULL;
}
```

Reading the graph means inserting each edge into the structure.

```
read_graph(graph *g, bool directed) {
    int i; /* counter */
    int m; /* number of edges */
    int x, y; /* vertices in edge (x, y) */
    initialize_graph(g, directed);
    scanf("%d %d", &(g->nvertices), &m);
    for (i = 1; i <= m; i++) {
        scanf("%d %d", &x, &y);
        insert_edge(g, x, y, directed);
    }
}
```

The critical routine is insert_edge. New edgenodes are inserted at the beginning of adjacency list. We pass boolean flag to determine whether to insert two copies of each node or one.

```
insert_edge(graph *g, int x, int y, bool directed) {
    edgenode *p; /* temporary pointer */
    p = malloc(sizeof(edgenode)); /* allocate edgenode storage */
    p->weight = NULL;
    p->y = y;
    p->next = g->edges[x];
    g->edges[x] = p;
    g->degree[x]++;
    if (directed == False)
        insert_edge(g, y, x, True);
    else
        g->nedges++;
}
```

Printing is just a matter of two nested loops - one to go through vertices and one to go through adjacent edges.

```
print_graph(graph *g) {
    int i; /* counter */
    edgenode *p; /* temporary pointer */
    for (i = 1; i <= g->nvertices; i++) {
        printf("%d: ", i);
        p = g->edges[i];
        while (p != NULL) {
            printf(" %d", p->y);
            p = p->next;
        }
        printf("\n");
    }
}
```

### Traversing a Graph

Each vertex exists in one of three states:

- _undiscovered_ - vertex in original state
- _discovered_ - vertex found, but all edges have yet to be checked
- _processed_ - vertex after all edges have been visited

Start at one vertex, which is now considered discoverred but not yet processed. Explore all edges leaving that vertex. If the edge leads to an undiscovered vertex, it becomes marked as discovered and added to the list of vertices to process. If the edge leads to a processed vertex or an already discovered vertex, it is ignored.

Every undirected edge will be looked at twice - one for each endpoint - while directed edges will get assessed once.

```
bool processed[MAXV+1]; /* which vertices have been processed */
bool discovered[MAXV+1]; /* which vertices have been discovered */
int parent[MAXV+1]; /* discovery relation */
    /* Each vertex is initialized as undiscovered: */
initialize_search(graph *g) {
    int i; /* counter */
    for (i = 1; i <= g->nvertices; i++) {
        processed[i] = discovered[i] = False;
        parent[i] = -1;
    }
}
```

Once vertex discovered, added to a queue. Since we process vertices FIFO, oldes vertices are expanded first, which are closest to the root.

```
bfs(graph *g, int start) {
    queue q; /* queue of vertices to visit */
    int v; /* current vertex */
    int y; /* successor index */
    edgenode *p /* temporary pointer */
    init_queue(&q);
    enqueue(&q, start);
    discovered[start] = True;
    while (empty_queue(&q) == False) {
        v = dequeue(&q);
        process_vertex_early(v);
        processed[v] = True;
        p = g->edges[v];
        while (p != NULL) {
            y = p->y;
            if ((processed[y] == False) || g->directed)
                process_edge(v, y);
            if (discovered[y] == False) {
                enqueue(&q, y);
                discovered[y] = True;
                parent[y] = v;
            }
            p = p->next;
        }
        process_vertex_late(v);
    }
}
```

process_vertex_late, process_vertex_early, and process_edge allow us to customize traversal of the graph.

Initially, we'll do all vertex processing on entry, so process_vertex_late() returns without action:

```
process_vertex_late(int v) {}
process_vertex_early(int v) {
    printf("Processed vertex %d\n", v);
}
process_edge(int x, int y) {
    printf("Processed edge (%d, %d)\n", x, y);
}
```

We print each vertex and edge exactly once.

If we instead set process_edge to:

```
process_edge(int x, int y) {
    nedges = nedges + 1;
}
```

we get an accurate count of the number of edges.

### Finding Paths

```
find_path(int start, int end, int parents []) {
    if ((start == end) || (end == -1))
        printf("\n%d", start);
    else {
        find_path(start, parents[end], parents);
        printf(" %d", end);
    }
}
```

The tree constructed from breadth-first-search discovers vertices in order of increasing distance from root and so can be used to get the shortest path. The shortest path tree is only useful if breadth-first search was performed with one of the vertices you're interested in computing a path from used as root. It is also important to note that it only gives the shortest path if the graph is unweighted.

```
connected_components(graph *g) {
    int c; /* component number */
    int i; /* counter */
    initialize_search(g);
    c = 0;
    for (i = 1; i <= g->nvertices; i++) {
        if (discovered[i] == False) {
            c = c + 1;
            printf("Component %d: ", c);
            bfs(g, i);
            printf("\n");
        }
    }
}
```

```
process_vertex_early(int v) {
    printf(" %d", v);
}
```

### Two-Coloring Graphs

Seeks to assign a label (or color) to each vertex of a graph such that no edge links any two vertices of the same color. You could avoid conflicts by assigning every vertex a unique color, but the goal is to use as few colors as possible. Vertex coloring problems often arise in scheduling applications such as register allocation in compilers.

A graph is bipartite if it can be colored without conflict using only two colors.

```
twocolor(graph *g) {
    int i; /* counter */
    for (i = 1; i <=(g->nvertices); i++) {
        color[i] = uncolored;
    bipartite = True;
    initialize_search(&g);
    for (i = 1; i <=(g->nvertices); i++)
        if (discovered[i] == False) {
            color[i] = white;
            bfs(g, i);
        }
}
```

```
process_edge(int x, it y) {
    if (color[x] == color[y]) {
    bipartite = False;
    printf("Warning: not bipartite due to ("%d, %d)\n", x, y);
    }
    color[y] = complement(color[x]);
}
```

```
complement(int color) {
    if (color == white) return black;
    if (color == black) return white;
}
```

### Take Home Lesson

Breadth-first and depth-first searches provide mechanisms to visit each edge and vertex of the graph. They prove the basis of most simple, efficient graph algorithms.

### Depth-First Search

Difference between depth and breadth-first search is the order in which vertices are explored. This order is dependent on the container in which the _discovered_ vertices are stored.

- Queue: With first in, first out, we explore the oldest unexplored vertices first. Explorations radiate slowly from the starting vertex, defining a breadth-first search.
- Stack: By storing vertices last in, first out, we visit neighbors if they are available and back up only when surrounded by previously discovered vertices. Our explorations quickly move away from the starting point and define a depth-first search.

Our implementation of dfs maintains a notion of time for each vertex. Time clock ticks each time we enter or exit any vertex. We then keep track of the entry and exit times for each vertex. Depth first search has a neat recursive implementation which eliminates the need to explicitly use a stack:

```
DFS(G, u)
    state[u] = "undiscovered"
    process vertex u if desired
    time = time + 1
    entry[u] = time
    for each v ∈ Adj[u] do
        process edge (u, v) if desired
        if state[v] = "undiscovered" then
            p[v] = u
            DFS(G, u)
    state[u] = "processed"
    exit[u] = time
    time = time + 1
```

The time intervals have interesting useful properties:

- _Who is an ancestor?_: If _x_ is the ancestor of _y_ in a DFS tree, _x_ has to be entered before _y_ and _y_ must be exited before _x_.
- _How many descendants?_ : The clock gets incremented in each vertex entry and vertex exit. So half the time difference between entry and exit times of _v_ is the total descendants of _v_.

Depth first search partitions edges of an undirected graph into two classes - tree edges (those that discover new vertices) and back edges (those whose other endpoint is an ancestor of the vertex being expanded).

A depth first search can be thought of as a bread-first search with a stack instead of a queue.

```
dfs(graph *g, int v) {
    edgenode *p; /* temporary pointer */
    int y; /* successor vertex */
    if (finished) return; /* allow for search termination */
    discovered[v] = true;
    time = time + 1;
    entry_time[v] = time;
    process_vertex_early(v);
    p = g->edges[v];
    while (p != NULL) {
        y = p->y;
        if (discovered[u] == False) {
            parent[y] = v;
            process_edge(v, y);
            dfs(g, y);
        }
        else if ((!processed[y] && (parent[v]! = y)) || (g->directed))
            process_edge(v, y);
            if (finished) return;
            p = p->next;
    }
    process_vertex_late(v);
    time = time + 1;
    exit_time[v] = time;
    processed[v] = true;
}
```

### Take Home:

DFS organizes vertices by entry/exit times and edges into tree and back edges. The organization is what gives DFS its real power.

### Finding Cycles:

Back edges are key in finding cycles in undirected graphs. If there is no back edge, all edges are tree edges and no cycle exists in the tree. Any back edge going from _x_ to ancestor _y_ creates a cycle with tree path from _y_ to _x_. These cycles are easy to find with DFS:

```
process_edge(int x, int y) {
    if (discovered[y] && (parent[x] != y)) { /* found back edge */
        printf("Cycle from %d to %d: ", y, x);
        find_path(y, x, parent);
        printf("\n\n");
        finished = true;
    }
}
```

The correctness of the cycle relies on processing each undiscovered edge once, which is why we use the finished flag to terminate after finding the first cycle.

A vertex whose deletion disconnects a connected component of a graph is a _articulation vertex_ or _cut-node_. Any graph with a cut-node is inherently fragile. The connectivity of a graph is the smallest number of vertices whose deletion will disconnect the graph. The connectivity is one if there is an articulation vertex.

Back edges act like security cables, ensuring none of the vertices between the vertices it connects can be articulation vertices.

Let reachable*answer[v] denote earliest reachable ancestor of vertex \_v* from an ancestor of _v_ using a back edge. Initially reachable_ancestor[v] = v;

```
int reachable_ancestor[MAXV+1]; /* earliest reachable ancestor of v */
int tree_out_degree[MAXV+1]; /* dfs tree outdegree */
process_vertex_early(int v) {
    reachable_ancestor[v] = v;
}
```

We update reachable_ancestor[v] when we ssee a back edge that takes us to an earlier ancestor than we've previously seen. Relative age can be determined from entry_times.

```
process_edge(int x, int y) {
    int class; /* edge class */
    class = edge_classification(x, y);
    if (class == TREE)
        tree_out_degree[x] = tree_out_degree[x]+1;
    if ((class == BACK) && (parent[x] != y)) {
        if (entry_time[y] < entry_time[ reachable_ancestor[x]])
            reachable_ancestor[x] = y;
    }
}
```

**Three cases of articulation vertices**:

- Root cut-nodes - If the root has 2 or more children, it must be an articulation vertex. No edges from the subtree of the second child can possibly connect to the subtree of the first child.
- Bridge cut-nodes - if earlies reachable vertex from _v_ is _v_, deleting the single edge (parent[v], v) disconnects the graph. Clearly, parent[v] must be an articulation vertex. Vertex _v_ is also, unless it is a leaf.
- Parent cut-nodes - if the earlies reachable vertex from _v_ is the parent of _v_, deleting the parent must sever _v_ from the tree unless the parent is the root.

```
process_vertex_late(v) {
    bool root; /* is the vertex the root of the DFS tree? */
    int time_v; /* earliest reachable time for v */
    int time_parent; /* earliest reachable time for parent[v] */

    if (parent[v] < 1) { /* test if v is the root */
        if (tree_out_degree[v] > 1)
            printf("Root articulation vertex: %d\n", v);
            return;
    }
    root = (parent[parent[v]] < 1); /* test if parent[v] is root */
    if (!root) {
        if (reachable_ancestor[v] == parent[v]) {
            pritnf("Parent articulation vertex: %d\n", parent[v]);
        }
        if (reachable_ancestor[v] == v) {
            printf("Bridge articulation vertex: %d\n", parent[v]);
            if (tree_out_degree[v] > 0) /* test if v is not a leaf */
                printf("Bridge articulation vertex: %d\n", v);
        }
        time_v = entry_time[reachable_ancestor[v]];
        time_parent = entry_time[reachable_ancestor[parent[v]]];
        if (time_v < time_parent)
            reachable_ancestor[parent[v]] = reachable_ancestor[v];
    }
}
```

A signle edge whose deletion disconnects the graph is called a bridge. A graph without a bridge is edge-biconnected.

Edge(x, y) is a bridge if it is a tree edge and no back edge connects from _y_ or below to _x_ or above.

For directed graphs, the correct labeling of each edge can be determined from the state, discovery time, and parent of each vertex.

```
int edge_classification(int x, int y) {
    if (parent[y] == x) return true;
    if (discovery[y] && !processed[y]) return BACK;
    if (processed[y] && (entry_time[y] > entry_time[x]))
        return FORWARD;
    if (processed[y] && (entry_time[y] < entry_time[x]))
        return CROSS;
    printf("Warning, unclassified edge (%d, %d)\n", x, y);
}
```

### Topological Sorting

Topological sorting is the most important operation on directed acyclic graphs and it orders the vertices on a line from left to right. This ordering can't exist if the graph contains a directed cycle.

Topological sorting can be efficiently performed using depth-first searching. Labeling the vertices in the reverse order they were marked processed finds a topological sort of a DAG.

Consider what happens to each directed edge {x, y} as we encounter it exploring _x_:

- if _y_ is undiscovered, we start a DFS of _y_ before continuing with _x_. Y must be marked processed before _x_ and _x_ appears before _y_ in topological order, as a must.

- if _y_ is discovered but not processed, {x, y} is a back edge and it can't be a DAG

- if _y_ is processed, it will have been labeled before _x_ and therefore _x_ appears before _y_ in topological order, as it must.

```
process_vertex_late(int v) {
    push(&sorted, v);
}

process_edge(int x, int y) {
    int class; /* edge class */
    class = edge_classification(x, y);
    if (class == BACK)
        printf("Warning: Directed cycle found, not a DAG\n");
}

topsort(graph *g) {
    int i; /* counter */
    init_stack(&sorted);
    for (i = 1; i <= g->nvertices; i++) {
        if (discovered[i] == False)
            dfs(g, i);
            print_stack(&sorted); /* report topological order */
    }
}
```

### Strongly Connected Components

A directed graph is strongly connected if there is a directed path between any two vertices. Graphs that are not strongly connected can be partitioned into strongly connected components. The set of such components and the weakly-connecting edges can be determined using DFS. All vertices in a directed cycle must be in the same strongly connected component. We can shrink/contract the vertices in the cycle and repeat. Process terminates when no directed cycle remains and each vertex represents a strongly connected component.

We update our notion of oldest reachable vertex in response to (1) nontree edges and (2) backing up from a vertex. Because it's a directed graph, we have to worry about forward edges (from a vertex to a descendant) and cross edges (from a vertex back to a nonaancestor but previously discovered vertex). This algorithm will peel one strong component off at a time and assign each of its vertices the number of the component it is in:

```
strong_components(graph *g) {
    int i; /* counter */
    for (i = 1; i <= (g->nvertices); i++) {
        low[i] = i;
        scc[i] = -1;
    }
    components_found = 0;
    init_stack(&active);
    initialize_search(&g);
    for (i = 1; i <= (g->nvertices); i++)
        if (discovered[i] == False) {
            dfs(g, i);
        }
}
```

Define low[v] to be the oldest vertex known to be in the same strongly connected component as v. Not necessarily an ancestor, but may be a distant cousin of v because of cross edges. Cross edges that point vertices from previous strongly connected components of the graph can't help because there is no way back from them to v, but otherwise they are fair game. Forward edges have no impact on reachability over depth-first tree edges and can be disregarded.

```
int low[MAXV+1] /* oldest vertex surely in component of v */
int scc[MAXV+1] /* strong component number of each vertex */

process_edge (int x, int y) {
    int class; /* edge class */
    class = edge_classification(x, y);
    if (class == BACK) {
        if (entry_time[y] < entry_time[ low[x] ])
            low[x] = y;
    }
    if (class == CROSS) {
        if (scc[y] == -1) /* component not yet assigned */
            if (entry_time[y] < entry_time[ low[x] ])
                low[x] = y;
    }
}
```

A new strongly connected component is found whenever the lowest reachable vertex from v is v. If so, we clear the stack of the component. Otherwise, we give our parent the benefit of the oldest ancestor we can reach and backtrack.

```
process_vertex_early(int v) {
    push(&active, v);
}

process_vertex_late(int v) {
    if (low[v] == v) { /* edge (parent[v], v) cutes of scc */
        pop_component(v);
    }
    if (parent[v] > 0) /* only if v is not the root */
        if (entry_time[low[v]] < entry_time[low[parent[v]]])
            low[parent[v]] = low[v];
}

pop_component(int v) {
    int t; /* vertex placeholder */
    components_found = components_found + 1;
    scc[v] = components_found;
    while ((t = pop(&active)) != v) {
        scc[t] = components_found;
    }
}
```
