"""Each ListNode holds a reference to its previous node
as well as its next node in the List."""
class ListNode:
    def __init__(self, value, prev=None, next=None):
        self.value = value
        self.prev = prev
        self.next = next

    """Wrap the given value in a ListNode and insert it
    after this node. Note that this node could already
    have a next node it is point to."""
    def insert_after(self, value):
        current_next = self.next
        self.next = ListNode(value, self, current_next)
        if current_next:
            current_next.prev = self.next

    """Wrap the given value in a ListNode and insert it
    before this node. Note that this node could already
    have a previous node it is point to."""
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

# Our doubly-linked list class
class DoublyLinkedList:
    def __init__(self, node=None):
        # holds references to the list's head and tail nodes
        self.head = node
        self.tail = node
        self.length = 1 if node is not None else 0


    def __len__(self):
        return self.length


    def add_to_head(self, value):
        # Wraps the given value in a ListNode
        dll_node_new = ListNode(value)
        self.length += 1

        # inserts it as the new head of the list
        if not self.head and not self.tail:
            # make it head and tail
            self.head = dll_node_new
            self.tail = dll_node_new
        # handle the old head node's previous pointer accordingly
        else:
            # assign head to new next variable
            dll_node_new.next = self.head
            # make prev head new next var
            self.head.prev = dll_node_new
            # make head new next var
            self.head = dll_node_new


    def remove_from_head(self):
        head_value = self.head.value
        # Removes the List's current head node, making the current head's next node the new head of the List
        self.delete(self.head)
        
        # Returns the value of the removed Node
        return head_value


    def add_to_tail(self, value):
        # Wraps the given value in a ListNode
        dll_node_new = ListNode(value)
        self.length += 1
        # inserts it as the new tail of the list
        if not self.head and not self.tail:
            # make it head and tail
            self.head = dll_node_new
            self.tail = dll_node_new
        # handle the old tail node's next pointer accordingly
        else:
            # assign tail to new next variable
            dll_node_new.prev = self.tail
            # make next tail new next var
            self.tail.next = dll_node_new
            # make tail new next var
            self.tail = dll_node_new

    def remove_from_tail(self):
        current_tail = self.tail.value
        # Removes the List's current tail node, making the current tail's previous node the new tail of the List
        self.delete(self.tail)

        # Returns the value of the removed Node
        return current_tail


    def move_to_front(self, node):
        # if already head do nothing 
        if node == self.head:
            return
            
        node_value = node.value

        # Removes the input node from its current spot in the List
        # if node is tail
        if node == self.tail:
            self.remove_from_tail()
        else:
            node.delete()
            self.length -= 1

        # inserts it as the new head node of the List
        self.add_to_head(node_value)


    def move_to_end(self, node):
        # if node is tail do nothing 
        if node == self.tail:
            return
            
        node_value = node.value

        # Removes the input node from its current spot in the List
        # if node is head 
        if node == self.head:
            self.remove_from_head()
        else:
            node.delete()
            self.length -= 1

        # inserts it as the new tail node of the List
        self.add_to_tail(node_value)


    def delete(self, node):
        self.length -= 1

        # if neither head nor tail do nothing 
        if not self.head and not self.tail:
            return

        # Removes a node from the list
        # handles cases where the node was the head or the tail
        # if node = tail set to nothing (empty)
        if self.head == self.tail:
            self.head = None
            self.tail = None
        # if head = node, set head to next node, then delete node
        elif self.head == node:
            self.head = node.next
            node.delete()
        # if tail = node, set tail to previous node, then delete node
        elif self.tail == node:
            self.tail = node.prev
            node.delete()
        else:
            node.delete()
        

    def get_max(self):
        # if no head  
        if not self.head:
            return None
        
        # save value of head and current head into a variable
        head_value = self.head.value
        current_head = self.head

        # Returns the highest value currently in the list
        while current_head:
            # if current head value > saved head value 
            if current_head.value > head_value:
                # save current head value as head value
                head_value = current_head.value
            # save next head as current head and loop 
            current_head = current_head.next

        return head_value

    def find(self, value):
        # get head as curernt node 
        current_node = self.head
        # if current node (head) is value return curernt node 
        if current_node.value == value:
            return current_node
        # if tail not current node get next
        while self.tail is not current_node:
            current_node = current_node.next
            # return current node if matches
            if current_node.value == value:
                return current_node
        # else return none 
        return None
