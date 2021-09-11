# Linked List

* Overview
  * Advantages Over Array
  * Drawbacks Over Array
* Applications
* Common Operations
* Design & Implementation
  * Sentinels `nil`

## Overview

![](2021-07-10-11-39-29.png)

A *Linked List* is a data structure in which the objects are arranged in a linear order. Unlike an array, however, in which the linear order is determined by the array indices, **the order in a linked list is determined by a pointer in each object** and **elements are not stored at contiguous memory locations**.

A list may have one of several forms.

* Singly Linked
* Doubly Linked
* Sorted
* Circular.

### Advantages Over Arrays

1. **Dynamic size**. The size of the Arrays if fixed; so we must know the upper limit on the number of elements in advance. Also, generally, Array's allocated memory is equal to the upper limit irrespective of the usage.

2. **Easy of insertion/deletion**. Inserting a new element in an Array of elements is expensive because the room has to be created for the new elements and to create room existing elements have to be shifted. Deletion is also expensive with Arrays unless some special techniques are used because it also involves shifting elements.

### Drawbacks Over Arrays

1. **Random access is not allowed**. We have to access elements sequentially starting from the first node (e.g., we cannot do *binary searchs* efficiently with its default implementation).

2. **Extra memory space for a pointer** is required with each element of the list.

3. **Not cache friendly**. Since array elements are contiguous locations, there is locality of reference which is not there in case of linked lists.

## Common Operations

* Search(value)
* Insert(value)
* Delete(value)

```
LIST-SEARCH(L, k)
  x = L.head
  while x != NIL and x.key != k
    x = x.next
  return x

LIST-INSERT(L, x) // circular, insert at front
  x.next = L.head
  if L.head != NIL
    L.head.prev = x
  L.head = x
  x.prev = NIL

LIST-DELETE(L, x) // doubly linked
  if x.prev != NIL
    x.prev.next = x.next
  else L.head = x.next
  if x.next != NIL
    x.next.prev = x.prev

CIRUCLAR-LIST-DELETE(L, x):
  x.prev.next = x.next
  x.next.prev = x.prev
```

## Design & Implementation

### Sentinels

A __sentinel__ is a dummy object that allows us to simplify boundary conditions. For example, suppose that we provide with list L an object `L.nil` that represents NIL but has all the attributes of the other objects in the list. Wherever we have a reference to NIL in list code, we replace it by a reference to the snetinel L.nil.

The attribute `L.nil.next` points to the head of the list, and `L.nil.prev` points to the tail. Similarly, both the `next` attriute of the tail, and `prev` attribute of the head point to `L.nil`. Since `L.nil.next` points to the head, we can eliminate the attrivute `L.head` altogether, replacing references to it by references to `L.nil.next`.

```
LIST-SEARCH(L,k)
  x = L.nil.next
  while x != L.nil and x.key !=k
    x = x.next
  return x

LIST-INSERT(L,x)
  x.next = L.nil.next
  L.nil.next.prev = x
  L.nil.next = x
  x.prev = L.nil
```
