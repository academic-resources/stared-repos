## Chapter 6: Weighted Graph ALgorithms

Chapter 5's graph data structure quietly supported edge-weighted graphs, but we'll make it explicit for this chapter. The adjacency list structure consists of an array of linked lists where the outgoing edges from vertex.x appear in the list edges[x]

```
typedef struct {
    edgenode *edges[MAXV+1]; /* adjacency info */
    int degree[MAXV+1]; /* outdegree of each vertex */
    int nvertices; /* number of vertices in graph */
    int nedges; /* number of edges in graph */
    int directed; /* is the graph directed? */
} graph;
```

Each edgenode is a record with three fields: first describing second endpoint of the edge (y), second enabling us to annotate the edge with a weight (weight) and third to annotate the next edge in the list (nex):

```
typedef struct {
    int y; /* adjacency info */
    int weight; /* edge weight, if any */
    struct edgenode *next; /* next edge in list */
} edgenode;
```

### Minimum Spanning Trees

A spanning tree of a graph G = (V, E) is a subset of edges from E forming a tree connecting all vertices of V. For edge-weighted graphs, a tree whose sum of edge weights is as small as possible is a minimum spanning tree. There can be more than one minimum spanning tree in a graph. All spanning trees of an unweighted graph are minimum spanning trees.

### Prim's Algorithm

Starts from one vertex and grows the rest of the tree one edge at a time until all vertices included

Prim-MST(G)

&nbsp;&nbsp;&nbsp;&nbsp;Select an arbitrary vertex s to start the tree from

&nbsp;&nbsp;&nbsp;&nbsp;While (therre are still nontree vertices)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select the edge of minimum weight between a tree and nontree vertex

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add the selected edge and vertex to the tree T<sub>prim</sub>

```
prim(graph *g, int start) {
    int i; /* counter */
    edgenode *p; /* temporary pointer */
    bool intree[MAXV+1]; /* is the vertex in the tree yet? */
    int distance[MAXV+1]; /* cost of adding to tree */
    int v; /* current vertex to process */
    int w; /* candidate next vertex */
    int weight; /* edge weight */
    int dist; /* best current distance from start */

    for (i = 1; i <= g->nvertices; i++) {
        intree[i] = False
        distance[i] = MAXINT;
        parent[i] = -1;
    }
    distance[start] = 0;
    v = start;
    while (intree[v] == False) {
        intree[v] = True;
        p = g->edges[v];
        while (p != NULL) {
            w = p->y;
            weight = p->weight;
            if ((distance[w] > weight) && (intree[v] == False)) {
                distance[w] = weight;
                parent[w] = v;
            }
            p = p->next;
        }
        v = 1;
        dist = MAXINT;
        for (i = 1; i <= g->nvertices; i++)
            if ((intree[i] == False) && (dist > distance[i])) {
                dist = distance[i];
                v = i;
            }
    }
}
```

This is an O(n<sup>2</sup>) implementation. Priority-queue data structures lead to an O(m + n lg n) implementation by making it faster to find the minimum cost edge to expand the tree at each iteration.

### Kruskal's Algorithm

Builds up connected components of vertices, culminating in the minimum spanning tree. Initially, each vertex forms its own separate component in the tree to be. The algorithm repeatedly considers the lightest remaining edge and tests whether its two endpoints lie within the same connected component. If so, the edge will be discarded because adding it would create a cycle in the tree to be. If the endpoints are in different components, we insert the edge and merge the two components into one. Since each connected component is always a tree, don't have to test for cycles.

Kruskal-MST(G)

&nbsp;&nbsp;&nbsp;&nbsp;Put the edges in a prirority queue ordered by weight

&nbsp;&nbsp;&nbsp;&nbsp;count = 0

&nbsp;&nbsp;&nbsp;&nbsp;while (count < n-1) do

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;get next edge(v, w)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (component(v) does not equal component(w))

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add to T<sub>kruskal</sub>

What is the time complexity?

