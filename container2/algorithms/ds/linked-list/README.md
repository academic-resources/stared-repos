# Linked List

A Linked List is a data structure in which the objects are arranged in a linear order. Unlike an array, however, in which the linear order is determined by the array indices, the order in a linked list is determined by a pointer in each object.

Each element of a __doubly linked list__ is an object with an attribute _key_ and two other pointer attributes _next_ and _prev_.

A list may have one of several forms. It may be either singly linked or doubly linked, it may be sorted or not, and it may be circular or not.

## Algorithms

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

## Sentinels

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
