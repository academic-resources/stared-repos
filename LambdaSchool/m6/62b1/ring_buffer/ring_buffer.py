
# Rubric:
# 2:  Solution in ring_buffer.py runs, but may have one or two logical errors; passes at least 5/6 tests (Note that each function in the test file that begins with test is a test)
# 3:  Solution in ring_buffer.py has no syntax or logical errors and passes all tests (Note that each function in the test file that begins with test is a test)


# This data structure is very useful where you typically want to store information up until it reaches a certain age, after which you don't care about it anymore and don't mind seeing it overwritten by newer data.
# Implement this behavior in the RingBuffer class.
class RingBuffer:
    # A ring buffer is a non-growable buffer with a fixed size.
    def __init__(self, capacity):
        self.capacity = capacity
        self.current_node = 0
        self.buffer = [None]*capacity
        self.buffer_length = 0

    # RingBuffer has two methods, `append` and `get`.

    # The `append` method adds the given element to the buffer.
    # When the ring buffer is full and a new element is inserted, the oldest element in the ring buffer is overwritten with the newest element.
    def append(self, item):
        # set current node's value as item 
        self.buffer[self.current_node] = item
        # add 1 to current node
        self.current_node += 1
        # set next node value as current node value 
        self.current_node = self.current_node % self.capacity
        # if buffer length less than buffer capacity, add one to length 
        if self.capacity > self.buffer_length:
            self.buffer_length += 1


    # The `get` method returns all of the elements in the buffer in a list in their given order.
    # It should not return any `None` values in the list even if they are present in the ring buffer.
    def get(self):
        return self.buffer[:self.buffer_length]
