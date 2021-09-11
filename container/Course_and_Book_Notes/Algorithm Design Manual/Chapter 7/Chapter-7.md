## Chapter 7: Combinatorial Search and Heuristic Methods

### Backtracking

Backtracking is a systematic way to iterate through all possible configurations of a search space. The configuration may represent all possible arrangements of objects (permutations) or all possible ways of building a collection of them (subsets).

Backtracking creates a tree of partial solutions where each vertex represents one partial solution. An edge exists from _x_ to _y_ if node _y_ was created by advancing from _x_. The process of constructing solutions corresponds to doing depth-first traversal of the backtrack tree.

Backtrack-DFS(A, k)

&nbsp;&nbsp;&nbsp;&nbsp;if A = (a<sub>1</sub>, a<sub>2</sub>, ...a<sub>k</sub>) is a solution, report it<br/>
&nbsp;&nbsp;&nbsp;&nbsp;else<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;k = k + 1<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;compute S<sub>k</sub><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;while S<sub>k</sub> does not equal 0 do<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a<sub>k</sub> = an element in S<sub>k</sub><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;S<sub>k</sub> = S<sub>k</sub> - a<sub>k</sub><br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Backtrack-DFS(A, k)

Breadth-first would also work, but takes up more space. Current state of search represented by path from root to current search depth-first node. Requires space proportional to height of tree. In breadth-first search, the queue stores all nodes at the current level, proportional to the width of the tree.

```
bool finished = False; /* found solution yet? */
backtrack(int a[], int k, data input) {
    int c[MAXCANDIDATES]; /* candidates for next position */
    int ncandidates; /* next position candidate count */
    int i; /* counter */
    if (is_a_solution(a, k, input))
        process_solution(a, k, input);
    else {
        k = k + 1;
        construct_candidates(a, k, input, c, ncandidates);
        for (i = 0; i <= ncandidates; i++) {
            a[k] = c[i];
            make_move(a, k, input);
            backtrack(a, k, input);
            unmake_move(a, k, input);
            if (finished) return; /* terminate early */
        }
    }
}
```

Backtracking ensures correctness by enumerating all possibilities and efficiency by never visiting a state more than once.

Because each candidate array _c_ is allocated with each recursive procedure call, subsets of not-yet-considered extension candidates at each position will not interfere with each other.

The application-specific parts of the algorithm consist of five subroutines:

- _is_a_solution(a, k, input)_ - Boolean function to test whether the first _k_ elements of vector _a_ form a complete solution for the problem. The last argument, _input_, allows the passing of infomration into the routine such as the size of the target solution

- _construct_candidates(a, k, input, c, ncandidates)_ - The routine fills an array _c_ with the complete set of possible candidates for the _kth_ position of _a_, given the contents of the first _k - 1_ positions. The number of candidates returned is denoted by _ncandidates_. _input_ can be used to pass additional information to the function.

- _process_solution(a, k, input)_ - Prints, counts, or otherwise processes the complete solution once created.

