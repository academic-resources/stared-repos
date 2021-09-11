# Activity Selection Problem

The problem of scheduling sveral competing activities that require exclusive use of a common resource, with a goal of selecting a maximum-size set of mutually compatible activities.

Suppose we have a set `S = {a1, a2, ..., an}` of `n` proposed __activities__ that wish to use a resource. Each activity `ai` has a __start time__ `si` and a __finish time__ `fi`, where `0 <= si < fi < infinity`. If selected, activity `ai` takes place during hald-open time interval `[si, fi)`. Activities `ai` and `aj` are __compatible__ if th eintervals `[si, fi)` and `[sj, fj)` do not overlap. That is, if `si >= fj` or `sj >= fi`.

We assume that the activities are sorted in monotonically increasing order of finishing time:

```
f1 <= f2 <= ... <= fn
```

## Greedy Approach

We start by thinking about a dynamic-programming solution, in which we consider several choices when determining which subproblems to use in an optimal solution.

We shall then observe that we need to consider only one choice (the greedy choice) and then when we make the greedy choice, only one subproblem remains.

We shall complete the process of developing a greedy solution by converting the recursive algorithm to an interative one.

### Optimal substructrure of the activity-selection problem

Let's denote `Sij` the set of activities that start after activity `ai` finishes and finish before activity `aj` starts.

Suppose that we wish to find a maximum set of mutually compatibile activities in `Sij`, and suppose further than such a maximum set is `Aij`, which includes some activity `ak`. By including `ak` in an optimal solution, we are left with two subproblems:

* Finding mutually compatible activities in set `Sik`.
* Finding mutually compatible activities in set `Skj`.

Let `Aik = Aij ^ Sik` and `Akj = Aij ^ Skj`, so that `Aik` contains activities in `Aij` that finish before `ak` starts and `Akj` contains activities in `Aij` that start after `ak` finishes.

Thus, we have `Aij = Aik U {ak} U Akj`, and so the maximum-size set `Aij` of mutually compatible activities in `Sij` consists of `|Aij| = |Aik| + |Akj| + 1` activities.

We can show that the optimal solution `Aij` must also include optimal solutions to the two subproblems for `Sik` and `Skj`. If we could find a set `Bkj` of mutually compatible activities in `Skj` where `|Bkj| > |Akj|`, then we could use `Bkj` rather than `Akj`, in a solution to the subproblem for `Sij`. We would have constructed a set of `|Aik| + |Bkj| + 1 > |Aik| + |Akj| + 1 = |Aij|` mutually compatible activities, which contradicts the assumption that `Aij` is an optimal solution. A symmetric argument applies to the activities in `Sik`.

This way of characterizing optimal substructure suggests that we might solve the activity-selection problem by dynammicp rogramming. If we denote the size of an optimal solution for the set `Sij` by `c[i,j]`, then we would have the following recurrence.

```
c[i,j] = c[i,k] + c[k,j] + 1
```

If we did not know that optimal solution for the set `Sij` includes activity `ak`, we would have to examine all activities in `Sij` to find which one to choose.

```
c[i,j] = if Sij == empty => 0
c[i,j] = if Sij != empty => mak ak in Sij { c[i,k] + c[k,j] + 1 }
```

We could then develop a recursive algorithm and memoize it, or we could work bottom-up and fill in table entries as we go along. But we would be overlooking another important characteristic of the activity-seleciton problem what we can use to great advantage.

### Making the greedy choice

What if we could choose an activity to add to our optimal solution without having to first solve all the subproblems? The greedy choice.

Intuition suggests that we should choose an activity that leaves the resource available for as many other activities as possible. Now, of the activities we end up choosing, one of them must be the first one to finish. Therefore, choose activity in `S` with the earliest finish time (if more than one has it, then any such activity). In other words, since the activities are stored in monotonically increasing order by finish time, the greedy choice is activity `a1`.

> Choosing the first activity to finish is not the only way to think of making a greedy choice for this problem.

If we make the greedy choice, we haveo nly one remaining subproblem to solve, finding activities that start after `a1` finishes.

Why don't we have to consider activities that finish before `a1` starts? We have that `s1 < f1` and `f1` is the earliest finish time of any activity, and therefore no activity can have a finish time less than or equal to s1. Thus, all activities that are compatible with activity `a1` must start after `a1` finishes.

Let `Sk = { ai in S : si > fk}` be the set of activities that start after activity `ak` finishes. If we make the greedy choice of activity `a1`, then `S1` remains as the only one subproblem to solve. Optimal substructure tells us that if `a1` is in the optimal solution, then an optimal solution to the original problem consists of activity `a1` and all the activities in an optimal solution to the subproblem `S1`.

### Proving intuition correct

__Theorem__: consider any nonempty subproblem `SK`, and let `am` be an activity in `Sk` with the earliest finish time. Then `am` is included in some maximum-size subset of mutually compatible activities of `Sk`.

__Proof__: Let `Ak` be a maximum-size subset of mutually compatible activities in `Sk`, and let `aj` be an activity in `Ak` with the earliest finish time. If `aj = am`, we are done, since we have shown that `am` is in some maximum-size subset of mutually compatible activities of `Sk`.

If `aj != am`, let the set `A'k = Ak - {aj} U {am}` be `Ak` but substituting `am` for `ak`. The activities in `A'k` are disjoint, which follos because the activities in `Ak` are disjoint, `aj` is the first activity in `Ak` to finish, and `fm <= fj`. Since `|A'j| = |Ak|` we conclude that `A'k` is a maximum-size subset of mutually compatible activities of `Sk`, and it includes `am`.

### Top-down design

Al algorithm to solve the activity-selection problem does not need to work bottom-up, like a table-based dynamic programming algorithm. Instead, it can work top-down, choosing an activity to put into the optimal solution and then solving the subproblem of choosing activities from those that are compatible with those already chosen.

> Greedy algorithms typically have this top-down design: make a choice and then solve a subproblem, rather than the bottom-up technique of solving subproblems before making a choice.

### Recursive greedy algorithm

The procedure `RECURSIVE_ACTIVITY_SELECTOR` takes start and finish times of activities, represented as arrays `s` and `f`, the index `k` that defines the subproblem `Sk` it is to solve, and the size `n` of the original problem. It returns a maximum-size set of mutually compatible activities in `Sk`. We assume that the `n` input activities are already ordered by monotonically increasing finish time.

In order to start, we add the ficticious activity `0` with `f0 = 0`, so that subproblem `S0` is the entire set of activities `S`. The initial call, which solves the entire problem, is `RECURSIVE_ACTIVITY_SELECTOR(s, f, 0, n)`.

```
RESURSIVE_ACTIVITY_SELECTOR(s, f, k, n)
  m = k + 1
  // find the first activity in Sk to finish (assumming orded by monotically increasing finish time)
  while m <= n and s[m] < f[k]:
    m = m + 1
  if m <= n:
    return { am } U RECURSIVE_ACTIVITY_SELECTOR(s, f, m, n)
  else return { }
```

The `while` loop looks for the first activity in `Sk` to finish, so that `am` is compatible with `ak`: such an activity has `sm >= fk`. If the loop terminates is because it finds such an activity. Alternatively, the loop may terminate because `m > n`, in which case, we havec examined all activities in `Sk` without finding one that is compatible with `ak`.

### Iterative greedy algorithm

We can easily convert our recursive procedure to an iterative one, maintaining the same assumptions.

```
GREEDY_ACTIVITY_SELECTOR(s, f)
  n = s.length
  A = { a1 }
  k = 1
  for m = 2 to n
    if s[m] >= f[k]
      A = A U { am }
      k = m
  return A
```
