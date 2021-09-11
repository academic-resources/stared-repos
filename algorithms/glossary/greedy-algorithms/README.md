# Greedy Algorithms

* Overview
* Design Process
  * Greedy-choice Property
  * Optimal Substructure
  * Greedy vs Dynamic Programming
* Well-Known Problems

## Overview

A __greedy algorithm__ always makes the choice that looks best at the moment. That is, **it obtains an optimal solution to a problem by amking a sequence of locally optimal choices**. This **heuristic strategy** does not always produce an optimal solution.

Greedy algorithms do not always yield optimal solutions, but for many problems they do.

Greedy algorithms **typically have a top-down design**; make a choice and then solve a subproblem, rather than the bottom-up technique of solving subproblems before making a choice.

> For many optimization problems, using dynamic programming to determine the best choices is overkill, simpler, more efficient algorithms will do.

## Design Process

1. Determine the optimal substructure of the problem.

2. Develop a recursive solution.

3. Show that if we make the greedy choice, then only one subproblem remains.

4. Prove that is always to safe to make the greedy choice. (Steps 3 and 4 can occur in either order.)

5. Develop a recursive algorithm that implements the greedy strategy.

6. Convert the recursive algorithm to an iterative algorithm.

More generally, we design greedy algorithms acccording to the following sequence of steps:

1. Cast the optimization problem as one in which we make a choice and are left with one subproblem to solve.
2. Prove that there is always an optimal solution to the original problem that amkes the greedy choice, so that the greedy choice is always safe.
3. Demonstrate optimal substructure by showing that, having made the greedy choice, what remains is a subproblem with the property that if we combine an optimal solution to the subproblem with the greedy choice we have made, we arrive at an optimal solution to the original problem.

> To demonstrate that a greedy algorithm will solve a particular optimization problem, the **greedy-choice property** and **optimal substrcture** are the two key ingredients.

### Greedy-choice Property

We can assemble a global optimal solution by making locally optimal (greedy) choices. We make the choice that looks best in the current problem, without considering results from subproblems. After we make whatever choice seems best at the moment, we then solve the subproblem that remains.

> In dynamic programming, we make a choice at each step, but the choice usually depends on the solution to subproblems. Consequently, we typically solve dynamic-programming problems in a bottom-up manner, progressing from smaller subproblems to larger subproblems (alternatively top down but memoizing, but even though the code works top down, we still must solve the subproblems before making a choice.).

### Optimal Substructure

A problem exhibits *optimal substructure* if an optimal solution to the problem contains within it optimal solutions to subproblems. 

> This property is a key ingredient of assessing the applicability of dynamic programming as well as greedy algorithms.

This scheme implicitly uses induction on the subproblems to prove that making the greedy choice at every step produces an optimal solution.

### Greedy vs Dynamic PRogramming

> Unlike *dynamic programming*, which solves the subproblems before making the first choice, a *greedy algorithm* makes its first choice before solving any subproblems.

* Dynamic algorithms usually proceed bottom up, whereas a greedy strategy usually progresses in a top-down fashion, making one greedy choice after another, reducing each given problem instance into a smaller one.

## Well-Known Problems

* Activity Selection
* Fractional Knapsack Problem
* Huffman Codes
