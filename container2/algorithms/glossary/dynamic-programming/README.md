# Dynamic Programming

* Overview
* Design Process
  * Approach 1: Top-Down with Memoization
  * Approach 2: Bottom-Up
* Well-Known Problems

---

## Overview

Divide-and-conquer algorithms partition the problem into disjoint subproblems, solve the subproblems recursively, and then combine their solutions to solve the original problem. In contrast, __dynamic programming__ applies when the __subproblems overlap__. It saves subproblems' answers in a table, thereby avoiding the work of recomputing the answer. Dynamic programming thus __uses additional memory to save computation time__. The savings may be dramatic, an exponential-time solution may be transformed into a polynomial-time solution.

A dynamic-programming approach runs in polynomial time when the number of _distinct_ subproblems involved is polynomial in the input size and we can solve each such subproblem in polynomial time.

Dynamic Programming typically applies to optimization problems in which we make a set of choices in order to arrive at an optimal solution. As we make each choice, subproblems of the same form often arise.

## Design Process

When developing a dynamic-programming algorithm, we follow a sequence of four steps:

1. Characterize the structure of an optimal solution.

2. Recursively define the value of an optimal solution.

3. Compute the value of an optimal solution, typically in a bottom-up fashion.

4. Construct an optimal solution from computed information.

We usually have two equivalent ways to implement a dynamic-programming approach. These two approaches yield algorithms with the same asymptotic running time, except in unusual circumstances where the top-down approach does not actually recurse to examine all possible subproblems. The bottom-up approach often has much better constant factors, since it has less overhead for procedure calls.

### Approach 1: Top-Down with Memoization

In this approach, we write the procedure recusively in a natural manner, but modified to save the result of each subproblem. The procedure now first checks to see whether it has previously solved this subproblem. If so, it returns the value, saving further computation at this level.

### Approach 2: Bottom-Up

This approach typically depends on some natural notion of the "size" of a subproblem, such that solving any particular subproblem depends only on solving "smaller" subproblems. We sort the subproblems by size and solve them in size order, smallest first, thus following a natural ordering of the subproblems (0..n).

When solving a particular subproblem, we have already solved all of the smaller subproblems its solution depends upon, and we have saved their solution. We solve each subproblem only once, and when we first see it, we have already solved all of its prerequisite subproblems.

## Well-Known Problems

* 0-1 Knapsack Problem
