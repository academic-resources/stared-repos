## Algorithms:

Something that gives you a recipe step by step to solve some type of problem.

## Connection between Algorithms and Data Structures:

Algorithsm have data structures underneath them to make them go.

## Big O is a measure of runtime efficiency

### O(1): Constant time

"Free"

### O(log n): Logarithmic

Tree is an example
A tree has many more nodes than it has layers
log does not grow very fast

### O(n): Linear

Linked list is an example
Scalable and often as good as it can get for any problem that requires you to look at every input once

### O (n log n): Log linear/linearithmic

Log term \* log term
Not much worse than linear

### O(n^2) Quadratic:

Nested for loops is an example

An efficient algorithm can be the difference between something that runs and completes versus something that explodes and couldn't run even if you had a computer the size of the universe.

## One good algorithmic tool in toolkit:

### Greedy algorithm:

- Each step of the algorithm does one simple thing satisfying a greedy heuristic
- Looks at options immediately available to it and picks one
- Iterates, adding the next piece of data and does that until it goes through all the data
- If it's correct, it gets the right answer to the question
- If you're lucky, it can be efficient or optimal
- Idea of greedy algorithm/heuristic related to brute force and naive

#### Example:

Prim's algorithm https://visualgo.net/en/mst?slide=1

- Finds minimum spanning tree for a weighted undirected graph
- Graph is a collection of vertices and edges between them
- Weighted, edges have some number that means their cost
- Undirected because edges are the same
- Minimum spanning tree - collection of edges that connect all the vertices at minimum total cost if you add up the numbers associated with all the edges
- Start by choosing vertex arbitrarily
- Output needs to connect all the vertices so you can start anywhere
- Add edges that we can consider next
- Priority queue
- Logarithmic in operation
- Data structure efficient at finding the minimum
- Natural for Prim's
- Add edges to the priority queue
- As long as priority queue is not empty, find cheapest edge in the priority queue
- Add vertex that that edge connects you to if not already connected
- Add all edges you can now reach as a result of that vertex
- Repeat
- Check every edge

### Divide and conquer:

- Each step of the algorithm either solves a small piece (base case) or puts together two small solutions into a larger solution.
- (log n) situation

- For sorting algorithms, log linear is common (best you can do with comparison-based sorts)
- What is a base case of sorting? Single item.
- How can we efficiently combine base cases? If you have two lists you know are sorted, you can interate linearly comparing the first element and whatever's smaller is the first element of the combined list, repeat

#### Merge sort:

https://visualgo.net/bn/sorting?slide=10

#### Quicksort:

Natural evolution of merge sort
Fast sort that is often used in places where performance matters
In-place sorting
Not a stable sort
Pivot
If you're deterministic in how you pick which of your elements to pivot around, for some inputs you'll be quaddratic
Randomized quicksort
Picks pivot randomly

#### Bubblesort

Quaddratic
Fun to learn, joke to use

There are some situations where being random is best
Quicksort is a case where random is cheap, easy, and efficient

### Dynamic Programming:

- Optimization technique
- Remember things cleverly (memoization)
- Divide into subproblems but subproblems depend on each other and can be used to solve one another
- Because you're saving data, you have a space-performance tradeoff
- Often a good trade to make, but there are some situations where that can limit what you can do with dynamic programming

#### Counter example of dynamic programming

```
const fib = (n) => {
    if (n === 0) {
        return 0;
    }
    else if (n === 1) {
        return 1;
    }
    else {
        return fib(n - 1) + fib(n - 2);
    }
}
```

Not dynamic yet:

```
const fib = (n) => {
    let fibs = [0, 1];
    for (let i = 2; i <= n; i++) {
        fibbs.push(fibbs[i - 1]) + fibbs[i-2]
    }
}
```

With memoization:

```
let fibbs = [0, 1];
const fib = (n) => {
    if (n in fibbs) {
        return fibbs[n];
    }
    else {
    let res = fib(n - 1) + fib(n - 2);
    fibbs.push(res);
        return res;
    }
}
```

Still recursive, but not redundant

### How to think algorithmically:

No silver bullet, objectively good answer

#### Step 1:

Make sure you know and clearly define what the input and output is
Ask what data structure is natural for that input/output

#### Step 2:

