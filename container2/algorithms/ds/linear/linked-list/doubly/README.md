# Doubly Linked List

* Overview
  * Advantages
  * Disadvantages

## Overview

![](2021-07-10-12-28-10.png)

A *Doubly Linked List* contains an extra pointer, typically called *previous pointer*, toghether with the *next pointer* and data which are there in *Singly Linked List*.

### Advantanges

* Can be traversed in both forward and backward direction.

* **Delete is more efficient** if pointer to the node to be deleted is given. In a *Single Linked List*, you would need to get the pointer to the previous node, and sometimes that means traversing the list.

* **Can quickly insert a new node before a given node**.

### Disadvantages

* Every node requires **extra space for an previous pointer**.

* All **operations require an extra pointer** (*previous*) to be maintained.
