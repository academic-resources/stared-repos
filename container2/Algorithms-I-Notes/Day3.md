
# Lecture III Notes  
a. [Additional Resources](#Additional-Resources)  
b. [What is the difference between an algorithm and a function?](#What-is-the-difference-between-an-algorithm-and-a-function?)   
c. [Abstraction](#Abstraction)    
d. [POLYA Problem Solving Technique](#POLYA-Problem-Solving-Technique)   
e. [What if we don't understand the problem?](#What-if-we-don't-understand-the-problem?)   
f. [Factorials](#Factorials)  
g. [The 3 main rules of Big O](#The-3-main-rules-of-Big-O)  
h. [Recursive Solution](#Recursive-Solution)  
i. [Fibonacci Sequence](#Fibonacci-Sequence)  


<br>

If you feel so inclined, you can contribute to these notes by [donating coffee to the author](buymeacoff.ee/G1stPBuYU), for caffeine-fueled focus during lectures.    

<br>

# Additional Resources

[TK: How to Write and Analyze Algorithms](https://learn.lambdaschool.com/cs/module/recrCuZQMVI6LvxhD)  

[Coming Up With a First Pass Solution - 11 min](https://youtu.be/vtoYShxbPQw)  

[Improving Upon a First Pass Solution - 15 min](https://youtu.be/1QCmUv4-sIc)  

[Visualgo](https://visualgo.net/en): visualizing data structures and algorithms through animation.  

[Hacker's Delight](https://www.hackersdelight.org): a collection of programming tricks at the bit level.  

<br>
<br>

# How to Write and Analyze Algorithms Notes

<br>

[Lecture III Recording: CS19 Beej Jorgensen](https://www.youtube.com/watch?v=lB1n6lY8Lw0)  

<br>

# What is the difference between an algorithm and a function? 

An algorithm is a little more general than a function. An algorithm is a set of steps to solve some problem, whereas a function is a set of specific steps to solve a specific problem.

> "A function is concrete, and does have a machine implementation. In computer programming, a function is an implementation of an algorithm. An algorithm is a series of steps (a process) for performing a calculation, whereas a function is the mathematical relationship between parameters and results." - Google

<br>

# Abstraction

Abstraction is when we lessen the details/information, or when we use something without knowing how it works in detail.

We use algorithms all the time as an abstracted version of an implementable function.

There are sets of steps we do daily - tie our shoes, drive to work - that are abstracted out. We aren't focusing on each specific step and way that those things work mechanically.

Algorithms are known as mathematical and complicated ideas, which they can be, but also are not inherently.

Instead of trying to solve a problem we encounter specifically, this week we want to focus on how to solve problems generally in writing applications, by following a general set of steps:

<br>
<br>

# POLYA Problem Solving Technique

This is a four step problem solving process you can use to identify problems and come up with a solution.

See this [in depth POLYA explanation](https://math.berkeley.edu/~gmelvin/polya.pdf).  

The common steps are....

<br>

#### 1. Understand the Problem

This means making sure you're solving what is actually being asked to be solved. If we misunderstand the problem, we might create a viable solution for _a_ problem, but not the correct problem.

Ask questions and ensure you have a solid understanding of the problem before beginning any following steps.

*"Can I assume that..."*

Like, "Can I assume that the user will only input valid numerical data or do I need to assume they can input anything?"

Spending the time up front to fully understand what needs to be done, next you should...

<br>

#### 2. Come Up With a Plan (Pseudo-code)

Don't just jump into coding. It's far more efficient to pause and come up with a plan.

As you write a gameplan or a few lines of pseudo-code, you'll often come up with additional ideas, edge cases, potential difficulties, etc.

Then...

<br>

#### 3. Code Your Solution

Execute your game plan to get to a working solution - a first pass solution. It might not be elegant or optimized. You just want to get to an MVP solution.

Afterwards, you can analyze it for an optimized solution, time permitting.

The most important thing is to get it working, even if in a brute force manner.

<br>

#### 4. Analyze and Optimize 

During this step is a good time to find edge cases or ways that you would optimize your solution, expressing the logic behind those to your interviewer.

Consider addressing issues of scalability or unusual cases. Refactor for cleaner code.

<br>
<br>


## What if we don't understand the problem?

If there is a term being used that you are unfamiliar with - ask about it. In an interview situation, most hiring managers should clarify and appreciate you taking the time to fully understand the problem.

Identify exactly what you are being asked to return or show - what is the end result being returned from a good solution? Is is a numerical value? A string?

What are the inputs being given? What kind of data should I expect to be given?

A good way to verify you understand the problem is by rephrasing and summarizing it back to them: "From my understanding, what we're trying to do is..."

Draw a diagram or picture to help fully understand the problem. You can draw a visual example, a diagram of how the data flows, create a small mathematical example, the recursive call stack to identify the base case, etc.

<br>
<br>

#### Is it common to calculate Big O in an interview?

It depends on the industry and company - if that's important to them - but being able to look at something and give a rough example of the run time is an important skill.

It can also simply be a bonus to an interviewer to show that beyond being able to solve problems, you care about and understand optimization.

<br>
<br>

## Factorials

_See file [day3_work.py](day3_work.py) for the code to this section:_

A factorial is when something is the product of an integer and all the integers below it.

> I.e. 4! = 4 * 3 * 2 * 1  

What are some questions we might ask about writing a function that returns the factorial of the given number, using an iterative approach (not recursion)?

<br>

- What are the expected inputs? Are they positive integers?
- What is considered 0!? (Possible edge case)
- Are there any upper limits?
- Are any string being input?
- What should be returned from this function?

<br>

Once we have these assumptions answered, we'll make a plan. A good method is outlining our plan as comments within the code.

If we think about a base case, what is the _last_ number we multiply? 1.

Thinking about that, we'll do something _until_ something is 1. This implies a loop.

Within that loop, we need to multiply.

We'll initialize our returned result as 1 because even if the integer given is 0, it'll return one.

Our plan looks like:

`def iter_factorial(n):`
<br>

```
    result = 1
    # loop until 1
        # multiply
    
    return result
```

<br>

When we fill this in, it looks like...

<br>

```
def iter_factorial(n):
    result = 1
    # loop until 1
    while n > 1:
        # multiply
        result *= n
        n -= 1
    
    return result

n = 4
print('Result when n is', n, 'is: ', iter_factorial(n))
```

<br>
<br>

#### What would be the run time of this function?

The result and the return statement will only run once, no matter how large n is.

But how long the loop will run depends on how large n is. It will run n-1 times.

Remember though, we drop associated integers when evaluating run time so this would reduce down to `O(n)` or linear time.

<br>
<br>


## The 3 main rules of Big O


> 1. Discard the constant  
>  
> 2. The bigger Big O Notation dominates (less efficient wins)  
>  
> 3. We're interested in what happens with large values of `n` 
because some processes can be deceptively efficient with small 
values, but that doesn't account for scalability.  

<br>
<br>

## Recursive Solution

Think of the base case when considering how to solve something recursively (the very smallest case).

We could build a plan like so:

<br>

```
def rec_factorial(n):
    # base case, n=1

    # recursive cases, when n>1
```

<br>

We should also consider, what about the case when `n=0`:

<br>

```
def rec_factorial(n):
    # base case, n=1
    if n == 1 or n == 0:
        return 1

    # recursive cases, when n>1

```

<br>

So with our base case, we know _when_ to stop, but we need to make sure with our recursive step, we're doing something to _get to the base case_. We need to use `n-1`.

<br>

```
def rec_factorial(n):
    # base case, n=1
    if n == 1 or n == 0:
        return 1

    # recursive cases, when n>1
    else:
        rec_factorial(n-1)
```

<br>

Now, we're decreasing `n` but we still need to multiply the result by `n`:

<br>

```
def rec_factorial(n):
    # base case, n=1
    if n == 1 or n == 0:
        return 1

    # recursive cases, when n>1
    else:
        return n * rec_factorial(n-1)
```

<br>


#### What is the runtime evaluation?

There are no loops but we do have a recursive function call. When we see a recursive call, we want to visualize, "How many times will this recursive function call be made?"

In memory, all these calls are being _made_ but not _finishing_ until the base case is resolved. `rec_factorial(3)` has to wait on `rec_factorial(2)` to resolve, which waits for `rec_factorial(1)` to resolve.

In this case, the number of recursive calls being made increases by one every time n increases by one, so this resolves to `O(n)` or linear time still.

While this may be time efficient, it is not memory (space) efficient due to the open, waiting function calls that stack while waiting to hit the base case resolution.

<br>
<br>

## Fibonacci Sequence

We can practice solving using dynamic programming techniques with the Fibonacci sequence.

Learn more [here](https://en.wikipedia.org/wiki/Fibonacci_number).  

In math, the Fibonacci sequence is numbers in order, where each number is the sum of the two preceding one, starting from 0 and 1.

<br>

```
F0 = 0 F1 = 1 F2 = 1 (0 + 1) F3 = 2 (1 + 1) F4 = 3 (2 + 1)
```

<br>

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

Go in depth on Fibonacci [here](http://www.maths.surrey.ac.uk/hosted-sites/R.Knott/Fibonacci/fibmaths.html).  

This is an example of `O(2^n)` runtime because for each additional input, the operations computed grow exponentially.