- Sorting the m edges takes O(m lg m) time
- The for loop makes m iterations, each testing the connectivity of two trees plus an edge. In the most simple-minded approach, this can be implemented by breadth-first or depth-first search in a sparse graph with at most n edges and n vertices, thus yielding an O(mn) algorithm.

Faster implementation results if we can implement the component test in faster than O(n) time. Union-find is a data structure that can support such queries in O(lg n) time, allowing Kruskal's algorithm to run in O(m lg m) time, faster than Prim's for sparse graphs.

```
kruskal(graph *g) {
    int i; /* counter */
    set_union s; /* set union data structure */
    edge_pair e[MAXV+1]; /* array of edges data structure */
    bool weight_compare();
    set_union_init(&s, g->nvertices);
    to_edge_array(g, e); /* sort edges by increasing cost */
    qsort(&e, g->nedges, sizeof(edge_pair), weight_compare);
    for (i = 0; i < (g->nedges); i++) {
        if (!same_component(s, e[i].x, e[i].y)) {
            printf("edge (%d, %d) in MST\n", e[i].x, e[i].y);
            union_sets(&s, e[i].x, e[i].y);
        }
    }
}
```

### Union-Find Data Structure

A set partition is a partitioning of the elements of some universal set (say integers 1 to n) into a collection of disjointed subsets. Each element must be in exactly one subset.

The connected components in a graph can be represented as a set partition. For Kruskal's algorithm to run efficiently, we need a data structure that efficiently supports the following operations:

- _Same component(V<sub>1</sub>, V<sub>2</sub>)_ - Do vertices V<sub>1</sub> and V<sub>2</sub> occur in the same connected component of the current graph?
- _Merge components(C<sub>1</sub>, C<sub>2</sub>)_ - Merge the given pair of connected components into one component in response to an edge between them.

The union-find data structure represents each subset as a "backwards" tree, with pointers from a node to its parent. Each node of this tree contains a set el.ement and the name of the set is taken from the key at the root.

```
typedef struct {
    int p[SET_SIZE+1]; /* parent element */
    int size[SET_SIZE+1]; /* number of elements in subtree */
    int n; /* number of elements in set */
} set_union;
```

We implement desired ops in terms of operations _union_ and _find_:

- _Find(i)_ - Find the root of tree containing element _i_ by walking up the parent pointers until there is nowhere to go. Return the lable of the root.
- _Union(i, j)_ - Link the root of one of the trees (say containing i) to the root of the tree containing the other (say j) so _find(i)_ now equals _find(j)_.

To minimize tree height, it is better to make the smaller tree the subtree of the larger one. The height of all the nodes in the root subtree stay the same while the height of the nodes merged into the tree all increase by one. Thus, merging in the smaller tree leaves the height unchanged on the larger set of vertices

```
set_union_init(set_union *s, int n) {
    int i; /* counter */
    for (i = 1; i <= n; i++) {
        s->p[i] = i;
        s->size[i] = 1;
    }
    s->n = n;
}

int find(set_union *s, int x) {
    if (s->p[x] == x)
        return x;
    else
        return find(s, s->p[x]);
}

int union_sets(set_union *s, int s1, int s2) {
    int r1, r2; /* roots of sets */
    r1 = find(s, s1);
    r2 = find(s, s2);
    if (r1 == r2) return; /* already in same set */
    if (s->size[r1] >= s->size[r2]) {
        s->size[r1] = s->size[r1] + s->size[r2];
        s->p[r2] = r1;
    }
    else {
        s->size[r2] = s->size[r1] + s->size[r2];
        s->p[r1] = r2;
    }
}

bool same_component(set_union *s, int s1, int s2) {
    return (find(s, s1) == find(s, s2))
}
```

On each union, the tree with fewer nodes becomes the child. Only when merging two height 2 trees do we get a tree of height 3 (now with four nodes). At most, we can do lg<sub>2</sub>n doublings to use up all n nodes, so we can do both unions and finds in O(log n) time.

### Variations on Minimum Spanning Trees

