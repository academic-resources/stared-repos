class Heap:
    def __init__(self, comparator=lambda a, b: a > b):
        self.storage = []
        self.comparator = comparator

    # insert a node 
    def insert(self, x):
        # get length of storage array 
        length = len(self.storage)
        # add value to end of array 
        self.storage.append(x)
        # bubble it up appropriately 
        self._bubble_up(length)

    # delete last node  
    def delete(self):
        # if storage empty return none 
        if len(self.storage) == 0:
            return None
        # save max node value
        max_node_value = self.storage[0]
        # set max node as last node 
        self.storage[0] = self.storage[-1]
        # delete last node 
        del self.storage[-1]
        # shift down as appropriate 
        self._sift_down(0)
        # return original max node value 
        return max_node_value

    # return max node unless empty 
    def get_priority(self):
        # if storage empty return none
        if len(self.storage) == 0:
            return None
        # else return max node 
        return self.storage[0]

    # return size of storage array 
    def get_size(self):
        return len(self.storage)

    # shift node up as appropriate 
    def _bubble_up(self, index):
        
         # if node is first (0), return none 
        if index == 0:
            return None

        # if node is second+ (1+), do the following
        while index:
            # save parent 
            p = parent(index)         
            current_index_value, current_parent_value = self.storage[index], self.storage[p]

            # if current value is greater than parent, swap
            if self.comparator(current_index_value, current_parent_value):
                # assign current value to new parent and parent value to current index
                np, self.storage[index] = current_index_value, current_parent_value
                # set parent value as new parent 
                self.storage[p] = np
                # set index to parent index 
                index = p
            # if complete
            else:
                index = None

    # shift node down as appropriate 
    def _sift_down(self, index):
         # if submitted index does NOT exist, return none 
        if index >= len(self.storage):
            return None
        # condition within loop to exit 
        while True:

            # get right child index & value if exist; else set as none
            index_child_right = right_child(index)
            value_child_right = self.storage[index_child_right] if index_child_right < len(self.storage) else None

            # get left child index & value if exist; else set as none 
            index_child_left = left_child(index)
            value_child_left = self.storage[index_child_left] if index_child_left < len(self.storage) else None

            # compare to each other
            max_value_index = None
            max_value = None

            # if right value and left value empty, break loop 
            if value_child_right is None and value_child_left is None:
                break
            # if only right child empty, use left 
            elif value_child_right is None:
                max_value_index = index_child_left
                max_value = value_child_left
            # if only left child empty, use right 
            elif value_child_left is None:
                max_value_index = index_child_right
                max_value = value_child_right
            # if both are NOT empty, do this stuff
            else:
                # set max value & its index; use right if right is greater; else use left 
                max_value_index = index_child_right if self.comparator(value_child_right, value_child_left) else index_child_left
                max_value = value_child_right if self.comparator(value_child_right, value_child_left) else value_child_left

            current_value = self.storage[index]

            # if max value > current value, swap
            if self.comparator(max_value, current_value):
                # swap values
                self.storage[max_value_index], self.storage[index] = current_value, max_value
                # set index as max value's index 
                index = max_value_index

            # if no swaps, exit loop 
            else:
                break

# (left 2x+1 | right 2x+2) minus one for index number
# get index of left child node
def left_child(current_node):
    return 2*current_node+1

# (left 2x+1 | right 2x+2) minus one for index number
# get index of right child node
def right_child(current_node):
    return 2*current_node+2

# get index of parent node
def parent(current_node):
    return (current_node-1)//2
