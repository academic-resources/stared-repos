### What is a graph?

A series of nodes (vertices/vertexes/verts), usually labeled, and connected.

The nodes can have 1 or more neighbors
Nodes can be isolated and not connected to other nodes

Can be directional, can be bi-directional

Arrows mean one-way (though you can have a connection one direction and one connection the other)

Connections can be weighted (have values)

Graphs can represent paths, markov chains, networks, epidemiology

Google directions has some version of nodes and weighted nodes

Looking at a city, there are intersections in the city

Some of the streets are one-way and others are two-way

### Cyclic graphs:

Any time you have the ability to form a cycle where you revisit the same node.

Meaning of weight is dependent on the type of graph

### Acyclyic graphs:

No revisiting of nodes

### Classes:

Class for Node:
Parents
Edges
Values
Children
Max edges
.... all kinds of program specific stuff
Edge:
Weights
What we're connected to
Directions

Graph

Triad
Good
Fast
Cheap

### Two schools of thought to keep track of edges:

1.  Have each node store a list of what it is connected to:

```
Edge Class
    ... var connection
    ... var weight
    A -> B
    B -> C
    C -> B, D
    D -> Null
```

2.

```
Matrix:
    .. A, B, C, D
    A 0, 1, 0, 0
    B 0, 0, 1, 0
    C 0, 1, 0, 1
    D 0, 0, 0, 0
```

https://bokeh.pydata.org/en/latest/

https://bokeh.pydata.org/en/latest/docs/user_guide/graph.html
