import sys
sys.path.append('../queue_and_stack')
from dll_queue import Queue
from dll_stack import Stack

"""
Binary search trees are a data structure that enforce an ordering over the data they store. That ordering in turn makes it a lot more efficient at searching for a particular piece of data in the tree. 

This part of the project comprises two days:
1. [X] Implement the methods `insert`, `contains`, `get_max`, and `for_each` on the BSTNode class.
2. Implement the `in_order_print`, `bft_print`, and `dft_print` methods on the BSTNode class.
"""
class BinarySearchTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

    # Insert the given value into the tree
    def insert(self, value):
        
        # if value is less than current value, go left
        if value < self.value:
               
            if not self.left:
                self.left = BinarySearchTree(value)
            else:
                self.left.insert(value)
        # if value is greater than/equal to current value, go right
        elif value >= self.value:

            if not self.right:
                self.right = BinarySearchTree(value)
            else:
                self.right.insert(value)


    # Return True if the tree contains the value
    # False if it does not
    def contains(self, target):
        # if node value is target, return true
        if self.value == target:
            return True
        # if binary trees are empty, return false 
        elif self.left is None and self.right is None:
            return False
        # if left exists and target less than current node value, check left
        elif self.left and target < self.value:
            return self.left.contains(target)
        # if right exists and target greater than current node value, check right
        elif target > self.value and self.right:
            return self.right.contains(target)


    # Return the maximum value found in the tree
    def get_max(self):
        # if right exists, check right 
        if self.right:
            return self.right.get_max()
        # else it's in left and return node value
        else:
            return self.value


    # Call the function `cb` on the value of each node
    # You may use a recursive or iterative approach
    def for_each(self, cb):
        # callback function on node value  
        cb(self.value)

        # if left tree exists, run callback function on each node
        if self.left:
            self.left.for_each(cb)

        # if right tree exists, run callback function on each node
        if self.right:
            self.right.for_each(cb)



    # DAY 2 Project -----------------------

    # Print all the values in order from low to high
    # Hint:  Use a recursive, depth first traversal

    def in_order_print(self, node):
        # if left tree exists, recursively run this function to print its node values
        if self.left:
            self.left.in_order_print(node)
        print(self.value)
        # if right tree exists, recursively run this function to print its node values
        if self.right:
            self.right.in_order_print(node)


    # Print the value of every node, starting with the given node in an iterative breadth first traversal

    def bft_print(self, node):
        # get current queue 
        current_queue = Queue()
        # add node to current queue
        current_queue.enqueue(node)
        # if current queue is not empty
        while current_queue.len() > 0:
            # set current as next queue
            next_queue = Queue()
            while current_queue.len() > 0:
                # dequeue current node and save it 
                current_node = current_queue.dequeue()
                # if left tree exists on current node, add to left 
                if current_node.left:
                    next_queue.enqueue(current_node.left)
                # if right tree exists on current node, add to right
                if current_node.right:
                    next_queue.enqueue(current_node.right)
                # print current node value
                print(current_node.value)
            # set next queue as current queue
            current_queue = next_queue


    # Print the value of every node, starting with the given node in an iterative depth first traversal

    def dft_print(self, node):
        # set stack as current stack 
        current_stack = Stack()
        # add node to current stack 
        current_stack.push(node)
        # while current stack is NOT empty
        while current_stack.len() > 0:
            # remove entry from stack and save in current_node
            current_node = current_stack.pop()
            # print value of current_node
            print(current_node.value)
            # if current node's left tree exists, add to it
            if current_node.left:
                current_stack.push(current_node.left)
            # if current node's right tree exists, add to it
            if current_node.right:
                current_stack.push(current_node.right)


    # STRETCH Goals -------------------------
    # Note: Research may be required


    # Print Pre-order recursive DFT

    def pre_order_dft(self, node):
        # print node value 
        print(node.value)
        # if left tree of node exists, run again on it
        if node.left:
            self.pre_order_dft(node.left)
        # if right tree of node exists, run again on it
        if node.right:
            self.pre_order_dft(node.right)


    # Print Post-order recursive DFT

    def post_order_dft(self, node):
        # if left tree of node exists, run again on it
        if node.left:
            self.post_order_dft(node.left)
        # if right tree of node exists, run again on it
        if node.right:
            self.post_order_dft(node.right)
        # print node value
        print(node.value)
