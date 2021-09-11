"""
Node class to keep track of
the data internal to individual nodes
"""
class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

"""
A tree class to keep track of things like the
balance factor and the rebalancing logic
"""
class AVLTree:
    def __init__(self, node=None):
        self.node = node
        # init height to -1 because of 0-indexing
        self.height = -1
        self.balance = 0

    """
    Display the whole tree. Uses recursive def.
    """
    def display(self, level=0, pref=''):
        self.update_height()  # Update height before balancing
        self.update_balance()

        if self.node != None: 
            print ('-' * level * 2, pref, self.node.key,
                   f'[{self.height}:{self.balance}]',
                   'L' if self.height == 0 else ' ')
            if self.node.left != None:
                self.node.left.display(level + 1, '<')
            if self.node.right != None:
                self.node.right.display(level + 1, '>')

    """
    Computes the maximum number of levels there are
    in the tree
    """
    def update_height(self):
        node_left, node_right = self.node.left, self.node.right
        height_left, height_right = 0, 0

        # recursive run if left node exists
        if node_left:
            node_left.update_height()
            height_left = node_left.height

        # recursive run if right node exists
        if node_right:
            node_right.update_height()
            height_right = node_right.height
        # make height left height if left > right

        if height_left > height_right:
            self.height = height_left + 1
        # make height right height if left < right
        else:
            self.height = height_right + 1

        # returns maximum number of levels in the tree
        return self.height

    """
    Updates the balance factor on the AVLTree class
    """
    def update_balance(self):
        if self.node is not None:
            node_left, node_right = self.node.left, self.node.right
            height_left, height_right = 0, 0

            # recursive run if left node exists
            if node_left:
                node_left.update_balance()
                height_left = node_left.height

            # recursive run if right node exists
            if node_right:
                node_right.update_balance()
                height_right = node_right.height

            # get height difference into balance & return difference
            self.balance = height_left - height_right
            return self.balance


    """
    Perform a left rotation, making the right child of this
    node the parent and making the old parent the left child
    of the new parent. 
    """
    def left_rotate(self):
        # making the right child of this node the parent
        child_right = self.node.right
        self.node.right = None
        # making the old parent the left child of the new parent
        child_right.node.left = self


    """
    Perform a right rotation, making the left child of this
    node the parent and making the old parent the right child
    of the new parent. 
    """
    def right_rotate(self):
        # making the left child of this node the parent
        node_child = self.node.left
        self.node.left = None
        # making the old parent the right child of the new parent
        node_child.node.right = self


    """
    Sets in motion the rebalancing logic to ensure the
    tree is balanced such that the balance factor is
    1 or -1
    """
    def rebalance(self):
        if self.balance > 1:

            # if balance > 1 & right balance > 0, rotate left
            if self.node.right.balance > 0:
                self.left_rotate()
            # if balance <= 0 and right balance is negative, rotate right and recursively run
            else:
                self.node.right.right_rotate()
                self.rebalance()
    
        elif self.balance < -1:

            # if balance is -2+ & left balance > 0, rotate right
            if self.node.left.balance > 0:
                self.right_rotate()
            # if balance is -2+ & left balance is negative, rotate left and recursively run
            else:
                self.node.left.left_rotate()
                self.rebalance()
        
    """
    Uses the same insertion logic as a binary search tree
    after the value is inserted, we need to check to see
    if we need to rebalance
    """
    def insert(self, key):
        # if node isn't empty
        if self.node is not None:
            # if current key > current node key
            if key < self.node.key:

                # AND if left node exists, insert:
                if self.node.left:
                    self.node.left.insert(key)
                # AND if left node does NOT exist:
                else:
                    # set key node as left node
                    self.node.left = AVLTree(Node(key))

            # if current key < current node key
            else:

                # AND if right node exists, insert:
                if self.node.right:
                    self.node.right.insert(key)
                # AND if right node does NOT exist:
                else:
                    # set key node as right node
                    self.node.right = AVLTree(Node(key))

        # if node is empty, set key node as node
        else:
            self.node = Node(key)

        # update balance
        self.update_balance()

        # check for rebalancing if absolute value of balance > 1:
        if abs(self.balance) > 1:
            self.rebalance()
    
    def checkHeight(self, root_node):
        if not root_node:
            return 0
        return root_node.height
