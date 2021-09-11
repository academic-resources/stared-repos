# algorithms.js

[![Build Status](https://travis-ci.org/felipernb/algorithms.js.png?branch=master)](https://travis-ci.org/felipernb/algorithms.js)
[![Coverage Status](https://coveralls.io/repos/felipernb/algorithms.js/badge.png?branch=master)](https://coveralls.io/r/felipernb/algorithms.js?branch=master)

![](http://www.quickmeme.com/img/8d/8d30a19413145512ad5a05c46ec0da545df5ed79e113fcf076dc03c7514eb631.jpg)


## Atwood's Law applied to CS101.

Classic algorithms and data structures implemented in JavaScript, you know... FOR SCIENCE.

### Installing
```
npm install --save algorithms
```

### Contents

#### Data Structures

```javascript
require('algorithms/data_structure');
// or
require('algorithms').DataStructure;
```

* BST
* Graph
* HashTable
* Heap
 * MinHeap
 * MaxHeap
* LinkedList
* PriorityQueue
* Queue
* Stack
* Set (HashSet)
* DisjointSetForest

#### Graph algorithms

```javascript
require('algorithms/graph');
// or
require('algorithms').Graph;
```

* topologicalSort
* eulerPath
* depthFirstSearch
* breadthFirstSearch

##### Shortest path
* bfsShortestPath
* dijkstra
* SPFA (Shortest Path Faster Algorithm)
* bellmanFord
* floydWarshall

##### Minimum spanning tree
* prim
* kruskal

#### Math algorithms

```javascript
require('algorithms/math');
// or
require('algorithms').Math;
```

* fibonacci
* fisherYates
* gcd (Greatest common divisor)
* extendedEuclidean
* newtonSqrt
* reservoirSampling
* fastPower
* nextPermutation
* powerSet
* shannonEntropy

#### Search algorithms

```javascript
require('algorithms/search');
// or
require('algorithms').Search;
```

* bfs (breadth-first search for binary trees)
* binarySearch
* dfs (depth-first search for binary trees)
 * inOrder (default)
 * preOrder
 * postOrder

#### Sorting algorithms

```javascript
require('algorithms/sorting');
// or
require('algorithms').Sorting;
```

* bubbleSort
* countingSort
* heapSort
* quicksort
* selectionSort
* radixSort
* insertionSort
* shellSort

#### String algorithms

```javascript
require('algorithms/string');
// or
require('algorithms').String;
```

* levenshtein
* rabinKarp
* knuthMorrisPratt
* huffman
 * encode
 * decode
* hamming
* longestCommonSubsequence
* longestCommonSubstring


