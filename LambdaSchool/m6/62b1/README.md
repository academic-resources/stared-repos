# Sprint Challenge: Data Structures

## Description

This Sprint Challenge is split into three parts:

1. Implement a data structure called a ring buffer (more details below)
2. Optimizing some inefficient code
3. Reversing the contents of a singly linked list

### Minimum Viable Product

#### Task 1. Implement a Ring Buffer Data Structure

* [X] A ring buffer is a non-growable buffer with a fixed size.
* [X] When the ring buffer is full and a new element is inserted, the oldest element in the ring buffer is overwritten with the newest element.
* [X] This kind of data structure is very useful for use cases such as storing logs and history information, where you typically want to store information up until it reaches a certain age, after which you don't care about it anymore and don't mind seeing it overwritten by newer data.
* [X] Implement this behavior in the RingBuffer class.
* [X] RingBuffer has two methods, `append` and `get`.
* [X] The `append` method adds the given element to the buffer.
* [X] The `get` method returns all of the elements in the buffer in a list in their given order.
* [X] It should not return any `None` values in the list even if they are present in the ring buffer.

#### Task 2. Runtime Optimization

* [X] Navigate into the `names` directory. Here you will find two text files containing 10,000 names each, along with a program `names.py` that compares the two files and prints out duplicate name entries.
* [X] Try running the code with `python3 names.py`. Be patient because it might take a while: approximately six seconds on my laptop.
* [X] What is the runtime complexity of this code?
```
    runtime: 5.663139343261719 seconds
    complexity:  O(n^2) (polynomial)
```
* [X] Six seconds is an eternity so you've been tasked with speeding up the code. Can you get the runtime to under a second? Under one hundredth of a second?
```
    runtime: 0.002018451690673828 seconds
    complexity:  O(n) (linear)
```

*You may not use the built in Python list, set, or dictionary in your solution for this problem.  However, you can and should use the provided `duplicates` list to return your solution.*

* [X] (Hint: You might try importing a data structure you built during the week)

#### Task 3. Reverse a Linked List

* [X] Inside of the `reverse` directory, you'll find a basic implementation of a Singly Linked List.
* [X] _Without_ making it a Doubly Linked List (adding a tail attribute), complete the `reverse_list()` function within `reverse/reverse.py`.
* [X] Reverse the contents of the list using recursion, *not a loop.*

For example,
```
1->2->3->None
```
would become...
```
3->2->1->None
```

* [ ] While credit will be given for a functional solution, only optimal solutions will earn a ***3*** on this task.

#### Stretch

* [X] Say your code from `names.py` is to run on an embedded computer with very limited RAM.  Because of this, memory is extremely constrained and you are only allowed to store names in arrays (i.e. Python lists).  How would you go about optimizing the code under these conditions?
* [X] Try it out and compare your solution to the original runtime.
* [X] If this solution is less efficient than your original solution, include both and label the strech solution with a comment
```
runtime: 0.00399327278137207 seconds
complexity:  O(n) (linear)
```

### Rubric

| OBJECTIVE | TASK | 1 - DOES NOT MEET Expectations | 2 - MEETS Expectations | 3 - EXCEEDS Expectations | SCORE |
| ---------- | ----- | ------- | ------- | ------- | -- |
| _Student should be able to construct a queue and stack and justify the decision to use a linked list instead of an array._ | Task 1. Implement a Ring Buffer Data Structure | Solution in `ring_buffer.py` DOES NOT run OR it runs but has multiple logical errors, failing 2 or more tests | Solution in `ring_buffer.py` runs, but may have one or two logical errors; passes at least 5/6 tests (Note that each function in the test file that begins with `test` is a test) | Solution in `ring_buffer.py` has no syntax or logical errors and passes all tests (Note that each function in the test file that begins with `test` is a test)| 3 |
| _Student should be able to construct a binary search tree class that can perform basic operations with O(log n) runtime._ | Task 2. Runtime Optimization | Student does NOT correctly identify the runtime of the starter code in `name.py` and is not able to optimize it to run in under 6 seconds | Student does not identify the runtime of the starter code in `name.py`, but optimizes it to run in under 6 seconds, with a solution of O(n log n) or better | Student does BOTH correctly identify the runtime of the starter code in `name.py` and optimizes it to run in under 6 seconds, with a solution of 0(n log n) or better | 3 |
| _Student should be able to construct a linked list and compare the runtime of operations to an array to make the optimal choice between them._ | Task 3. Reverse the contents of a Singly Linked List using Recursion| Student's solution in `reverse.py` is failing one or more tests | Student's solution in `reverse.py` is able to correctly print out the contents of the Linked List in reverse order, passing all tests, BUT, the runtime of their solution is not optimal (requires looping through the list more than once) | Student's solution in `reverse.py` is able to correctly print out the contents of the Linked List in reverse order, passing all tests AND it has a runtime of O(n) or better | 3 |

#### Passing the Sprint

Score ranges for a 1, 2, and 3 are shown in the rubric above. For a student to have _passed_ a sprint challenge, they need to earn an **average of at least 2** for all items on the rubric.
