from doubly_linked_list import DoublyLinkedList 

class TextBuffer:
    # init gives us the option to initialize some text in the
    # buffer right off the bat 
    def __init__(self, init=None):
        self.contents = DoublyLinkedList()
        # check if an init string is provided
        # if so, put the contents of the init string in self.contents
        if init:
            self.append(init)

    def __str__(self):
        # needs to return a string to print 
        s = ""
        current = self.contents.head
        while current:
            s += current.value
            current = current.next
        return s

    def append(self, string_to_add):
        for character in string_to_add:
            self.contents.add_to_tail(character)
    
    def prepend(self, string_to_add):
        # reverse the incoming string to maintain correct 
        # order when adding to the front of the text buffer 
        for character in reversed(string_to_add):
            self.contents.add_to_head(character)

    def delete_front(self, chars_to_remove):
        for i in range(0, chars_to_remove):
            self.contents.remove_from_head()

    def delete_back(self, chars_to_remove):
        for i in range(0, chars_to_remove):
            self.contents.remove_from_tail()

    """
    Join other_buffer to self
    The input buffer gets concatenated to the end of this buffer 
    The tail of the concatenated buffer will be the tail of the other buffer 
    The head of the concatenated buffer will be the head of this buffer 
    """
    def join(self, other_buffer):  
        # we might want to check that other_buffer is indeed a text buffer
        if isinstance(other_buffer, TextBuffer):
            # check that the other_buffer contains content
            if(other_buffer.contents.length == 0):
                print("ERROR: Other buffer is empty!")
                return  
            # set self list tail's next node to be the head of the other buffer 
            self.contents.tail.next = other_buffer.contents.head
            # set other_buffer head's prev node to be the tail of this buffer
            other_buffer.contents.head.prev = self.contents.tail
            # now that both buffers are connected, we will set this buffer's tail to the other buffer's tail, to fully concatenate together
            self.contents.tail = other_buffer.contents.tail
            # make sure to fully extend the length to include the other buffer's length
            self.contents.length += other_buffer.contents.length
            
        else:
            print("ERROR: Argument is not a TextBuffer")
            return

        pass
        
    # if we get fed a string instead of a text buffer instance,
    # initialize a new text buffer with this string and then 
    # call the join method 
    def join_string(self, string_to_join):
        new_buffer = TextBuffer(string_to_join)
        self.join(new_buffer)

if __name__ == '__main__':
    text = TextBuffer("Super")
    print(text)

    text.join_string("califragilisticexpealidocious")
    print(text)

    text.append(" is ")
    text.join(TextBuffer("weird."))

    print(text)

    text.delete_back(6)
    print(text)

    text.prepend("Hey! ")
    print(text)

    text.delete_front(4)
    print(text)



class BinarySearchTreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
    
    def insert(self, value):
        if value < self.value:
            # go down the left side
            if not self.left:
                # if there is no more left values, place it there
                self.left = BinarySearchTreeNode(value)
            else:
                # continue searching down the left to find an open spot
                self.left.insert(value)
        else:
            # go down the right side
            if not self.right:
                # place the value node here
                self.right = BinarySearchTreeNode(value)
            else:
                # continue searching
                self.right.insert(value)


class Heap:
  def __init__(self, comparator):
    self.storage = []
    self.comparator = comparator

  def insert(self, value):
    pass

  def delete(self):
    pass

  def get_priority(self):
    pass

  def get_size(self):
    pass

  def _bubble_up(self, index):
    # until we hit the base case
    while index > 0:
        # compare to parent
        parent = (index-1) // 2 #divided by 2

        # if the parent is greater than...
        if self.storage[index] < self.storage[parent]:
            # swap them
            self.storage[index], self.storage[parent] = self.storage[parent], self.storage[index]
            index = parent
        else:
            # leave it where it is
            break

  def _sift_down(self, index):
    pass