- _Maximum Spanning Trees_ - The maximum spanning tree of any graph can be found by simply negating the weights of all edges and running Prim's algorithm. The most negative tree in the negated graph is the maximum spanning tree in the original. Most graph algorithms do not adapt so easily to negative numbers.
- _Minimum Product Spanning Trees_ - Since lg(a <sup>.</sup> b) = lg(a) + lg(b), the minimum spanning tree on a graph whose edge weights are replaced with their logarithms gives the minimum product spanning tree on the original graph
- _Minimum Bottleneck Spanning Tree_ - Tree that minimizes the maximum edge weight over all trees

The minimum spanning tree of a graph is unique if all m edge weights in the graph are distinct. Otherwise, the way Prim's/Kruskal's algorithms break ties determines which minimum spanning tree is returned.

Two variants of minimum spanning tree not solvable with these techniques:

- _Steiner tree_ - If you want to wire a bunch of houses together but have the freedom to add extra intermediate vertices to serve as a shared junction
- _Low-degree Spanning Tree_ - If you want to find the minimum spanning tree where the highest degree node in the tree is small. The lowest max-degree tree possible would be a simple path and have n-2 nodes of degree 2 with two endpoints of degree 1. A path that visits each vertex once is called a Hamiltonian path.

### Shortest Paths

A path is a sequence of edges connecting two vertices. The shortest path from _s_ to _t_ in an unweighted graph can be constructed using a breadth-first search from _s_.

### Dijkstra's Algorithm

The method of choice for finding the shortest path in an edge and/or vertex-weighted graph. Given a particular start vertex _s_, it finds the shortest path from _s_ to every other vertex in the graph, including your desired destination _A_.

Dijkstra's Algorithm proceeds in a series of rounds where each round establishes the shortest path from _s_ to some new vertex. Specifically, _x_ is the vertex that minimizes the _dist(s, v<sub>1</sub>) + w(v<sub>1</sub>, x)_ over all unfinished 1 ≤ _i_ ≤ _n_ where _w(i, j)_ is the length of the edge from _i_ to _j_ and _dist(i, j)_ is the length of the shortest path between them.

ShortestPath-Dijkstra(G, s, t)

&nbsp;&nbsp;&nbsp;&nbsp;known = {s)

&nbsp;&nbsp;&nbsp;&nbsp; for i = 1 to n, dist[i] = infinity

&nbsp;&nbsp;&nbsp;&nbsp; for each edge (s, v), dist[v] = w(s, v)

&nbsp;&nbsp;&nbsp;&nbsp; last = s

&nbsp;&nbsp;&nbsp;&nbsp;while (last does not equal t)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;select v<sub>next</sub>, the unkonwn vertex minimizing dist[v]

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for each edge(v<sub>next, x), dist[x] = min[dist[x], dist[v<sub>next</sub>] + w(v<sub>next</sub>, x)]

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last = v<sub>next</sub>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;known = known U {v<sub>next</sub>}

In each iteration, we add one vertex to the tree of vertices for which we know the shortest path from _s_. We keep track of best path seen for all vertices outside the tree and insert them in order of increasing cost.

```
dijkstra(graph *g, int start) {
    int i; /* counter */
    edgenode *p; /* temporary pointer */
    bool intree[MAXV+1]; /* is the vertex in the tree yet? */
    int distance[MAXV+1]; /* distance vertex is from start */
    int v; /* current vertex to process */
    int w; /* candidate next vertex */
    int weight; /* edge weight */
    int dist; /* best current distance from start */

    for (i = 1; i <= g->nvertices; i++) {
        intree[i] = False;
        distance[i] = MAXINT;
        parent[i] = -1;
    }
    distance[start] = 0;
    v = start;
    while (intree[v] == False) {
        intree[v] = True
        p = g->edges[v];
        while (p != NULL) {
            w = p->y;
            weight = p->weight;
            if (distance[w] > (distance[v] + weight)) {
                distance[w] = distance[v] + weight;
                parent[w] = v;
            }
            p = p->next;
        }
        v = 1;
        dist = MAXINT;
        for (i = 1; i <= g->nvertices; i++)
            if ((intree[i] == False) && (dist > distance[i])) {
                dist = distance[i];
                v = i;
            }
    }
}
```

