# Lecture III: Binary Search Trees and Heaps

a. [Additional Resources](#Additional-Resources)  
b. [Text Buffer](#Text-Buffer)   
c. [Append and Prepend](#Append-and-Prepend)   
d. [Delete From Head or Tail](#Delete-From-Head-or-Tail)   
e. [Binary Search Trees](#Binary-Search-Trees)   
f. [Insert into BST](#Insert-into-BST)   
g. [Heaps](#Heaps)   
h. [Building a Heap](#Building-a-Heap)        

<br>

[CS18 Sean Chen Lecture](https://youtu.be/QYddRpvTaFk)  

[CS19 Brian Doyle Lecture](https://www.youtube.com/watch?v=B4ijhReCRHw&feature=youtu.be)   

<br>
<br>

## Additional Resources

[Binary Search Trees - 15min](https://youtu.be/SsRVdvRsNG0)  

[Heaps - 30min](https://youtu.be/LYWPsV2YQBA)  

<br>

## Text Buffer

Taking a look at our project repo's [text buffer file](bst_heaps.py), let's start working through what it might be expecting and how to build a text buffer.

The first thing we'll notice is that it imports the `DoublyLinkedList` file to use that data structure.


Our `init` function shows us that we can optionally pass the string to `self.contents` if there is a string parameter passed in -- but there doesn't need to be. How should we add to this function so it passes that string to the content?

<br>

```
def __init__(self, init=None):
    self.contents = DoublyLinkedList()
    # check if an init string is provided
    # if so, put the contents of the init string in self.contents
    if init:
        pass
```

<br>


We'll want to add this data to the tail of the linked list, but we don't know _what_ a Text Buffer is, so _how_ isn't certain.

A Text Buffer is typically an array that stores each individual character of a string -- but we're using a linked list for speed.

So, we'll loop through the string and add each character to the tail of the linked list.

<br>

```
def __init__(self, init=None):
    self.contents = DoublyLinkedList()
    # check if an init string is provided
    # if so, put the contents of the init string in self.contents
    if init:
        for character in init:
            self.contents.add_to_tail(character)
```

<br>


We can use the pre-built `add_to_tail` function from our Doubly Linked List file.

If we use a test print statement like `print(f"Adding {character}")`, our terminal will print out the following based on the tests at the bottom of the file:

<br>

```
Adding S
Adding u
Adding p
Adding e
Adding r
Super
```

<br>

So we know that it's properly iterating through the list, and that the existing `str` method concatenates them back together properly to print a string value for the Text Buffer.

We could also test the contents' length or tail to see if it matches the expected output.

<br>
<br>

## Append and Prepend


Next, let's work on append and prepend. Append starts out like so:

<br>

```
def append(self, string_to_add):
    pass
```

<br>

To append to our linked list, we'll add a string in the same way as before. Just loop through the characters and add to the tail.

<br>

```
def append(self, string_to_add):
    for character in string_to_add:
        self.contents.add_to_tail(character)
```

<br>

Since we have identical code in two places, we could make our code more DRY by using `self.append` in our `init` function instead.

<br>

```
if init:
    self.append(init)
```

<br>


Prepend means we will add the string to the front of the text buffer, or the head of the list. Which means we need to reverse the character order so that the string is being prepending to read in the correct order.

We could visualize it like so. If we wanted to add `HELLO` to the existing list that says `WORLD`:

> HELLO WORLD

If we tried to add it in order, it would go like this:

> H WORLD  
> EH WORLD  
> LEH WORLD  
> LLEH WORLD  
> OLLEH WORLD  

Since this wouldnt read correctly, we need to reverse the string so it instead is added like this:

> O WORLD  
> LO WORLD  
> LLO WORLD  
> ELLO WORLD   
> HELLO WORLD  


We can reverse a string in two ways in Python. 

The first option is to use slicing with `[::-1]`, but this is considered an arcane or difficult to read way of writing:

<br>

```
def prepend(self, string_to_add):
    # reverse the incoming string to maintain correct 
    # order when adding to the front of the text buffer 
    for character in string_to_add[::-1]:
        self.contents.add_to_head(character)
```

<br>


Another method is to use the built in `reversed` function like so:

<br>

```
def prepend(self, string_to_add):
    # reverse the incoming string to maintain correct 
    # order when adding to the front of the text buffer 
    for character in reversed(string_to_add):
        self.contents.add_to_head(character)
```

<br>

You can read more about the pros and cons of each method [here](https://dbader.org/blog/python-reverse-string).


<br>
<br>

## Delete From Head or Tail

Next we want to delete some number of characters from either the head or the tail. Both of these functions will work really similarly.

Since we know exactly how _many_ characters to remove, we can call our doubly linked list functions that many times using a loop:


<br>

```
def delete_front(self, chars_to_remove):
    for i in range(0, chars_to_remove):
        self.contents.remove_from_head()

def delete_back(self, chars_to_remove):
    for i in range(0, chars_to_remove):
        self.contents.remove_from_tail()
```

<br>
<br>

## Join

The two remaining functions left to write are both join functions.

The first one asks us to join one text buffer to another, by creating a concatenated buffer where the head of this starting buffer is at the head of the concatenated buffer, and the tail of the buffer being added is the tail of the concatenated buffer.

The starting functions gives us some hints about how to approach this problem:

<br>

```
"""
Join other_buffer to self
The input buffer gets concatenated to the end of this buffer 
The tail of the concatenated buffer will be the tail of the other buffer 
The head of the concatenated buffer will be the head of this buffer 
"""
def join(self, other_buffer):
    # we might want to check that other_buffer is indeed a text buffer 
    # set self list tail's next node to be the head of the other buffer 
    
    # set other_buffer head's prev node to be the tail of this buffer
    
    pass
```

<br>

The key of concatenating two buffers relies on setting the current tail's next as the head of the other buffer.

First, we need to make sure that the passing in `other_buffer` is actually a text buffer.

We can use Python's `isInstance` to check if both are an instance of the same class. Per the docs:

> def isinstance(obj, class_or_tuple)  
> Return whether an object is an instance of a class or of a subclass thereof.  


So we'll keep going if it is a TextBuffer or print an error if there it isn't:

<br>

```
        if isinstance(other_buffer, TextBuffer):
            # set self list tail's next node to be the head of the other buffer 
            # set other_buffer head's prev node to be the tail of this buffer
            
        else:
            print("ERROR: Argument is not a TextBuffer")
            return
```

<br>


We'll set the tail of the current TextBuffer pointing to the head of the other_buffer:

<br>

```
if isinstance(other_buffer, TextBuffer):
    # set self list tail's next node to be the head of the other buffer 
    self.contents.tail.next = other_buffer.contents.head
    # set other_buffer head's prev node to be the tail of this buffer
    other_buffer.contents.head.prev = self.contents.tail
    # now that both buffers are connected, we will set this buffer's tail to the other buffer's tail, to fully concatenate together
    self.contents.tail = other_buffer.contents.tail
    # make sure to fully extend the length to include the other buffer's length
    self.contents.length += other_buffer.contents.length
```

<br>

We should also check that the `other_buffer` being passed in does in fact have contents. 

<br>

```
if(other_buffer.contents.length == 0):
    print("ERROR: Other buffer is empty!")
    return        
```

<br>

We have to nest that in _after_ checking that `other_buffer` is a buffer, or else there will be no `.length` to check.


Lastly we need to handle joining a string by turning it into text buffer first.

This function starts out like so:

<br>

```
# if we get fed a string instead of a text buffer instance,
# initialize a new text buffer with this string and then 
# call the join method 

def join_string(self, string_to_join):
    pass
```

<br>


This can be done very simply with our pre-written functions. We'll turn that string into a TextBuffer instance and then use our join method to combine the new text buffer with the current one.

<br>

```
def join_string(self, string_to_join):
    new_buffer = TextBuffer(string_to_join)
    self.join(new_buffer)
```

<br>
<br>

## Binary Search Trees

What is a Binary Search?

It takes a sorted list and compares two pieces of data, then cuts the list in half based on what it is searching for. This results in an `O(log n)` run time, which is very good.

To use this, it means our data must be sorted first. One way to do that is using a tree.

<br>

Read more [here](https://www.geeksforgeeks.org/binary-search/) or see this helpful [short video visualization](https://www.youtube.com/watch?v=qBGLYzFF1aQ).

[This video](https://www.youtube.com/watch?v=Re-HdpXo1is) is a brief explanation of iterative searching through a binary tree.

<br>

A tree is a node tree that contains "branches" and "leaves". 

![Valid Binary Trees](Binary_Trees.pny "Valid Binary Trees")

A valid binary tree requires that all the nodes have only 0, 1 or 2 children -- not more.

It also means that all the _left_ children have values _less than_ their parents, while all _right_ children have values _greater than_ their parents.

In this manner, the tree is pre-sorted.

<br>

Looking at the chart above, we can see in `a)` that 1's child on the left is 25, which is greater than, so that is an invalid binary tree.

`b)` only contains one node, so it's valid.

`c)` is also an invalid search tree. 22 is valid because 5 is on the right and 54 is on the left. 5 looks valid because 77 is on the right side of 5...but because it's larger than 22, it should be on 22's right side.

By having 77 and 92 underneath 22 on the left side of the tree, it's invalid because it's not properly sorted.

`d)` is also invalid because 21 is larger than 17 but on the left side.


<br>

What would we do if we have 2 identical values in the Binary Tree? 

In a simple BST, we could place that either on the left or right hand side, depending on how we want to define which is _equal to and_. 

But in an ideal solution, we would not have duplicates. Instead, we would store the value _and_ the count of nodes with that value in one spot.

For example, if we had two 12's, instead of listing:

```
        12
      /    \
     12    45
    /
   6
```

We might list like this instead:

```
    12 (2)
    /    \
   6     45
```

This indicates that we have two nodes with the value of 12, but prevents any confusion in our sorted tree by having duplicate values in the branches.

A detailed explanation is [here](https://www.geeksforgeeks.org/how-to-handle-duplicates-in-binary-search-tree/).

Some Binary Search Trees also require it to be balanced by having the same number of nodes on the right and left sides. Learn more about [converting to a balanced BST](https://www.geeksforgeeks.org/convert-normal-bst-balanced-bst/). 

<br>


A Binary Tree _could_ work if we swapped convention and put all greater than values down the left side, and lesser than values on the right side. It would still funciton. But because it breaks convention, it would be poorly written code that confuses other devs that work with that code.

There could be an exception with good reasoning for doing it that way -- in which case, we should document it clearly. 

On the whole though, it's best to follow convention.

<br>

Visualize your Binary Tree by creating it [on this website](https://www.cs.usfca.edu/~galles/visualization/BST.html) or also [this one](http://btv.melezinek.cz/binary-search-tree.html).

See visualization of many BST aspects [here](https://visualgo.net/bn/bst).

<br>


## Insert into BST

Let's start writing out a class that initializes a Binary Search Tree by creating nodes of the tree. We might initialize it like so:

<br>

```
class BinarySearchTreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
```

<br>

This initializes a parent node with some passes in value, that currently has no children. So we need to write a method that allows us to insert a value into the tree, that will place it into the correct spot, following the left-right less-than and greater-than rules.

<br>

```
class BinarySearchTreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
    
    def insert(self, value):
        if value < self.value:
            # go down the left side
            if not self.left:
                # if there is no more left values, place it there
                self.left = BinarySearchTreeNode(value)
            else:
                # continue searching down the left to find an open spot
                self.left.insert(value)
        else:
            # go down the right side
            if not self.right:
                # place the value node here
                self.right = BinarySearchTreeNode(value)
            else:
                # continue searching
                self.right.insert(value)
```

<br>
<br>

## Heaps

What is a heap?

It's a tree that is held inside of an array. Unlike the typical array that is arranged by increasing index, a heap is an array that is arranged according to parent-child relationships.

Read more [here](https://www.geeksforgeeks.org/binary-heap/).


There are two types of heaps: [min heap and max heap](https://www.educative.io/edpresso/min-heap-vs-max-heap).

A min heap means that the key value at the root of the tree must be the minimum of all the values in the Binary Heap.

A max heaps means that the key value at the root of the tree must be the _maximum_ value of the complete binary tree.


If we have two numbers, 42 and 10, how would it look in a tree?

It'll start out with 42:

> [ -inf, 42]  

Which in the tree is just:

```
    42
```

When we add 10, it will be added in at the bottom of the tree:

> [ -inf, 42, 10 ]  

```
    42
   /
  10
```

BUT then it adjusts by switching 10 to the appropriate place in the tree for a min heap (remember, the key value at the root is the lowest).

> [ -inf, 10, 42 ]  

```
    10
   /
  42     
```

<br>

This shows that adding to a min heap is a multi-step process that initially adds the new value as a node to the bottom of the tree. Then it "bubbles up" or sorts itself into place by moving up a generation each time.

We can think of this as the parent must be smaller than the child.

Unlike a BST, where nodes can be added at random, in a heap, the nodes are filled up in a sequential order, by filling the left most, lowest spot first and moving to the right, until an entire generational level is filled. (But then swapping nodes until each value is in the right location)

Visualize it like this sequence:

```
        10
       /  \
      ?    ?
     / \  / \
    ?  ? ?   ?
```

```
        10
       /  \
      11   ?
     / \  / \
    ?  ? ?   ?
```

```
        10
       /  \
      11  25
     / \  / \
    ?  ? ?   ?
```

```
        10
       /  \
      11  25
     / \  / \
   32  ? ?   ?
```

```
        10
       /  \
      11  25
     / \  / \
   32  45 ?   ?
```

```
        10
       /  \
      11  25
     / \  / \
   32 45 63   ?
```

```
        10
       /  \
      11  25
     / \  / \
   32 45 63  77
```

<br>

Notice how the open spots filled from left to right, row by row.

Then the parent and child swap if the parent is larger than the child.

In a max heap, the larger numbers float to the top instead of the smaller.

<br>

What would this data structure be useful for?

This could help us sort prices from low to high, or for a priority queue on a server by assigning weights to different types of messages.

<br>
<br>

## Building a Heap

Let's try to work with the heap file in our project repo, generic heap.

It's initialized like so:

<br>

```
class Heap:
  def __init__(self, comparator):
    self.storage = []
    self.comparator = comparator
```

<br>

Let's build the bubble up method and assume this is a min heap. We have the _index_ though, not the value of the index.

If we're looking at the index, when do we know we've hit our base case? If our index is 0.

How do we compare this index to the parent's value? Although we're mentally envisioning this as a binary tree, it's actually stored as a flat array. 

We'll use [the algorithm](https://www.geeksforgeeks.org/binary-heap/) that returns the parent node: i-1//2

The `//` divisor means that it drops any decimal points and returns a floored number (whole integer).

<br>

```
  def _bubble_up(self, index):
    # until we hit the base case
    while index > 0:
        # compare to parent
        parent = (index-1) // 2 #divided by 2

        # if the parent is greater than...
        if self.storage[index] < self.storage[parent]:
            # swap them
            self.storage[index], self.storage[parent] = self.storage[parent], self.storage[index]
            index = parent
        else:
            # leave it where it is
            break
```

<br>

This compares the parent value to the index value. If the parent is larger, then we'll swap them, and update the index to that value of the parent.

If the parent value is not larger, then we can break out of the loop because the index is in the right place.


_Note: the ReadMe actually indicates that the generic heap should be able to be a max or min heap_

<br>
<br>