# Data structures
# Some you know:
# [], {}, "", class

# How about an Abstract Data Type (ADT)?
# ADTs are more general than these other data types
# Consider the 'set'

# 'Set' is an ADT which is a collection of objects such that each object
# exists in the set or doesn't, and all are unique -- no duplicates
# Supports 3 operations (or abstract methods -- figurative):

# .include?
# .set or <<
# .delete

# Example:  
[3, "hello"]  # An Array can implement a set (satisfies criteria)

# Hash maps are also ADTs
{3=>true, "hello"=>true}  # Also implements a set (satisfies)
# map/dictioanry is just like this.  A hash map could do this.  Consider the
# abstract methods:
# .set(word,definition)
# .get(definition)
# .delete(k)

# Map/Dictionary could also be an array, although maybe not the best use
[["hello", "world"], [2,4]]

# hello=>world
# 2=>4


# SO! and ADT exists if the data structure matches the criteria of
# all unique values.
# Undestanding the ADT is important because it will let you know, given an
# algorithm, what data structure works BETTER for the ADT concept.


# Another lower level concept of ADT is 'the Stack'
# Think of a cafeteria with lunch trays.
# Basically, you can only take or replace a tray from the top.
# So stacks are not fair since the first data types in are the last our or
# First In Last Our 'FILO' a.k.a. 'LIFO'
# Almost always a stack is implemented with an Array
# To keep with this idea, a stack can only .push or .pop

# Interestingly enough, a 'Stack' is used in recursion.  Mentioned previously,
# Any algorithm you can do recursively, you can do iteratively.  So... even
# quicksort can be written iteratively (but you'd have to manage the stack
# yourself).  It would be more efficient, but would be difficult and inelegant
# to write.



# Opposite of a stack is a 'Queue'
# Think of a line at a pharmacy.  There is a line, and the way people leave 
# is at the front and they join at the back end.

# so a 'queue' as basically two abstract methods:
# .dequeue (exit at the front)
# .enqueue (join at the back)
#   enqueue ->->->->->->->->-> dequeue
#           FIFO
# a queue is considered fair - First In First Out

# In regauards to a 'queue', it can be implemented with an array, but
# it would be known as (push/unshift, shift/pop), 
# but specifically enqueue, dequeue



# Another common ADT is a 'Tree'
# One used often is a Binary Tree:
#          O  <-- a node (or vertice)
#         / \
#       O     O 
#      / \   /
#     O   O O
# Every node(parent) on a 'Binary' tree will have at most 2 children
# In a 'Ternary' Tree
#          O  <-- a node
#        / | \
#       O  O  O 
#     / | \ \ |\
#    O  O  O OO O 
# a node would have at the Most 3 children
# In a 'Unary' Tree (Linked List)
#      O
#      |
#      O
#      |
#      O
# are a little different and are a linke after a link.
# For an 'n-ary' tree or 'polytree'
# this would be a tree with unnown max children and multiple links


# Examining a Binary Tree,
#          A  <-- a node (or vertice)
#         / \
#       B     C 
#      / \   / \
#     D   E F   G  <-- Considered the "leaves" of the tree or 'leaf node'
# (D, E) are children of 'B'
# (F, G) are children of 'c'
# (D, E) and (F, G) can be considered siblings
# The 'Depth' or 'Height' of this tree would be considered *3*

# So why trees?
# Because trees are really good at modeling problems.  They allow us
# to solve problems that we could otherwise not solve.
# Arrays and Hash Maps would not be sufficient in solving problems like 
# trees or tree traversals.

# How do you traverse a tree?  What would be the way you would iterate
# through a tree?  There really is no best way to travel a tree, but it
# makes sense to know how to travel across a tree.


# So now consider Tic-Tac-Toe where an A.I. could understand all the
# possible moves and would always pick 'The Best' move.  In the case of the
# initial node of a blank board, there would be 9 children as there are
# 9 starting 'first' moves it could make -- or if the A.I. goes second,
# there are only 8 'second' moves it could make.

# But first, it needs to know how to travel down this tree via two search
# algorithms:
# BFS - Breadth-First Search
# DFS - Depth-First Search