Sketch in pseudocode
Not programming langauge
Describe with the same sort of keywords and structures you'd use in a programming language what you'd do to solve the problem

#### Step 3:

Code up actual working prototypes

#### Step 4:

Test data to test correctness
If algorithm isn't correct, probably don't want to use it

#### Exception:

Approximation algorithms
Traveling salesman
NP-hard/NP-complete
Algorithm don't give a solution that's fully correct but close enough with some confidence
Don't need to worry about directly, but should know it exists
Small test cases
One bigger test case

#### Step 5:

Pick any solution that you can put together to show that the problem is solvable
Often first workable solution will be greedy

What if you can think of the problem as bags of smaller indepdent problems similar to each other?
Might want to try recursing and see if divide and conquer approach works
Think about an efficient way to combine the solutions but problems themselves are independent and can be solved on their own

What if you can think of the problem as a sequence of smaller to large problems and as the problems grow, they're harder but can use the solutions from the previous problems?
Dyanmic programming

Not every problem you face will naturally fit in one of these, but try to keep your eye out and be creative, think about the data structures involved.

Second goal besides correctness is efficiency
Code works, now you want to see if you can make it better
One of the main places to look is anywhere you iterate

"Are there any redundancies?"
Look at nested iteration
"Do I really need to do this? Could I save something from a different part of the algorithm and use it here?"

You will likely be working with high-level programs:
Javascript, Python, etc.
Iteration not always explicit
Higher order functions:
map, reduce
list comprehensions in Python
You might have nested or quaddratic features in your code

### General comment:

It's a little more expensive in high-level languages because they're checking bounds and seeing if things exist

### In C, it's just changing pointers:

Really cheap, really fast, potentially really dangerous
Difference won't matter to you most of the time, but matters for things like math libraries (which is why they're written in C and Fortran)
Might be using the library wrapped in Python code, but the math might be done in C.

### Efficiency:

Not just about for loops
Can also have to do with constants
Big O says to ignore constants
When you initially try to solve the problem, it matters more what class you end up in overall complexity
Once you have a soluiton, might be worth it looking at constants
Never start by optimizing constants
If you're in a situation where you're paying for your compute (working on the cloud) and you can change a constant from 1 to a half, you could cut your compute bill in half

### Overall goal when doing algorithmic problem solving:

Find the input/output
Think about the data structure
Try your tools
Test for correctness
Think about scalability and efficiency

### Closing comments about algorithms in general:

Familiarize yourselves with what data structures are out there (since they are connected)
Set is an unordered collection of unique elements
Constant time to check presence for something in a set
Like keys in a hash table
Almost all good python code uses dicts
Be aware of what structures exist and options and peculiarities in whatever language/system you're working on.

### General terms:

Distributed programming:

- Often uses functional programming: - Higher order functions like map and reduce that take functions and execute them at scale distributed in some fashion and combine the results
  Quantum computing:
- Scott Eranson What Quantum Computing Isn't
- It's exciting, it isn't Star Trek, but it is cool
  Moore's Law:
- Roughly translated: Everything's getting faster exponentially or something
- Really about the chip-making process - things get smaller so you can put more transistors in an area and that means chips often get faster
- Been going on for decades
- Slowing down due to physics - might have to switch to something other than silicon
- Counter to intuition, Moore's Law doesn't mean we don't care about Big O or efficiency, it makes it more important:
- Moore's Law takes us even farther to the right which makes gap between quaddratic and log linear bigger
- With faster computers, we want to solve bigger problems
- Doesn't give us things for free, makes things we do with algorithms more important

### Moral of the story:

- You want to optimize your time first and you want to figure out what works and then refine from there
- Programmer time usually matters more than computer time
- Trying to optimize too much up front might actually mean you don't get anything out the door, ship your product, get money, whatever
- Don't want to prematurely optimize
- Want to avoid exponential
- Start with something that works
- Iterate from there
- Figure out the tradeoff appropriate for your use case

If your code is running on a constrained platform, you might actually even care about constants, fixed size, how much memory it takes

Start with something that works and get more specific as you go

In general with efficiency classes, you'll get a feel for them as you go:

- Quaddratic is tractable, just not cheap to scale
- Log linear and linear are cheap
- Logarithmic is almost free
- Constant is free
