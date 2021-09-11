from binary_search_tree import BinarySearchTree
import time

# MVP: 
# Navigate into the `names` directory. Here you will find two text files containing 10, 000 names each, along with a program `names.py` that compares the two files and prints out duplicate name entries.
# Try running the code with `python3 names.py`. Be patient because it might take a while: approximately six seconds on my laptop.
# What is the runtime complexity of this code?
# runtime: 5.663139343261719 seconds
# Six seconds is an eternity so you've been tasked with speeding up the code. Can you get the runtime to under a second? Under one hundredth of a second?
# You may not use the built in Python list, set, or dictionary in your solution for this problem.  However, you can and should use the provided `duplicates` list to return your solution.*
# (Hint: You might try importing a data structure you built during the week)

#### Stretch
# Say your code from `names.py` is to run on an embedded computer with very limited RAM.
# Because of this, memory is extremely constrained and you are only allowed to store names in arrays(i.e. Python lists).
# How would you go about optimizing the code under these conditions?
# Try it out and compare your solution to the original runtime.
# (If this solution is less efficient than your original solution, include both and label the strech solution with a comment)

# Rubric:
# 2:  Student does not identify the runtime of the starter code in name.py, but optimizes it to run in under 6 seconds, with a solution of O(n log n) or better
# 3:  Student does BOTH correctly identify the runtime of the starter code in name.py and optimizes it to run in under 6 seconds, with a solution of 0(n log n) or better

start_time = time.time()

f = open('names_1.txt', 'r')
names_1 = f.read().split("\n")  # List containing 10000 names
f.close()

f = open('names_2.txt', 'r')
names_2 = f.read().split("\n")  # List containing 10000 names
f.close()

duplicates = []  # Return the list of duplicates in this data structure

# Replace the nested for loops below with your improvements
'''
for name_1 in names_1:
    for name_2 in names_2:
        if name_1 == name_2:
            duplicates.append(name_1)
'''

'''
# MVP Solution:
# runtime: 0.002018451690673828 seconds
# complexity:  O(n) (linear)

class BSTNames:
    def __init__(self, value=None):
        self.node_value = value
        self.node_left = None
        self.node_right = None

    def insert(self, value):
        BinarySearchTree.insert(self, value)

    def contains(self, target):
        BinarySearchTree.contains(self, target)
'''


# ---------- Stretch Goal -----------
# Python has built-in tools that allow for a very efficient approach to this problem
# What's the best time you can accomplish?  Thare are no restrictions on techniques or data
# structures, but you may not import any additional libraries that you did not write yourself.

# os.chdir("E:\\projects\\LambdaSchool\\m6\\62b1\\names")
# exec(open("names.py").read())

# Stretch Solution:
# runtime: 0.00399327278137207 seconds
# complexity:  O(n) (linear)
alt_list = dict()
for x_name in names_1:
    alt_list[x_name] = True
for y_name in names_2:
    if y_name in alt_list:
        duplicates.append(y_name)


end_time = time.time()
print(f"{len(duplicates)} duplicates:\n\n{', '.join(duplicates)}\n\n")
print(f"runtime: {end_time - start_time} seconds")