Finds more than shortest path, from _s_ to _t_, finds the shortest path from _s_ to all other vertices. Dijkstra works correctly only on graphs without negative-cost edges.

As implemented, the run-time complexity is (On<sup>2</sup>). The length of the shortest path from start to a given vertex _t_ is exactly the value of distance[t]. To find the actual path, we follow the backward parent pointers from _t_ until we hit start (or -1 if no such path exists)

### Stop and Think: Shortest Path with Node Costs

_Problem_: We are given a graph whose weights are on the vertices instead of the edges. Thus, the cost of a path from _x_ to _y_ is the sum of the weights of all vertices on the path.

Give an efficient algorithm for finding the shortest paths.

_Solution_: You could modify Dijkstra by replacing all references to the weight of an edge with the weight of the destination vertex, which can be looked up as needed from an array of vertex weights.

You could also opt to leave Dijkstra intact and construct an edge-weighted graph on which Dijkstra will give a desired answer. Set the weight of each directed edge (i, j) in the input graph to the cost of vertex j.

### All-Pairs Shortest Path

Floyd's all-pairs shortest-path algorithm is a slick way to create a nxn distance matrix from the origiinal weight matrix of the graph

```
typedef struct {
    int weight[MAXV+1]; /* adjacency/weight info */
    int nvertices; /* number of vertices in the graph */
} adjacency_matrix;
```

We should initialize each non-edge to MAXINT. This way, we can test whether it is present and automatically ignore it in shortest-path computations since only real edges will be used, provided MAXINT is greater than the diameter of your graph. _Diameter_ being the longest shortest-path distance over all pairs of vertices.

There are several ways to characterize the shortest path between two nodes in a graph. The Floyd-Warshall algorithm starts by numbering the vertices of the graph from 1 to _n_. We use the numbers not to label vertices but to order them. When k=0, we are allowed no intermediate vertices, so the only allowed paths are the original edges on the graph. Thus the initial all-pairs shortest-path matrix consists of the initial adjacency matrix. We perform n iterations where the _kth_ iteration allows only the first _k_ vertices as possible intermediate steps on the path between each pair of vertices _x_ and _y_.

```
floyd(adjacency_matrix *g) {
    int i, j; /* dimension counters */
    int k; /* intedrmediate vertex counter */
    int through_k; /* distance through vertex */
    for (k = 1; k <= g->nvertices; k++)
        for (i = 1; i <= g->nvertices; i++)
            for (j = 1; j <= g->nvertices; j++) {
                through_k = g->weight[i][k] + g->weight[k][j];
                if (through_k < g->weight[i][j])
                    g->weight[i][j] = through_k;
            }
}
```

Floyd-Warshall all-pairs shortest-path runs in O(n<sup>3</sup>) time which is asymptotically no better than _n_ calls to Dijkstra's algorithm, but the loops are so tight and program so short that it runs better in practice. It is one of the rare graph algorithms that works better on adjacency matrixes than adjacency lists.

Output of Floyd's algorithm does not enable the reconstruction of the actual path between any given pair of vertices, but these paths can be recovered if we retain a parent matrix _P_ of the last intermediate vertex used for each vertex pair (x, y). If the value is _k_, the shortest path from _x_ to _y_ is the concatenation of the shortest path from _x_ to _k_ and the shortest path from _k_ to _y_, whcih can be reconstructed recursively given matrix _P_.

### Transitive Closure:

_Blackmail graph_: There is a directed edge (i, j) if person _i_ has sensitive-enough private information on person _j_ so that _i_ can get _j_ to do anything he wants. You want to hire one of the _n_ people to be your personal representative. Who has the most power in terms of blackmail potential?

