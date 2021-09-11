### Data structures are like cookware:

The tools you use to accomplish your task
Algorithms are the recipe:
The set of instructions you follow.
Will specify what data structure to use

There are niche data structures that most developers could never use
Once you get into specialized applications, they can be handy

### Terminology:

Arrays => lists
Objects => dictionaries

Objects and lists can get you very far
Not optimized for any one task

### List

A list is a contiguous block in memory where you store your list of things
Predefined amount of space
Can add/remove because they’ve added that functionality
Canonically with an array/list, it is a static amount of size
In JS and Python, if you start off with a list, it’s extra work to add to it because you have to expand the space in the list to accommodate additional data

For the purposes of what we’re talking about today, assume a list/array is only a predefined amount of space

### Linked Lists

Linked List represents a list in a different way:

- Stores each value into a node
- Stores also a pointer to the next node in the list

With an array/list, you have a predefined amount of space and if you want to add to it later on, more work to expand the amount of space available to the list/array

Linked List inverts that - is constructed in terms of the individual elements

- Each element is encapsulated in its own node and then the list itself is constructed with pointer arrows
  `1->2->B->4->5->null`
  1 knows about 2 knows about B knows about 4 knows about 5 knows about null

If you have an array/list and say it’s 10 spots, it will take up 10 spots in memory even when empty
Empty linked list takes up no memory

Node is a dictionary/object/class that holds a value and a next

Linked List class - head and tail
`1->2->3->N`
Head - first node in the list
Tail - last node in the list

- Linked List knows about the first node in the list and last node in the list (1 and 3)
- def contains(target_value) -> checks to see if linked list contains the value you’re looking for
- def get_max should return maximum value and keep track of current maximum value

### Queue data structure:

- Can recreate using a list or array
- Encapsulates the functionality you get when you end up in a line
- When you join, you’re at the back
- When you leave, you’re at the front
- Stay for duration of the line
- First in first out
- Enqueue - add to the end
- Dequeue - remove from front
- lens - length of the list

- Catch - will use linked list that you made in order to implement the queue
- self.storage = LinkedList()
- Adding and removing from linked list
- 5->N
- H->T
- Remove H

### Stack data structure

Last in first out

### Binary Search Trees:

Tree is like a linked list
With node you can have multiple pointers
Binary is enforcing that there is only max two children from any one node
`Left < parent <= right`
If adding input, need to put into node and compare to root of tree
If already has a node on the side the new node would fit, keep traversing that side of the tree until there is space for it

contains - if a value exists in the binary search tree
get_max - maximum value of the binary search tree

### Heap data structure:

How do we design a data structure to get max value ASAP
We’ll be implementing max heap

Fastest way to access something in an array - index
Heap tries to take advantage of that
Top of the heap is always the max (in max heap)
Not binary search tree because not the same rules
Multiple ways to represent heap
Makes more sense to implement it as a binary tree, but sometimes makes more sense to implement as array

### Heap as tree:

insert 101

- By end, 101 should be at top
- Will be added at the bottom layer
- Will see that parent is less, will swap with parent (using bubble_up)
- 3 and 101 will swap
- 19 and 101 will swap
- 100 and 101 will swap
- delete will remove top of heap
- Remove 100
- Take last element in heap (this case 7)
- Put that at top
- Compare with two children and swap with highest (swaps with 36)
- Compares with children (25 and 1), swaps with highest (25)
- get_max will be easiest
- \_bubble_up : helper method
- \_sift_down: helper method

Like binary search trees, there are rules for how heaps are laid out
Direct children have to be less than parents

```
[0, 100, 19, 36, 17, 12, 25, 5, 9, 15, 6, 11, 13, 8, 1, 4]
node = i
left = 2i
right = 2i + 1
child to parent = floor(i/2)
```

### Heap as array:

No nodes in heap, just an array with values
Tree was because intuitive to talk about heaps in that case
Array integer

### Advice:

Draw everything out with different inputs to see how things will work