- _make_move(a, k, input_ and _unmake_move(a, k, input)_ - Allows us to modify data structure based on moves and clean up if we decide to undo moves.

The global finished flag allows for early termination

### Constructing all Subsets

```
is_a_solution(int a[], int k, int n) {
    return (k == n); /* is k == n? */
}
```

```
construct_canddidates(int a[], int k, int n, int c[], int *ncandidates) {
    c[0] = True;
    c[1] = False;
    *ncandidates = 2;
}
```

```
process_candidates(int a[], int k) {
    int i; /* counter */
    printf("{");
    for (i = 1; i <= k; i++)
        if (a[i] == True) printf(" %d", i);
    printf(" }\n");
}
```

```
generate_subsets(int n) {
    int a[NMAX]; /* solution vector */
    backtrack(a, 0, n);
}
```

There are 2<sup>2</sup> subsets.

### Constructing all Permutations

Counting permutations is a necessary prerequisite to generating them.

```
construct_candidates(int a[], int k, int n, int c[], int *ncandidates) {
    int i; /* counter */
    bool in_perm[NMAX]; /* what's in the permutation */
    for (i = 1; i < NMAX; i++) in_perm[i] = False;
    for (i = 0; i < k; i++) in_perm[ a[i] ] = True;

    *ncandidates = 0;
    for (i = 1; i <= n; i++)
        if (in_perm[i] == False) {
            c[ *ncandidates] = i;
            *ncandidates = *ncandidates + 1;
        }
}
```

Testing if _i_ is a candidate for the _kth_ slot in the permutation can be done by iterating through all _k - 1_ elements and verifying none matched, but setting up a bit-vector data structure allows us to perform the legality check in O(1) time.

Completing the job requires specifying _process_solution_ and _is_a_solution_ and setting the appropriate arguments to backtrack. Essentially the same as with subsets:

```
process_solution(int a[], int k) {
    int i; /* counter */
    for (i = 1; i <= k; i++) printf(" %d", a[i]);
    printf("\n");
}
```

```
is_a_solution(int a[], int k, int n) {
    return k == n;
}
```

```
generate_permutations(int n) {
    int a[NMAX]; /* solution vector */
    backtrack(a, 0, n);
}
```

### Constructing All Paths in a Graph

Starting point of any path from _s_ to _t_ always starts with _s_ so _s_ is the only candidate for the first position and _S<sub>1</sub> = {s}_. Possible candidates for second position are vertices _v_ such that _{s, v}_ is an edge of the graph. In general, _S<sub>k</sub>_ consists of the set of vertices adjacent to _a<sub>k</sub>_ that have not been used elsewhere in the partial solution _A_.

```
construct_candidates(int a[], int k, int n, int c[], int *ncandidates) {
    int i; /* counter */
    bool in_sol[NMAX]; /* what's already in the solution */
    edgenode *p; /* temporary pointer */
    int last; /* last vertex on current path */
    for (i = 1; i < NMAX; i++) in_sol[i] = Fa;se;
    for (i = 1; i < k; i++) in_sol[a[i]] = True;
    if (k == 1) {
        c[0] = 1; /* always start from vertex 1 */
        *ncandidates = 1;
    }
    else {
        *ncandidates = 0;
        last = a[k-1];
        p = g.edges[last];
        while (p != NULL) {
            if (!in_sol[p->y]) {
                c[*ncandidates] = p->y;
                *ncandidates = *ncandidates + 1;
            }
            p = p->next;
        }
    }
}
```

```
is_a_solution(int a[], int k, int t) {
    return a[k] == t;
}
```

```
process_solution(int a[], int k) {
    solution_count++; /* count all s to t paths */
}
```

### Search Pruning

_Pruning_: A technique of cutting of search the instant it is established that a partial solution could not be extended to a full solution.

### Take Home Lesson

Combinatorial searches, when augmented with tree pruning techniques, can be used to find the optimal solution of small optimization problems. How small depends on the problem, but typical size limits are somewhere between 15 ≤ n ≤ 50 items.

### Sudoku

Backtracking lends itself to solving a Sudoku puzzle

```
#define DIMENSION 9; /* 9 x 9 board */
#define NCELLS DIMENSION * DIMENSION /* 81 cells */

typedef struct {
    int x, y; /* x and y coordinates of point */
} point;

typedef struct {
    int m[DIMENSION+1][DIMENSION+1]; /* matrix of board contents */
    int freecount; /* how many open squares left */
    point move[NCELLS+1]; /* how did we fill spaces? */
} boardtype;
```

Constructing the options for the next solution position requires picking the open square to fill next (next_square) and identifying which numbers are options to fill the square (possible_values)

```
construct_candidates(int a[], int k, boardtype *board, int c[], int *ncandidates) {
    int x, y; /* position of next move */
    int i; /* counter */
    bool possible[DIMENSION+1]; /* possible for square */
    next_square(&x, &y, board); /* which square to fill next */

    board->move[k].x = x; /* store choice for next position */
    board->move[k].y = y;
    *ncandidates = 0;

    if((x < 0) && (y <0)) return; /* error condition - no moves possible */

    possible_values(x, y, board, possible);
    for (i = 0; i <= DIMENSION; i++)
        if (possible[i] == True) {
            c[*ncandidates] = i;
            *ncandidates = *ncandidates + 1;
        }
}
```

```
make_move(int a[], int k, boardtype *board) {
    fill_board(board->move[k].x, board->move[k].y, a[k], board);
}
```

```
unmake_move(int a[], int k, boardtype *board) {
    free_space(board->move[k].x, board->move[k].y, board);
}
```

```
is_a_solution(int a[], int k, boardtype *board) {
    if (board->freecount == 0)
        return True
    else
        return False
}
```

Turn off search once solution found.

```
process_solution(int a[], int k, boardtype *board) {
    print_board(board);
    finished = True;
}
```

Two reasonable approaches to selectingt the next square:

- _Arbitrary selection_: Pick the first open square

- _Most constrained selection_: Pick square with the fewest possible options

Two possibilities for possible_values:

- _Local count_: Allows all numbers 1-9 not already used in column, row, or sector

- _Look ahead_: Testing to see if another open square has no options under local count criteria, allowing us to backtrack sooner

| Printing Condition |                 |           | Puzzle Complexity |                |
| ------------------ | --------------- | --------- | ----------------- | -------------- |
| next_square        | possible_values | Easy      | Medium            | Hard           |
| arbitrary          | local count     | 1,904,832 | 863,305           | never finishes |
| arbitrary          | look ahead      | 127       | 142               | 12,507,212     |
| most contrained    | local count     | 48        | 84                | 1,243,838      |
| most constrained   | look ahead      | 48        | 65                | 10,374         |

Easy board: Easy for humans
Medium board: Stumbed finalists of World Sudoku Championship in March 2006
Hard: Contains only 17 fixed numbers - fewest specified known number of positions with only one complete solution (seen below)

|     |     |     |     |     |     |     | 1   | 2   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|     |     |     |     | 3   | 5   |     |     |     |
|     |     |     | 6   |     |     |     | 7   |     |
| 7   |     |     |     |     |     | 3   |     |     |
|     |     |     | 4   |     |     | 8   |     |     |
| 1   |     |     |     |     |     |     |     |     |
|     |     |     | 1   | 2   |     |     |     |     |
|     | 8   |     |     |     |     |     | 4   |     |
|     | 5   |     |     |     |     | 6   |     |     |

### Take Home:

Clever pruning can make short work of surprisingly hard combinatorial search problems. Proper pruning will have a greater impact on search than any other factor.

### Heuristic Search Methods

Common components to heuristics discussed:

- _Solution space representation_ - Complete, concise descriptions of set of possible solutions for the problem
- _Cost function_ - Search methods need a function to access quality of each element of the solution space.

Search heuristic identifies element with the best possible score - highest or lowest depending on problem.

### Random Sampling:

Simplest method to search in a solution space uses random sampling. Repeatedly construct random solutions and evaluate them, stopping when you have a good enough solution or are tired of waiting. True random sampling means being able to select elements from the solution space uniformly at random - each of the elements of the solution space must have an equal probability of being the next candidate selected.

```
random_sampling(tsp_instance *t, int nsamples, tsp_solution *bestsol) {
    top_solution s; /* current top solution */
    double best_cost; /* best cost so far */
    double cost_now; /* current cost */
    int i; /* counter */

    initialize_solution(t->n, &s);
    best_cost = solution_cost(&s, t);
    copy_solution(&s, bestsol);

    for (i = 1; i <= nsamples; i++) {
        random_solution(&s);
        cost_now = solution_cost(&s, t);
        if (cost_now < best_cost) {
            best_cost = cost_now;
            copy_solution(&s, bestsol);
        }
    }
}
```

Random sampling does well when:

- There are a high proportion of acceptable solutions
- When there is no coherence in the solution space

### Stop and Think: Picking the Pair

_Problem_: Propose an efficient algorithm to generate elements from the (<sup>n</sup><sub>2</sub>) _imagine the n is directly over the 2_ unordered pairs of {1,...n} uniformly at random

_Solution_:

```
do {
    i = random_int(1, n);
    j = random_int(1, n);
    if (i > j) swap(&i, &j);
} while (i === j);
```

### Local Search

A local search heuristic starts from an arbitrary element of the solution space and scans the neighborhood looking for a favorable transition to take. Hill-climbing and closely related heuristics such as greedy search and gradient descent search are great at finding local options quickly but often fail to find the globally best solution.

```
hill_climbing(tsp_instance *t, tsp_solution *s) {
    double cost; /* best cost so far */
    double delta; /* swap cost */
    int i, j; /* counters */
    bool stuck; /* did I get a better solution? */
    double transition();

    initialize_solution(t->n, s);
    random_solution(s);
    cost = solution_cost(s, t);

    do {
        stuck = True;
        for (i = 1; i < t->n; i++)
            for (j = i + 1; j < t->n; j++) {
                delta = transition(s, t, i, j);
                if (delta < 0) {
                    stuck = False;
                    cost = cost + delta;
                } else transition(s, t, i, j);
            }
    } while (!stuck);
}
```

When does local search do well?

- When there is great coherence in the search space
- When cost of incremental evaluation is much cheaper than global solution

### Simulated Annealing

### Take Home:

Simulated annealing is effective because it spends more time working on good elements of the solution space than on bad ones and because it avoids getting trapped repeatedly in the same local optima.

```
anneal(tsp_instance *t, tsp_solution *s) {
    int i1, i2; /* pair of items to swap */
    int i, j; /* counters */
    double temperature; /* current system temp */
    double current_value; /* value of current state */
    double start_value; /* value of start of loop */
    double delta; /* value after swap */
    double merit, flip; /* hold swap accept conditions */
    double exponent; /* exponent for energy function */

    temperature = INITIAL_TEMPERATURE;
    initialize_solution(t->n, s);
    current_value = solution_cost(s, t);
    for(i = 1; i <= COOLING_STEPS; i++) {
        temperature = COOLING_FRACTION;
        start_value = current_value;
        for (j = 1; j <= STEPS_PER_TEMP; j++) {
            /* pick indices of elements to swap */
            i1 = random_int(1, t->n);
            i2 = random_int(1, t->n);
            flip = random_float(0,1);
            delta = transition(s, t, i1, i2);
            exponent = (-delta/current_value)/(k * temperature);
            merit = pow(E, exponent);
            if (delta < 0) /* ACCEPT-WIN */
                current_value = current_value + delta;
            else { if (merit > flip) /* ACCEPT-LOSS */
                current_value = current_value + delta;
            else
                transition(s, t, i2, i1);
            }
        }
    /* restore temperature if progress has been made */
    if ((current_value - start_value) < 0.0)
        temperature = temperature/COOLING_FRACTION;
    }
}
```

### Take Home

Simulated annealing is a simple but effective technique for efficiently obtaining a good but not optimal solution to combinatorial search problems.
