# Algorithms and Sorting!

[Lecture Notes](#Lecture-Notes)  
a. [Additional Resources](#Additional-Resources)  
b. [What is Big O](#What-is-Big-O)  
c. [O(n)](#O(n))  
d. [O(1)](#O(1))  
e. [O(n^2)](#O(n^2))  
f. [Memoization](#Memoization)  
g. [Fibonacci Numbers](#Fibonacci-Numbers)  
h. [Space Complexity](#Space-Complexity)  
i. [O(log n)](#O(log-n))  
j. [Determining Big O](#Determining-Big-O)  
k. [The 3 Main Rules of Big O](#The-3-Main-Rules-of-Big-O)  

<br>
<br>

If you found these notes helpful and want to show appreciation to the author, [coffee donations](buymeacoff.ee/G1stPBuYU) are much loved.  

## Additional Resources

[Computing Big O Notes - Lambda](https://github.com/LambdaSchool/CS-Wiki/wiki/Computing-Big-O)  

These notes are based off of [Beej's previous recording for CS13](https://www.youtube.com/watch?v=btgmegU676g&feature=youtu.be), which condenses the usual 4 hours of lecture down to 3.   

The notes also pull from [this simple overview of Big O Notation](https://justin.abrah.ms/computer-science/big-o-notation-explained.html)  

[Another explanation](https://rob-bell.net/2009/06/a-beginners-guide-to-big-o-notation/) 

[Big O Breakdown of Data Structures and Sorting Algorithms](https://bigocheatsheet.io)  

** Also included in this repo is a copy of Grokking's Algorithms in PDF format. `Big O Notation` begins on page 10.  

<br>
<br>

# Lecture Notes

## What is Big O

Big O Notation is a way to determine how efficient a function is, based on run time and space requirements. It evaluates based on the _worst_ case scenario of the function. 

Big O Notation is a good indicator of how well an algorithm will scale.  

Even if the function might run efficiently in some instances (small item list), it will evaluate based on the worst possible set of inputs. That does not mean an algorithm can't or shouldn't be used in some scenarios - it's just important to consider, especially when building for scale.

Big O is considered the worst case evaluation while Big Theta is finds the average case.

When we discuss Big O, we're evaluating as if on a graph (see BigO Graph.png file in repo folder). It's essentially like graphing the time it takes to run the function with different sized inputs (an array of 1 item, 2 items, 3 items, etc).

The line that is shown on the graph displays the trend of that algorithm's efficiency when handling small to large inputs.

<br>

![Big O Computational Graph](BigOGraph.png "Big O Computational Graph")

<br>
<br>

## O(n)

`O(n)`, called `Order of N` or `O of N`, refers to `linear time`. Linear time means that for every additional item in the function's input, that many operations are computed. 1 input? 1 operation. 10 inputs? 10 operations. The time complexity grows linearly with the number of inputs.

On the graph image, that is depicted by the green line of `n`.

A good example of O(n) would be something like this:

<br>

```
def item_in_list(check_item, the_list):
    for item in the_list:
        if check_item == item:
            return True
    return False
```

<br>

This function receives an item and a list of items. It will pass over each individual item in the list to see if it matches with the given item. Because each item is being compared individually, the run time of this algorithm depends on how many items are in the_list. If it's short, it will be fast. If it's a long list, the run time will be much longer.

<br>
<br>

## O(1)

`O(1)`, called `Order of 1`, refers to `Constant Time`. This means that no matter how large the input is, it will always take the same amount of time to run.

On the graph image, this is depicted by the pink line of `1`.

An example of O(1) is:

<br>

```
def is_none(item):
    return item is None
```

<br>

No matter how many inputs are in `item` that we give this function, the run time will always be the same - the time it takes to return `None`. 

It cannot run faster, but it also cannot run slower. Constant time is considered the best case scenario for a function because it cannot grow despite the complexity of the inputs.


<br>
<br>

## O(n^2)

`O(n^2)`, called `Order of n squared`, indicates that for every input item (n), we have to do that number squared (n^2 or n*n) operations. This is still considered proportional to the size of the input data set, just squared.

As you can imagine, that run time can become very slow, very quickly. If there are only 2 inputs, that would mean 4 operations. But if we have just 8 inputs, that's already 64 operations being computed.

On the graph image, this is depicted by the red line of `n^2`.

A common example of O(n^2) run time is a nested for loop (though that does not _always_ indicate n squared time, so consider each one carefully).

An example might be:

<br>

```
def all_combinations(the_list)
    results = []
    for item in the_list:
        for inner_item in the_list:
            results.append((item, inner_item))
    return results
```

<br>

This function matches each item within the_list with every other item in the_list. Therefore, if the_list = [1,2,3], it would output [(1,1), (1,2), (1,3), (2,1), (2,2), (2,3), (3,1), (3,2), (3,3)] - an output of 9 items, despite only 3 being in the input (n^2).

O(n^2) taps into Combinatorics (the mathematical study of combinations of things and counting) - but not every algorithm does, despite the common conception that most do.

[Learn more about Combinatorics](https://en.wikipedia.org/wiki/Combinatorics)  

Discrete Math is the basis of a lot of Computer Science (if you're looking for further learning). Algebra, geometry and trigonometry are common if you're planning to go into graphics. If you like 3D graphics, Linear Algebra is a good field of additional study too.

<br>
<br>

## Memoization

`Memoization` is an optimization technique that speeds up a program or algorithm by storing the results of previous function calls in a cache, to easily access the result if the same call is made again. (This only works if, given the same input, the output is always the same.)

<br>

A `cache` is a way of storing data that typically takes extensive computing, to speed it up. It's less complete and durable than a database, so it typically only stores a subset of data. Browsers also use caching to load web pages faster, by not having to fetch and render data completely each time you re-visit a webpage. It's a way we also store user preferences.

<br>

Memoization is best used when you notice that your algorithm is making the same calculations repeatedly. A good example is when solving the Fibonacci sequence. By storing previous results, the algorithm becomes much faster (rather than having to compute the same result each time).

Another way we might use memoization is by storing square roots, sin and cosine computations within a table when the function is created, to speed up the runtime (and add to the table when new outputs are run).

<br>

If you realize a function is being called often and the run time is slow, that's a good sign that memoization would help speed it up.

If a database is being frequently queried for one or two types of input, and the table typically stays the same, to speed up the backend, we might opt to save those values and send them more quickly - rather than querying the database every time.

[Further reading](https://codeburst.io/understanding-memoization-in-3-minutes-2e58daf33a19)


<br>
<br>

## Fibonacci Numbers

We can practice solving using dynamic programming techniques with the Fibonacci sequence.

[Learn more](https://en.wikipedia.org/wiki/Fibonacci_number)  

In math, the Fibonacci sequence is numbers in order, where each number is the sum of the two preceding one, starting from 0 and 1.

>F0 = 0  
>F1 = 1  
>F2 = 1 (0 + 1)  
>F3 = 2 (1 + 1)  
>F4 = 3 (2 + 1)  

And so on.

0 and 1 are our base cases.

A basic way of writing it might look like this:

<br>

```
fib(0) = 0
fib(1) = 1
fib(n) = fib(n-1) + fib(n-2)
```

<br>

So let's define the function and call it recursively:

<br>

```
def fib(n):
    if n == 0:
        return 0
    
    if n == 1:
        return 1
    
    return fib(n-1) + fib(n-2)

for i in range(10):
    print(fib(i))
```

<br>

This works and outputs the first 10 Fibonacci number.

Recursive solutions work and can make sense. But if we try to run it for range(30), our terminal will drastically slow down, due to the poor run time of this algorithm.

[Go in depth on Fibonacci](http://www.maths.surrey.ac.uk/hosted-sites/R.Knott/Fibonacci/fibmaths.html)

This is an example of... 

<br>

## O(2^n)

`O(2^n)`, called `Order of 2 to the nth`, is `exponential` time - for each additional input, the operations computed grow exponentially.

On the graph image, this is depicted by the dark orange line of `2^n`.

The standard Fibonacci calculation is a good example of this type of function, though we could optimize it to reduce the run time.

The basic solution could also be called a "naive" solution - it's simple and brute force but doesn't take into account larger inputs or scalability.

<br>

So how can we improve the Fibonacci sequence? 

First, let's consider why our current solution is not ideal. If we want to find fib(8), the function is recursively trying to solve:

<br>

```
fib(8) = fib(7) + fib(6)
fib(7) = fib(6) + fib(5)
fib(6) = fib(5) + fib(4)
fib(4) = fib(3) + fib(2)
```

<br>

We're finding fib(n) multiple times for each higher integer - despite having already calculated it once before.

Instead, we could use a memoization (top down) solution, as well as an iterative (bottom up) solution. Both will improve our run time.

<br>

If we store values that were previously calculated in a table, we can instead just reference that memory in the table for duplicate calls. This uses a cache.

For our memoization (top down) solution, we'll initialize a cache that will store calculated Fibonacci numbers. We'll start with the two base cases of 0 and 1. 

Then in our fib() function, if n is not currently in the cache, we'll calculate it and store it. If it is in there, we'll simply return the existing stored result.

<br>

```
cache = {}

def fib(n):

    if n not in cache:
        cache[n] = fib(n-1) + fib(n-2)

    return cache[n]

cache[0] = 0
cache[1] = 1

for i in range(10):
    print(fib(i))
```

<br>

As the function is run more and more, the cache will contain more and more stored Fibonacci numbers, making it faster to return results because it does not have to re-calculate each number, every time.

If we print the cache after this, it will look like:

<br>

```
{0: 0, 1: 1, 2: 1, 3: 2, 4: 3, 5: 5, 6: 8, 7: 13, 8: 21, 9: 34}
```

<br>

Every Fibonacci number in the range(10) was calculated and stored for future quick access.

This solution has `O(n)` runtime.

Let's now try computing bottom up, or iteratively, for an optimized solution that is not recursive. Usually an algorithm is either recursive _or_ iterative.

We'll start with our base cases and work our way up from that, by setting a base case of 0 and base case of 1. Then within a for loop, that runs to n-1 (because we want to have the range up to n, not including n), we'll re-assign p0 and p1 to the next set of numbers up, to build to the next Fibonacci number.

<br>

```
def fib_iter(n):

    if n == 0:
        return 0

    if n == 1:
        return 1

    p0 = 0
    p1 = 1

    for i in range(n-1):
        next = p0 + p1

        p0 = p1
        p1 = next

    return next

for i in range(10):
    print(f'{i}: {fib_iter(i)}')
```

<br>

This solution builds _up_ from the base cases, to store the outputs as the input increases. Rather than having to re-calculate the same value multiple times when working from the top down, building from the bottom up ensures that each number only needs to be calculated once.

The expected output would be:

<br>

```
0: 0
1: 1
2: 1
3: 2
4: 3
5: 5
6: 8
7: 13
8: 21
9: 34
```

<br>

(If we had left the algorithm at `for i in range(n):`, it would have been outputting one number ahead of what it should have, because it would have initially set 2 to output 2 instead of 1 --> 2:2, 3:3, 4:5, 5:8, etc..)

<br>

So when we discuss scalability with algorithms, we're really asking: `How much longer does it take to calculate n+1 elements than n elements?`

With the memoization and iterative optimized solutions, the algorithm becomes much more efficient, finding fib(1000) relatively quickly. With the O(2^n) brute force solution, fib(1000) is never output because the run time will stall out.

When our software or algorithmic solutions have to scale to large inputs, it's critical to consider these Big O Notation concepts when deciding what type of algorithm or solution to use.

<br>

If our input will always be small, then using a brute force solution may be okay. It may not ever affect our user's experience or output.

But in most cases, the code we write may need to handle an unknown future number of inputs, which means we want to write optimized algorithms to prevent future issues.

<br>
<br>

## Space Complexity

Space complexity refers to the amount of space used by an algorithm - O(n), linear, is using 10 units per 10 inputs. Memoization uses O(n) space complexity, wheras the iterative solution has constant space complexity: O(1).

We can analyze an algorithm for both space _and_ time complexity.

If two algorithms are the same time complexity and memory usage is also important, we might opt for the iterative solution as the better choice. There may be different reasons to prioritize time and/or space complexity.

<br>


`** Keep in mind:` when solving an algorithm problem (or whiteboard problem), finding _any_ solution is the first and more important step. Optimizing is the next step. If you're struggling to find an "elegant" or "optimized" solution, simply brute force first. Then openly find ways to optimize. Pre-mature optimization is not always ideal or necessary, as it typically increases the complexity of the code which makes it difficult to maintain and prone to bugs. Not every problem is worth those issues.

For example, if we knew we'd never need to find fib() greater than input 4, then optimizing is unnecessary. If we think it would grow to fib(100), then that's a great reason to optimize.

`Hash tables` (cache) takes up more space and are more complicated than lists, but they provide speed.

<br>
<br>


## O(log n)

`O(log n)`, called `log time`, indicates a logarithmic run time function, of log base 2 (so, sometimes seen as O(log2n) ). 

If we have n elements, it will take the log of n * inputs to run the calculations - it will take logn of time units. If we have 1 unit, that will take (roughly) 0 time units to run. If it were linear (O(n)), 10 units would take 10 times units - but with O(log n), 10 units would only take 3 time units. At 100 units, it will take only 6 time units.

Essentially, with log n, the choice of which next element to perform an action on is broken into a few possibilities, but only one is chosen. Typically, if each step involves _halving_ the remaining number of units, that indicates O(log n).

<br>

For example, when searching in a phone book: if we are looking for "Smith" and open the phone book at random to "McDonald", we intuitively understand that the data set we should next look at is not before McDonald but _after_. We mentally broke the phone book into two data sets - before M and after M. Based on comparison, we know that Smith is going to be found after M. The next data set we choose to look at is based on a break point chosen in our first whole data set.

<br>

On the graph image, this is depicted by the dark blue line of `O(log2n)`.

O(log n) is faster than O(n), but its true speed advantage grows as the input items grow in number. The more inputs, the faster it is than O(n).

<br>

A good example of O(log n) is `binary search`. With the binary search algorithm, a data set is halved on each iteration, and compares the median to the target value.

Because the number of inputs is halved repeatedly, doubling the size of the input data has little effect on its run time. Unlike O(n), which would continue to double with double the input data, O(log n) only becomes slightly slower. This makes O(log n) and binary search extremely efficient when dealing with _large_ data sets.

[Read more on O(log n)](https://hackernoon.com/what-does-the-time-complexity-o-log-n-actually-mean-45f94bb5bfbf)


If we were searching a phone book and used this example, what is the run time?

<br>

```
phonebook = ['Aaron', 'Angela', 'Andrew', 'Banana', 'Beej', 'Cameron', 'Cindy', 'Cynthia']

def name_in_phonebook(to_find):
    for name in phonebook:
        if name == to_find:
            return True

    return False

print(name_in_phonebook("Beej"))
```

<br>

This example is O(n) - it's linear time. The run time will scale with the size of the phone book. While some names will be found faster than others (like Aaron, which is at the start of the list), we still calculate Big O  based on the _worst_ case scenario, or Big Theta based on the _average_ case scenario. 

On _average_, this search will take roughly half the number of inputs in time units. In the _worst case_, it will take as long as the number of inputs in time units. So, for our Big O evaluation, this runs with linear time.

Remember, Big Theta evaluation would also depend on if this function is being given an ordered list or not. If the list was not alphabetized, that may change the _average_ time it takes to find the name.

<br>


We could optimize this if we know the list is organized by using binary search, to search the ordered list the same way a person would, by splitting the phone book into segments to narrow down our items as we search. By cutting the space in half each time, we would have an algorithm that is O(log n).

<br>

What if we looped through the index letters until we find a matching start letter with the name we're searching for, and then loop through the values in the phone book that start with that letter?

Since we're looping through the index of existing letters, it's still O(n) because the time increases with the number of starting letters in the phone book. While it will max at 26 units of time, and grow only based on the values it then loops through with that starting letter, it is still O(n).

<br>

Although that method has two loops, they aren't _nested_. It's simply one loop that follows once the logic of the first loop is completed.

*But wait - isn't that actually O(2n)?*

If O(n) of the first loop + O(n) of the second loop, wouldn't that equate to O(2n)?

Yes - but when evaluating algorithms, we _typically_ do not care about the integer in front of n in any linear time label. There are more advanced cases where it matters but _in general_, we care about the shape of the graphed line. For this example, whether O(n) or O(2n), the line will still be linear in shape, so we just refer to it as O(n).

<br>

What if we used a linear search to get to the right starting letter index (B) and then used Binary Search to find "Beej" within the B name?

<br>

```
O(n) + O(log n) = ?
```

<br>

If we provide some imaginary time units based on n growing in size...

<br>

```
If n=1,000: 1,000 + 10 = 1,010
If n=1,000,000: 1,000,000 + 20 = 1,000,020
```

<br>

Because O(n) is slower than O(log n), and Big O evaluates based on the _worst_ case scenario, we would still evaluate this algorithm as O(n), because if n becomes extremely large (like 1000), the time complexity is still 1000.

O(n) will dominate the shape of the graphed line, because its larger time complexity dominates the overall time complexity of this algorithm. So we would consider it O(n) despite it including an O(log n) process too.


>In short: When adding different Big O notations, evaluate based on the one that has the worst time complexity, aka the one whose time output will affect the overall run time the most.  

<br>

What if we want to find out the time complexity of a function without looking at its source code? For example, when Python runs a search on a dictionary, how do we know how efficient it is and what method it's using?

We could time the results and plot them, to see the shape of the trend line. This would require vast dictionaries with thousands or millions of items to see the way it handles large data sets.

<br>
<br>

## Determining Big O

When we want to evaluate an alogrithm for time complexity, there are two questions we'll ask:

<br>

```
For a given number n, what is the maximum number of times the loop runs?
For a given number n, how many time units is it going to take to process?
```

<br>

Let's take a look at this basic algorithm that finds the square root of the given number, and prints each whole number up to that square root.

<br>

```
import math

def foo(n):
    sq_root = int(math.sqrt(n))
    for i in range(0, sq_root):
        print(i, sq_root)
```

<br>

If we print out a list of the given number (n) and the length of the output (meaning the number of times the algorithm loops), we can get a better idea of the relationship between the input and loop:

<br>

```
n	sqrt(n)
1	1
2	1
3	1
4	2
5	2
6	2
7	2
8	2
9	3
10	3
11	3
12	3
```

<br>

Looking at this, it's apparent that this algorithm is not linear because as the input grows, the loops do not increase similarly.

But it doesn't _exactly_ fit any of the other Big O Notations we've discussed either. So what would we describe this as?

<br>

Just because our time complexity doesn't appear on the Big O complexity  graph, doesn't mean it doesn't exist. The graph shows the most common ones, but any could exist within the graph as well.

For example, an accurate description of this square root algorithm might be `O(sqrt(n))` which is a valid time complexity. It's a square root of n process. As n increases, the amount of time it takes to process this algorithm will increase by the square root of n.

<br>

As a programmer, when you write an algorithm like this, mentally you should be considering, "As n increases, it won't loop through the entire range up to n, but instead it will loop through to the square root of n, which indicates this is a square root process."

Just because it has a for loop does not mean it is O(n) - it's _how_ the loop processes that matters for the time complexity.

--------------------------------------------------

Let's try another one.

<br>

```
def bar(n):
    s = 0

    for i in range(n):
        for j in range(n):
            s += i * j

    return s
```

<br>

This has a nested for loop - so given number of n, what is the maximum number of times each loop runs?

We would assume this is `O(n^2)` because of the nested for loop, but let's adjust the function a little to print the number of times we loop through the i loop and j loop, to be certain:

<br>

```
def bar(n):
    s = 0
    i_count = []
    j_count = []

    for i in range(n):
        i_count.append(i)
        for j in range(n):
            j_count.append(j)
            s += i * j

    return f's: {s}, i count: {len(i_count)}, j count: {len(j_count)}'
```

<br>

If we run `print(bar(5))`, the terminal prints:

<br>

```
s: 100, i count: 5, j count: 25
```

<br>

Showing that the algorithm does in fact loop through n^2 times (5 * 5 = 25, and the j loop runs 25 times).

When you see a nested loop, it's important to always stay alert to the problem that `O(n^2)` can become slow very quickly. If the expected inputs will be large, that's a good case for optimization.

_Keep in mind, not *all* nested loops are O(n^2) though._


--------------------------------------------------------

If we modify the previous loop to:

<br>

```
def baz(n):
    s = 0

    for i in range(n):
        for j in range(int(math.sqrt(n))):
            s += i * j

    return s
```

<br>

What is the time complexity now?

Since we're only running the inner loop `O(sqrt(n))` times, does that change the time complexity to `O(sqrt(n))`?

Again, let's expand this algorithm out to see how many loops are running by printing a count for each:

<br>

```
def baz_expanded(n):
    s = 0
    i_count = []
    j_count = []

    for i in range(n):
        i_count.append(i)
        for j in range(int(math.sqrt(n))):
            j_count.append(j)
            s += i * j

    return f's: {s}, i count: {len(i_count)}, j count: {len(j_count)}'

print(baz_expanded(25))
```

<br>

The terminal prints out:

<br>

```
s: 3000, i count: 25, j count: 125
```

<br>

If this algorithm were still O(n^2), the `j count` would be 625.

`O(n) * O(sqrt(n))` = `O(n * sqrt(n))` = `O(n sqrt n)`

> O(n) * O(sqrt(n)) = O(n * sqrt(n)) = `O(n sqrt n)`  


<br>

Let's try another example:

<br>

```
def frotz(n):
    s = 0

    for i in range(n):
        for j in range(2*n):
            s += i * j

    return s
```

<br>

What is the time complexity of this algorithm?

Before running it with printed counters, let's consider...

The first loop runs `for i in range(n)` which gives it `O(n)`.

The second loop runs `for j in range(2*n)` which gives it `O(2*n)`.

<br>

The first loop runs `for i in range(n)` which gives it O(n).
The second loop runs `for j in range(2*n)` which gives it O(2*n).
But it's also a nested for loop which means the time complexity is O(n^2) because the inner loop is not being limited.

<br>

n * 2n in this algorithm equates to 2 * n^2, or two times n squared.

Again we can expanded it out and print counters to see exactly how many times each loop runs:

<br>

```
def frotz_expanded(n):
    s = 0
    i_count = []
    j_count = []

    for i in range(n):
        i_count.append(i)
        for j in range(2*n):
            j_count.append(j)
            s += i * j

    return f's: {s}, i count: {len(i_count)}, j count: {len(j_count)}'

print(frotz_expanded(5))
```

<br>

This prints out in the terminal:

<br>

```
s: 450, i count: 5, j count: 50
```

<br>

> n = 5  
> n^2 = 25  
> 2 * n^2 = 50  

This algorithm does in fact have the time complexity of `O(2 * n^2)`, as shown by the final loop count of 50, the exact output expected of O(2 * n^2) when the input is 5.


>But remember that constants in Big O are dropped, so we would simplify this to O(n^2) process.  

<br>

Despite this version taking twice as long as the simplified version, the _shape of the curve_ is what we care about, not the exact time of the worst case scenario. Although the curve of this algorithm (`O(2 * n^2)`)might be steeper than just `O(n^2)`, the shape of the line is the same.

Constants don't change the _shape_ of the curve, only how steep it is. There is no number you can multiply n^2 by to change how the line bends, so although there are better and worse case scenarios _within_ O(n^2) type algorithms, they are evaluated as equal in time complexity.


<br>
<br>

## The 3 Main Rules of Big O


> 1. Discard the constant  
> 2. The bigger Big O Notation dominates (less efficient wins)  
> 3. We're interested in what happens with large values of `n` because some processes can be deceptively efficient with small values, but that doesn't account for scalability.  


For our last example, let's try to figure out how many times each loop runs _without_ running the algorithm first:

<br>

```
def booley(x):
    sum = 0
    for i in range(0, 1463):
        i += sum
        for j in range(0,x):
            for k in range(x, x+15):
                sum +=1
```

<br>

If we break this apart line by line, we can determine the time complexity of each loop individually and then determine how they relate to one another.

<br>

`for i in range(0, 1463)` indicates constant time `O(1)` because no matter how small or large x is, the time for calculating this will remain constant, even through `i += sum` happens on each loop.

`for j in range(0,x)` indicates linear time `O(n)` because it will grow linearly depending on how large or small x is.

`for k in range(x, x + 15)` indicates `O(15)` or O(1) because it is a nested for loop that will run exactly 15 times, no matter how big or small x is. The range will always be from x to x+15.

<br>

Because all these loops are nested, we would multiply them together:

> O(1) * O(n) * O(15) = `O(n)`  

Despite two nested loops, this algorithm has a linear run time of `O(n)`.

When there are nested loops, we mutiply their time complexities to reach a final result; when the loops run independently (one after another completes), we add them together instead.

<br>

One more example:

<br>

```
def bogey(array):

    print(array[1])
    midpoint = len(array) // 2
    
    for i in range(0, midpoint):
        print(array[i])

    for _ in range(1000):
        print('hi')
```

<br>


`len(array) // 2` is integer division that says the length of the array divided by two.

<br>

Let's break it down, line by line:

`print(array[1])` = O(1)

`midpoint = len(array) // 2` = O(1)

`for i in range(0, midpoint)` = O(n)

`print(array[1])` = O(1)

`for _ in range(1000)` = O(1)

`print('hi')` = O(1)

<br>

When we combine these:

> O(1) + O(1) + ( O(n) * O(1) ) + ( O(1) * O(1) )  

Which combines down to:

> O(1) + O(1) + O(n) + O(1) = `O(n)`  

Again, this algorithm evaluates down to a linear time complexity O(n).
