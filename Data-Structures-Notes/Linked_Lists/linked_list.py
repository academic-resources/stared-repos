class Node:
    def __init__(self, value=None, next_node=None):
        self.value = value
        self.next_node = next_node

    def get_value(self):
        return self.value

    def get_next(self):
        return self.next_node

    def set_next(self, new_next):
        self.next_node = new_next

    def set_value(self, value):
        self.value = value


class LinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

    def add_to_tail(self, value):
        # wrap the value in a node
        new_node = Node(value)

        # check if we're in an empty list state
        # can also write: if not self.head and not self.tail
        if self.head == None and self.tail == None:
            # set the list's head reference to point to new_node
            self.head = new_node
            # set the list's tail reference to point to new_node
            self.tail = new_node

        else:
            # update the old tail's next reference to refer to the new node
            self.tail.set_next(new_node)
            # update the linked list's 'tail' reference
            self.tail = new_node

    def remove_head(self):
        # what if our list is empty?
        if not self.head and not self.tail:
            return None
        # what if our list only contains a single node?
        if self.head is self.tail:
            old_head = self.head
            self.head = None
            self.tail = None
            return old_head.get_value()
        # Store reference to node being removed to return value
        old_head = self.head
        # update head reference to refer to the old head's next_node
        self.head = old_head.get_next()
        # return the old head's value
        return old_head.get_value()

    def contains(self, target):
        # what if our list is empty?
        if not self.head and not self.tail:
            return False
        # get the current reference that initially starts at the head of the list
        current = self.head
        # keep looping while curent is valid (not None)
        while current:
            # check if current.get_value() is the same as our target
            if current.get_value() == target:
                return True
            # otherwise, update current to the next node
            else:
                current = current.get_next()
        # otherwise we didn't find it in the linked list so return false
        return False
