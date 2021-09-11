# Lecture II: Linked Lists  

a. [Nodes](#Nodes)  
b. [Doubly Linked List](#Doubly-Linked-List)   
c. [Build a Doubly Linked List](#Build-a-Doubly-Linked-List)   
d. [Add and Remove Tail](#Add-and-Remove-Tail)   
e. [Move to Head or Tail](#Move-to-Head-or-Tail)   
f. [Delete a Node](#Delete-a-Node)   
g. [Get Max](#Get-Max)     

<br>

[CS18 Sean Chen Lecture](https://youtu.be/l5jfEmBnAqg)  

[CS19 Brian Doyle Lecture](https://youtu.be/YV8H5vevKGU)   

<br>
<br>

## Nodes

A node is a bucket structure with two components (or three in a doubly linked list). The data being stored, a pointer to the next node, and possibly a pointer to the previous node.

We could imagine it like this:

```
|          |          |          |          
| Previous |   DATA   |   Next   |
|__________|__________|__________|
```

The benefit of nodes is that it allows us to dynamically utilize memory.

<br>
<br>


## Doubly Linked List

A doubly linked list has pointers to both the next and previous node (hence, doubly linked).

In our [project repo](https://github.com/LambdaSchool/data-structures) there is a doubly linked list file (copied into [this file](dll.py)). It has this code setting up listNode instances:

<br>

```
"""Each ListNode holds a reference to its previous node
as well as its next node in the List."""
class ListNode:
  def __init__(self, value, prev=None, next=None):
    self.value = value
    self.prev = prev
    self.next = next

  """Wrap the given value in a ListNode and insert it
  after this node. Note that this node could already
  have a next node it is pointing to."""
  def insert_after(self, value):
    current_next = self.next
    self.next = ListNode(value, self, current_next)
    if current_next:
      current_next.prev = self.next

  """Wrap the given value in a ListNode and insert it
  before this node. Note that this node could already
  have a previous node it is pointing to."""
  def insert_before(self, value):
    current_prev = self.prev
    self.prev = ListNode(value, current_prev, self)
    if current_prev:
      current_prev.next = self.prev

  """Rearranges this ListNode's previous and next pointers
  accordingly, effectively deleting this ListNode."""
  def delete(self):
    if self.prev:
      self.prev.next = self.next
    if self.next:
      self.next.prev = self.prev
```

<br>

It sets up nodes that keep track of the next _and_ previous nodes, and also provides an `insert_after`, `insert_before`, and `delete` function.

To make it a little easier to see what's happening under the hood when we call a listNode, we can add this `__repr__` method to show the value, previous and next references.

<br>

```
  def __repr__(self):
    return "Value: {}, ".format(self.value if self.value else None) + "Prev: {}, ".format(self.prev.value if self.prev else None) + "Next: {} \n".format(self.next.value if self.next else None)
```

<br>

If we run: 

> print(ListNode(5))  

We'll receive in the terminal: 

> Value: 5, Prev: None, Next: None  

This shows that an initialized ListNode without a specified previous or next reference will point to `None`.

<br>
<br>


## Build a Doubly Linked List

Let's start building methods on our base code:

<br>

```
"""Our doubly-linked list class. It holds references to
the list's head and tail nodes."""
class DoublyLinkedList:
  def __init__(self, node=None):
    self.head = node
    self.tail = node
    self.length = 1 if node is not None else 0
  
  def __repr__(self):
    return f"Head: {self.head} \n Tail: {self.tail} \n Length: {self.length}"

  def __len__(self):
    return self.length
```

<br>

We should define an `add_to_head` method:

<br>

```
  """Replaces the head of the list with a new value that is passed in."""
  def add_to_head(self, value):
```

<br>


We know that we need to create a new node and increase the length of the list:

<br>

```
  """Replaces the head of the list with a new value that is passed in."""
  def add_to_head(self, value):
      new_node = ListNode(value, prev=None, next=None)
      self.length += 1
      # if there is no head or tail, it needs to become both:
      if not self.head and not self.tail:
          self.head = new_node
          self.tail = new_node
     # otherwise it only needs to become the head:
     else:
         self.head.prev = new_node
         new_node.next = self.head
         self.head = new_node
```

<br>

Another solution is that we could also check using length:

<br>

```
    if self.length == 0:
      self.head = ListNode(value, None, None)
      self.tail = self.head
      self.length = 1
    else:
      self.head.prev = ListNode(value, None, self.head)
      self.head = self.head.prev
      self.length += 1
```

<br>

Let's work on the `remove` function next. This should return the removed node:

<br>

```
  """Replaces the tail of the list with a new value that is passed in."""
  def remove_from_head(self):
    # if there is no head, just return None because we can't remove
    if not self.head:
        return None
    # reduce the length
    self.length -= 1
```

<br>

Now we could check the length of the list but maintaining consistency is ideal. Since we compared the head and tail previously, we should continue using that method. If we went with the length comparison method, we would decrement _after_ and continue to use that comparison instead.

So, if the head and tail match, we know that there is only one node:

<br>

```
    # we need to store the current head to return it once removed
    current_head = self.head

    # if there is solely one node, we set both head and tail to None
    if self.head == self.tail:
        self.head = None
        self.tail = None
        return current_head.value
```

<br>

We need to finish by handling the last case, which is if there are other nodes in the list. We'll set the next node as the head and remove the pointer to the previous.

<br>

```
    # changes the head to the next node
    else:
        self.head = self.head.next
        # Removes pointers to any previous node
        self.head.prev = None
        return current_head.value
```

<br>
<br>

## Add and Remove Tail

To add to the tail, we'll write a method almost identical to the add to head method:

<br>

```
  """Removes the head node and returns the value stored in it."""
  def add_to_tail(self, value):
      new_node = ListNode(value)
      self.length += 1
      # if there is no head or tail, it needs to become both:
      if not self.head and not self.tail:
          self.head = new_node
          self.tail = new_node
     # otherwise it only needs to become the tail:
     else:
         self.tail.next = new_node
         new_node.prev = self.tail
         self.tail = new_node
```

<br>

We should test these methods after writing them. We could use the unit tests in the test file. Or we could write our own within our current file to see if it returns the expected.

<br>

```
ll = DoublyLinkedList()
print(f"ll: {ll}") # should be empty
ll.add_to_head(2) # should be 2
ll.add_to_head(5) # should be 5,2
ll.add_to_head(7) # should be 7,5,2
ll.remove_from_head() # should be 5,2
ll.add_to_tail(9) # should be 5,2,9
print(f"ll: {ll}")
```

<br>

This should return the final print statement as:

<br>

```
ll: Head: Value: 5, Prev: None, Next: 2 
 
Tail: Value: 9, Prev: 2, Next: None 
 
Length: 3
```

<br>

Now let's write our `remove_from_tail`. Again, it's very similar to the `remove_from_head` method with a few syntax adjustments and changing references to next node (which should be None at the tail).

<br>

```
  def remove_from_tail(self):
    # if there is no tail, just return None because we can't remove
    if not self.tail:
        return None
    # reduce the length
    self.length -= 1
    # we need to store the current tail to return it once removed
    current_tail = self.tail

    # if there is solely one node, we set both head and tail to None
    if self.head == self.tail:
        self.head = None
        self.tail = None
        return current_tail.value
    # changes the tail to the next node
    else:
        self.tail = self.tail.prev
        # Removes pointers to any next node
        self.tail.next = None
        return current_tail.value
```

<br>
<br>

## Move to Head or Tail

Let's write this next set of methods.

```
  """Takes a reference to a node in the list and moves it to the front of the list, shifting all other list nodes down."""
  def move_to_front(self, node):
    pass

  """Takes a reference to a node in the list and moves it to the end of the list, shifting all other list nodes up."""
  def move_to_end(self, node):
    pass
```

Off the bat, one thing we might want to do is change the name of these functions to more clearly indicate what these functions do -- like `move_to_head` or `move_to_tail`. We'll also need to adjust those names in our test files to avoid errors.

Since we're passed in a node, we don't need to create a node because it already exists.

<br>

```
  def move_to_head(self, node):
    # if the passed node is already the head, we just return it
    if node is self.head:
        return node
    # if the passed node is the tail, we need to remove it from the tail
    if node is self.tail:
        self.remove_from_tail()
    else:
        node.delete()
        self.length -=1
    # we should add it but only the value of the passed node
    self.add_to_head(node.value)
```

<br>

We want to make sure that we use `is` instead of `==` when comparing the node to the head or tail because we are not just comparing the values but checking if they are truly the _same_ values (with the same reference to space in memory).

Why are we reducing the length when we're only moving around a node, not removing it?

The add methods we're calling will automatically adjust the length to add the value, so we need to decrement it first. We are _technically_ deleting the node and then adding it again.

We could alternately just change the pointer references, rather than deleting and adding the node. It would be more memory efficient -- but we evaluate this based on the situation. By reusing already written code, we're also being efficient, and unless we need the improved space complexity at scale, it's not necessary to write longer functions to do this process.

A best practice would be to leave a comment in the function about how we could optimize this in the future, so that it would be easy to identify how to improve the space complexity IF it matters.

Let's do the same with `move_to_tail`:

<br>

```
  """Takes a reference to a node in the list and moves it to the end of the list, shifting all other list nodes up."""
  def move_to_tail(self, node):
    if node is self.tail:
        return node
    if node is self.head:
        self.remove_from_head()
    else:
        node.delete()
        self.length -=1

    self.add_to_tail(node.value)
```

<br>
<br>

## Delete a Node

Why do we need to write another delete function when we already have one?

This allows us to handle the edge cases of if it's the head or tail node.

We could handle if there's only one node in the list like so:


<br>

```
    if self.head is self.tail:
        self.head = None
        self.tail = None
```

<br>

But we also already wrote that edge case into our `remove_from_head` function so instead, let's let it be handled that way:

<br>

```
  """Takes a reference to a node in the list and removes it from the list. The deleted node's `previous` and `next` pointers should point to each afterwards."""
  def delete(self, node):
    if self.head is self.tail:
        self.remove_from_head()
    elif node is self.head:
        self.remove_from_head()
    elif node is self.tail:
        self.remove_from_tail()
    else:
        node.delete()
        return node.value    
```

<br>

We don't need to manually decrement the length because all of our previously written functions handle that for us.

<br>
<br>

## Get Max

We know off the bat that when we try to get the maximum value from a linked list, but the list has no items, then that edge case is simple to handle -- we'll return None.

Next we'll iterate through the values of the linked list, starting at the head, to compare to the current maximum value found. Once we read the end of the list, we'll have checked each value and found the maximum.

<br>

```
  def get_max(self):
    # if there is no head, we know the list is empty
    if not self.head:
        return None
    
    # we'll set our starting max value as the first value we'll begin looping through in the list, the head
    max_value = self.head.value
    # we'll set a current value to check against
    current = self.head
    while current:
        if current.value > max_value:
            max_value = current.value
        # increment current
        current = current.next
    # once all values are checked, return max value
    return max_value
```

<br>
<br>
