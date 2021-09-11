from timeit import default_timer as timer
import random

from arrays import (array,
                    array_append,
                    array_insert,
                    array_pop,
                    array_print,
                    array_read,
                    array_remove)

from doubly_linked_list import (DoublyLinkedList, ListNode)


def add_n_elements(n):
    # Don't time initialization
    big_arr = array(n)
    small_arr = array(1)
    node = ListNode(1)
    dll = DoublyLinkedList(node)

    # Array size N
    start = timer()
    for i in range(n):
        array_append(big_arr, "value")

    time = timer() - start
    print("Size N Array: Appended " + str(n) + " elements in " + str(time))

    # Array size 1 (To start)
    start = timer()
    for i in range(n):
        array_append(small_arr, "value")

    time = timer() - start
    print("Size 1 Array: Appended " + str(n) + " elements in " + str(time))

    # Linked List - Head
    start = timer()
    for i in range(n):
        dll.add_to_head("value")

    time = timer() - start
    print("Linked Head: Added " + str(n) + " elements in " + str(time))

    # Linked List - Tail
    start = timer()
    for i in range(n):
        dll.add_to_tail("value")

    time = timer() - start
    print("Linked Tail: Added " + str(n) + " elements in " + str(time))


def add_n_elements_delete_half_random(n):
    # Don't time initialization
    big_arr = array(n)
    small_arr = array(1)
    node = ListNode(1)
    dll = DoublyLinkedList(node)

    # Experiment with this.
    # How does higher or lower change things?
    divisor = 10

    # Array size N
    start = timer()
    for i in range(n):
        array_append(big_arr, random.randrange(n / divisor))

    for i in range(int(n / 2)):
        array_remove(big_arr, random.randrange(n / divisor))

    time = timer() - start
    print("Size N Array: Appended " + str(n) + " elements and removed half in "
          + str(time))

    # Array size 1 (To start)
    start = timer()
    for i in range(n):
        array_append(small_arr, random.randrange(int(n / divisor)))

    for i in range(int(n / 2)):
        array_remove(small_arr, random.randrange(int(n / divisor)))

    time = timer() - start
    print("Size 1 Array: Appended " + str(n) + " elements and removed half in "
          + str(time))

    # Linked List - Head
    start = timer()
    for i in range(n):
        dll.add_to_head(random.randrange(int(n / divisor)))

    for i in range(int(n / 2)):
        dll.find_and_delete(random.randrange(int(n / divisor)))

    time = timer() - start
    print("Linked Head: Added " + str(n) + " elements and removed half in "
          + str(time))

    # Linked List - Tail
    start = timer()
    for i in range(n):
        dll.add_to_tail(random.randrange(int(n / divisor)))

    for i in range(int(n / 2)):
        dll.find_and_delete(random.randrange(int(n / divisor)))

    time = timer() - start
    print("Linked Tail: Added " + str(n) + " elements and removed half in "
          + str(time))


# add_n_elements(1000000)
add_n_elements_delete_half_random(40000)  # Keep this under 50k