Simple answer would be vertex of highest degree. But if Steve can only blackmail Miguel and Miguel can blackmail everybody else, you want to hire Steve.

### Network Flows and Bipartite Matching

Edge-weighted graphs can be interpreted as a network of pipes where the weight of edge (i,j) determines the capacity of the pipe. Capacities can be thoguht of as a function of the cross-sectional area of the pipe. A wide pipe might be able to carry 10 units of flow at a time whereas a narrower pipe may only be able to carry 5 units. The network flow problem asks for the maximum amount of flow which can be sent from vertices _s_ to _t_ in a given weighted graph _G_ while respecting the maximum capacities of each pipe.

### Bipartite Matching

A _matching_ in a graph _G = (V, E)_ is a subset of edges E' ⸦ E such that no two Edges of E' share a vertex. A matching pairs off certain vertices such that every vertex is in, at most, one such pair.

Graph _G_ is bipartite or _two-colorable_ if the vertices can be divided into two sets, _L_ and _R_ such that all edges in _G_ have one vertex in _L_ and one vertex in _R_.

The largest bipartite matching can be found using network flow. Create a source node _s_ that is connected to every vertex in _L_ by an edge of weight 1. Create a sink node _t_ and connect it to every vertex in _R_ by an edge of weight 1. Assign each edge in the bipartite graph _G_ a weight of 1. The maximum flow _s_ to _t_ defines the largest matching in _G_.

### Computing Network Flows

It can be shown that the flow through a network is optimal if and only if it contains no _augmenting path_. Since each augmentation adds to the flow, we must eventually find the global maximum.

The key structure is the residual flow graph, denoted as _R(G, f)_ where _G_ is the input graph and _f_ is the current flow through _G_.

This directed edge-weighted _R(G, f)_ contains the same vertices as _G_. For each edge (i, j) is _G_ with capacity _c(i, j)_ and flow _f(i, j)_. _R(G, f)_ may contain two edges: <br/>
(i) an edge _(i, j)_ with weight _c(i, j) - f(i, j)_, if _c(i, j) - f(i, j)_ > 0 and <br/>
(ii) an edge _(j, i)_ with weight _f(i, j)_, if _f(i, j)_ > 0

The prescence of edge (i, j) in the residual graph indicates that positive flow can be pushed from _i_ to _j_. The weight of the edge gives the exact amount that can be pushed. A path in the residual graph from _s_ to _t_ implies that more flow can be pushed from _s_ to _t_ and the minimum edge weight on the path defines the amount of extra flow that can be pushed.

### Take Home:

The maximum flow from _s_ to _t_ always equals the weight of the minimum s-t cut. Thus, flow algorithms can be used to solve general edge and vertex connectivity problems in graphs.

```
typedef struct {
    int v; /* neighboring vertex */
    int capacity; /* capacity of edge */
    int flow; /* flow through edge */
    int residual; /* residual capacity of edge */
    struct edgenode *next; /* next edge in list */
} edgenode;
```

We use breadth-first search to look for any path from source to sink that increases the total flow, and use it to augment the total. We terminate with the optimal flow when no such augmenting path exists.

```
netflow(flow_graph *g, int source, int sink) {
    int volume; /* weight of the augmenting path */
    add_residual_edges(g);
    initialize_search(g);
    bfs(g, source);
    volume = path_volume(g, source, sink, parent);
    while (volume > 0) {
        augment_path(g, source, sink, parent, volume);
        initialize_search(g);
        bfs(g, source);
        volume = path_volume(g, source, sink, parent);
    }
}
```

Any augmenting path from source to sink increases the flow, so we can use bfs to find such a path in the appropriate graph. We only consider network edges that have remaining capacity (positive residual flow). This helps bfs distinguish between saturated and unsaturated edges.

```
bool valid_edge(edgenode *e) {
    if (e->residual > 0) return true;
    else return false;
}
```

Augmenting a path transfers the maximum possible volume from the residual capacity into positive flow. This amount is limited by the path-edge with the smallest amount of residual capacity just as the rate of which traffic can flow is limited by the most congested point.