# BFS
#          1  <== ? examines it layer by layer from top (the root)
#         / \
#       2     3  <== ?
#      / \   / \
#     4   5 6   7  <== ?
# searches: 1,2,3,4,5,6,7 
# Always reads from left to right
# Takes it's time getting to the bottom of the tree.
# Looks for things near the root

# IMPLEMENTATION OF BFS
# Think of '1' being a 'Node' class with attr_accessors for parents, children, etc.
# REQUIRES: Queue
# Sudo Code:
# queue = [root] of [1] in this example
# Until queue.empty?
# el = queue.shift
# process!(el)
# el.children.each { |child| queue << child }  'enqueue each child'
# Case: Searching for '7'
# -1st pass: queue = [1]' => .shift(1) => process(1) => Not 7 => look at children (el)
#   - enqueue children of '1'
# -2nd pass: queue = [2,3] => .shift(2) => process(2) => Not 7 => look at children (el)
#   - enqueue children of '2' [4,5]
# -3rd pass: queque = [3,4,5] => .shift(3) => process(3) => Not 7 => look at children (el)
#   - enqueue children of '3' [6,7]
# -4th pass: queque = [4,5,6,7] => .shift(4) => process(4) => Not 7 => look at children (el)
#   - finish checking each child 
# -5th pass: queque = [5,6,7] => .shift(5) => process(5) => Not 7
# -6th pass: queque = [6,7] => .shift(6) => process(6) => Not 7
# -7th pass: queque = [7] => .shift(7) => process(7) => is 7!



# DFS  (Two ways to do it)
#      1              1       1       1       1        1        1        1 (end)
#     / \            /       /       /         \        \        \
#   2     3         2       2       2 (end)     3        3        3 (end)
#  / \   / \       /         \                 /          \
# 4   5 6   7     4 (end)     5 (end)         6 (end)      7
# searches: 4,5,2,6,7,3,1
# It goes straight to the bottom, trying to find leaves as fast as possible.
# Very impatient to get to the bottom of the tree.

# IMPLEMENTATION OF DFS
# REQUIRES: Stack
# Sudo Code:
# Since it uses stack, we can search 'recursively'
# Base Case: Root.Nil? => nil
# Base Case: Root==Val => root
# Inductive Step: Left Tree has element?  Yes|No  :  Right Element
# has atta_accessor to know if either sub branch has child
# def dfs(root, target)
#   return nil if root is nil  'for a binary tree -- not needed for n-ary tree'
#   return root if root.val == target
#   root.children.each do |child|
#     search_result = child dfs(child, target)  'important to memoize!'
#     return search_result unless search_result.nil?   
#   end
#   nil
# end
# Imagine Target = 6
# 
# 
#                        (leaf)    (leaf)
#                       ___4___   ___5___    (leaf)
#             ___2___   ___2___   ___2___   ___2___
#  ___1___    ___1___   ___1___   ___1___   ___1___
#  recurse    recurse   4 not 6   5 not 6   2 not 6
# 
#                        (leaf)
#                       ___6___
#             ___3___   ___3___   _3_(6)_
#  ___1___    ___1___   ___1___   ___1___   _1_(6)_
#  recurse    recurse   6 is 6!   return6   return6   =6!





# Imagine a deeper tree, multiple layers deep, and that the element being
# searched is known to be closer to the root, the DFS is characteristically
# less efficient than BFS, which looks at elements closer to the root.

# DFS and BFS are 'algorithms'.  What's the difference between methods and
# algorithms.  Algorithms can be programmed in any language.

# **NOTE**
# The information of DFS structures hs much more data useage, for example
# the inspect of a failed DFS node is eponentially longer.  One way to fix
# this is to override the default 'inspect' instance method for the class
# (inherited from Object)

class PolyTreeNode
  # ...
  # ...
  def inspect
    @value.inspect
  end
end

# We can also output other useful information

class PolyTreeNode
  # ...
  # ...
  def inspect
    { 'value' => @value, 'parent_value' => @parent.value }.inspect
  end
end

