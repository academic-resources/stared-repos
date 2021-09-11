"""Each ListNode holds a reference to its previous node
as well as its next node in the List."""
class ListNode:
  def __init__(self, value, prev=None, next=None):
    self.value = value
    self.prev = prev
    self.next = next

  def __repr__(self):
    return "Value: {}, ".format(self.value if self.value else None) + "Prev: {}, ".format(self.prev.value if self.prev else None) + "Next: {} \n".format(self.next.value if self.next else None)

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

  """Replaces the head of the list with a new value that is passed in."""
  def add_to_head(self, value):
    new_node = ListNode(value)
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

  """Replaces the tail of the list with a new value that is passed in."""
  def remove_from_head(self):
    # if there is no head, just return None because we can't remove
    if not self.head:
        return None
    # reduce the length
    self.length -= 1
    # we need to store the current head to return it once removed
    current_head = self.head

    # if there is solely one node, we set both head and tail to None
    if self.head == self.tail:
        self.head = None
        self.tail = None
        return current_head.value
    # changes the head to the next node
    else:
        self.head = self.head.next
        # Removes pointers to any previous node
        self.head.prev = None
        return current_head.value


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

  """Removes the tail node and returns the value stored in it"""
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

  """Takes a reference to a node in the list and moves it to the front of the list, shifting all other list nodes down."""
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
    
  """Returns the maximum value in the list."""
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

ll = DoublyLinkedList()
print(f"ll: {ll}") # should be empty
ll.add_to_head(2) # should be 2
ll.add_to_head(5) # should be 5,2
ll.add_to_head(7) # should be 7,5,2
ll.remove_from_head() # should be 5,2

ll.add_to_tail(9) # should be 5,2,9
ll.add_to_tail(11) # should be 5,2,9,11
ll.add_to_tail(13) # should be 5,2,9,11,13
ll.remove_from_tail() # should be 5,2,9,11

ll.get_max() # should return 11
print(f"ll: {ll}") # return length 4, head: 5, tail: 11
