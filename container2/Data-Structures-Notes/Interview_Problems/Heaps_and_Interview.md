# Lecture IV: Heaps and Interview Questions

a. [Binary Search Tree Solution](#Binary-Search-Tree)  
b. [Review Heaps](#Review-Heaps)   
c. [Practice Interview Questions](#Practice-Interview-Questions)     

<br>

[CS19 Lecture with Brian Doyle](https://youtu.be/qtB7wpLG84c)  

[Add on that gives VSCode windows unique color themes](https://marketplace.visualstudio.com/items?itemName=stuart.unique-window-colors)

<br>
<br>

## Binary Search Tree

Going through our BST project, [we currently have the following code](https://github.com/LambdaSchool/Data-Structures/blob/master/binary_search_tree/binary_search_tree.py) and need to work on `contains`:

<br>

```
class BinarySearchTree:
  def __init__(self, value):
    self.value = value
    self.left = None
    self.right = None

  def insert(self, value):
    if value < self.value:
        if not self.left:
            self.left = BinarySearchTree(value)
        else:
            # recursively continues until we find an empty spot
            self.left.insert(value)
    else:
        if not self.right:
            self.right = BinarySearchTree(value)
        else:
            self.right.insert(value)

  def contains(self, target):
    pass
```

<br>

We need to check where we are in the tree. If the target is the current value, then we know that we're already done. Otherwise, we need to traverse the tree.

We need to decide if we want to go left or right, so how can we decide that? We'll compare our value to our target, choosing a path based on if it's less or greater than.

Depending on the direction chosen, if there are no futher nodes to search for it, and it's not a match, then we know it doesn't exist in this tree. If there are more nodes, we need to call the same function recursively, but on the node on the right or left.

<br>

```
def contains(self, target):
if self.value == target:
    return True

if target < self.value:
    # we know to go left
    if not self.left:
        # if there are no further left side nodes to search, it isn't here
        return False
    else:
        # recursively search the rest
        return self.contains(target)

else:
    # we know to go right
    if not self.right:
        return False
    else:
        return self.contains(target)
```

<br>


Next, let's work through `get_max`. 

We want to search the tree, holding onto a max value and updating it if a greater one is found. Our base case is an empty tree. We also know that the max value will be found down the right hand side, not the left, based on the greater than conventional architecture.

<br>

```
def get_max(self):
if not self:
    return None
if not self.right:
    return self.value
else:
    return self.right.get_max()
```

<br>

We are checking if there is a node to the right. If there isn't, then we know that's the max.

Otherwise, we keep searching down the right by calling get_max on the next right node.

Our last function to write is the `for_each` method which should visit each node in the tree and run a callback function on it.

We can continue writing this with recursion. 


<br>

```
def for_each(self, cb):
cb(self.value)

if self.left:
    self.left.for_each(cb)
if self.right:
    self.right.for_each(cb)
```

<br>

Why are we not including a return?

We're trying to _run_ a function on each value -- that may or may not already include a return statement -- not receive back a value, because if we used a return, then it will only go down the left side and exit out of the function before ever calling down the right side of the tree.

<br>
<br>

## Review Heaps

Let's talk about Heaps conceptually. A heap is stored inside of an array because we need to be able to access things at a specific spot -- but it looks like a tree because when we access items, we use specific functions that traverses the array like a binary tree in parent-child relatonships.

This is unlike the usual array method of accessing things just in a sequential method.

This is more efficient because it has an O(1) run time for some operations and the space complexity is simply O(n). There is no extra space or pointer storage. It's solely storing the data.

Visually, it makes more sense to "view" this as a tree (because of the parent-child relationships), but it _is_ stored in an array.

<br>

[Here](https://www.cs.usfca.edu/~galles/visualization/Heap.html) and [here](http://btv.melezinek.cz/binary-heap.html) are heap visualiation websites.  


<br>

Inserting in a min heap means adding a node, then bubbling up through the array to compare to each parent, and swapping them if they should be reversed based on value.

In the array, the new node is being added to the end of the array, then it's finding the parent using [these equations](http://geeksquiz.com/binary-heap/).


_Brian goes into depth about this around 40 minutes into the CS19 lecture._

<br>

Q: Why it is advantageous to replace the lowest leaf when popping off the root and then sift that child down. Why not swap the next largest child of that root after removing the root?

A: Less comparisons to make by sifting the lowest down.  If we just move the 2nd largest up, then we have to check all of the children of each child to make sure the heap property is maintained.

Heap Insert:
 - Add Item to end of tree
 -  Bubble it up to the right spot

Heap delete:
 - Swap priority element with least priorty
 - Remove the last element (previously the root)
 -  Sift down new top to the correct spot

<br>
<br>


## Practice Interview Questions

Given this sample interview question, how would you approach solving it?

#### Find the Smallest Missing Element from a Sorted Array

Given a sorted array of distinct, non-negative integers, find the smallest missing element in it.

Examples

> Input: A = [0, 1, 2, 6, 9, 11, 15] Output: The smallest missing element is 3  
>  
> Input: A = [1, 2, 3, 4, 6, 9, 11, 15] Output: The smallest missing element is 0  
>  
> Input: A = [0, 1, 2, 3, 4, 5, 6] Output: The smallest missing element is 7  


<br>

One option would be starting at 0 and iterating up to find the first number that is missing itself +1. If we reach the end of the array and none is missing, then we know it's the final number in the array +1.

A way to possibly optimize would be to find sequences within the array and search before and after each sequence to jump numbers more quickly (akin to TimSort).

<br>

```
if arr[0] != 0:
    return 0

for i in range(0, len(arr)):
    if arr[i]+1 != arr[i+1]:
        return arr[i]+1
```

<br>


Another method would be to use a version of binary search to find the earliest number where the index of the array does not match arr[i]. For example, if arr[0] is not 0, we know 0 is the earliest missing integer.

This is optimized because it allows us to search through the array more quickly. If all of the checks pass, then we know that the earliest missing number is at the end of the array.

In an array like this:

> [0, 1, 2, 3, 5, 6, 9]

We know that the earliest missing is at arr[4] because arr[4] == 5 not 4. 

<br>


Our next problem is...

#### Given M sorted lists of variable length, print them out in sorted order efficiently.

Examples

> Input: Four sorted lists of variable length  
>  
> [10, 20, 30, 40], [15, 25, 35], [27, 29, 37, 48, 93], [32, 33]  
>  
> Output: 10, 15, 20, 25, 27, 29, 30, 32, 33, 35, 37, 40, 48, 93 

<br>

A way to handle this might be to use merge sort to iterate through the given arguments, and merge the arrays together, then print a final merged array.


<br>

```

def merge(arrA, arrB):
    elements = len( arrA ) + len( arrB )
    merged_arr = [0] * elements

    for i in range(0, len(merged_arr)):
        # If arrA is empty, use arrB to fill
        if len(arrA) == 0:
            merged_arr[i] = min(arrB)
            arrB.remove(min(arrB))
        
        # If arrB is empty, use arrA to fill
        elif len(arrB) == 0:
            merged_arr[i] = min(arrA)
            arrA.remove(min(arrA))

        elif min(arrA) < min(arrB):
            merged_arr[i] = min(arrA)
            arrA.remove(min(arrA))

        elif min(arrA) >= min(arrB):
            merged_arr[i] = min(arrB)
            arrB.remove(min(arrB))
    
    return merged_arr

def merge_arrays(*args):
    if not args:
        return None

    new_array = []
    for arg in args:
        new_array = merge(new_array, arg)

    print(*new_array, sep = ", ")

```

<br>

Another interesting solution might be to iterate through the arrays while there is more than one, finding the smallest number of any array, popping it into a new_array, and removing any array that becomes empty.

Like so:

![Solution](Interview2.png "Solution")

<br>

But a truly optimal solution to this problem is solved [using min heaps](https://medium.com/outco/how-to-merge-k-sorted-arrays-c35d87aa298e).

<br>
<br>