```
int path_volume(flow_graph *g, int start, int end, int parents[]) {
    edgenode *e; /* edge in question */
    edgenode *find_edge();
    if (parents[end] == -1) return 0;
    e = find_edge(g, parents[end], end);
    if (start == parents[end])
        return e->residual;
    else
        return (min (path_volume(g, start, parents[end], parents), e->residual));
}

edgenode *find_edge(flow_graph *g, int x, int y) {
    edgenode *p; /* temporary pointer */
    p = g->edges[x];
    while (p != NULL) {
        if (p->v == y) return p;
        p = p->next;
    }
    return NULL;
}
```

Sending an additional unit of flow along directed edge (i, j) reduces the residual capacity of edge (i, j) but increases the residual capacity of edge (j, i). Thus, the act of augmenting a path requires modifying both forward and reverse edges for each link on the path.

```
augment_path(flow_graph *g, int start, int end, int parents[], int volume) {
    edgenode *e; /* edge in question */
    edgenode *find_edge();
    if (start == end) return;
    e = find_edge(g, parents[end], end);
    e->flow += volume;
    e->residual -= volume;
    e = find_edge(g, end, parents[end]);
    e->residual += volume;
    augment_path(g, start, parents[end], parents, volume);
}
```

Initializing the graph requires creating directed flow edges (i, j) and (j, i) for each network edge e = (i, j). Initial flows are set to 0. The initial residual flows of (i, j) is set to the capacity of e, while the initial flow of (j, i) is set to 0.

### Design Graphs, not Algorithms

The secret is learning to design graphs, not algorithms

- The maximum spanning tree can be found by negating the edge weights of input graph _G_ and using a minimum spanning tree algorithm in the result. The most negative weight spanning tree is the maximum weight tree in _G_.
- To solve bipartite matching, we can construct a special network flow graph such that the maximum flow corresponds to a maximum cardinality matching.

### Stop and Think: The Pink Panther's Passport in Peril

_Problem_: Algorithm to design natural routes for video game characters to follow through obstacle-filled rooms
_Solution_: In trying to create natural paths, we would mimic actions of intelligent beings, which move lazily and/or efficiently. This lends to shortest path problem. Could lay out a grid of points in the room and create vertexes for each grid point valid for character movement (i.e., not containing an obstacle).

### Sotp and Think: Ordering the Sequence:

_Problem_: DNA sequencing separates data consisting of small fragments where we know certain fragments lie to the left of a given fragment and others lie to the right of a given fragment - How can we find a consistent ordering of the fragments from left to right?

_Solution_: Create directed graph. Each fragment assigned a unique vertex. Insert directed edge _(l, f)_ from any fragment _l_ that is forced to be to the left of _f_ and a directed edge _(f, r)_ to any fragment _r_ forced to be to the right of _f_.

### Stop and Think: Bucketing Rectangles

_Problem_: Given an arbitrary set of rectangles on a plane, how can you distribute them into a minimum number of buckets such that no subset of rectangles in any given bucket intersects another?

_Solution_: Graph. Each vertex is a rectangle- edge if rectangles intersect. Each bucket is an independent set of rectangles so no overlap between any two.

### Stop and Think: Names in Collision

_Problem_: How can you meaningfully shorten filenames so they don't collide?

_Solution_: Bipartite graph with vertices corresponding to original file names and a collection of appropriate shortenings for each name. Add edge between original and shortened name. Look for a set of _n_ edges that have no vertices in common

### Stop and Think: Separate the Text

_Problem_: How do we do line segmentation?

_Solution_: Treat each pixel in the image as a vertex in the graph with edge between neighboring pixels. Weight of edges should be proportioned to how dark the pixels are. Seek a relatively straight path that avoids as much blackness as possible.

### Take Home:

Designing novel graph algorithms is very hard, so don't do it. Instead, try to design graphs that enable you to use classical algorithms to model your problem.
