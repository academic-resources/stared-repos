# -------------------------------------------------------------------------------------- #
# A Binary Heap is a Binary Tree with following properties.
# 1) It’s a complete tree (All levels are completely filled except possibly the last   level and the last level has all keys as left as possible). This property of Binary Heap makes them suitable to be stored in an array.
# 2) A Binary Heap is either Min Heap or Max Heap. In a Min Binary Heap, the key at root must be minimum among all keys present in Binary Heap. The same property must be recursively true for all nodes in Binary Tree. Max Binary Heap is similar to MinHeap.

# Import the heap functions from python library
# from heapq import heappush, heappop, heapify

# heappop - pop and return the smallest element from heap
# heappush - push the value item onto the heap, maintaining
#             heap invarient
# heapify - transform list into heap, in place, in linear time

# -------------------------------------------------------------------------------------- #

from heapq import heappush, heappop, heapify


class MinHeap:
    # Constructor to initialize a heap
    def __init__(self):
        self.heap = []

    def parent(self, i):
        return (i - 1) // 2

    # Inserts a new key 'k'
    def insertKey(self, k):
        heappush(self.heap, k)

    # Decrease value of key at index 'i' to new_val
    # It's assumed that new_val is smaller than heap[i]
    def decreaseKey(self, i, new_val):
        self.heap[i] = new_val
        while (i != 0 and self.heap[self.parent(i)] > self.heap[i]):
            # Swap heap[i] with heap[parent(i)]
            self.heap[i], self.heap[self.parent(i)] = (
                self.heap[self.parent(i)], self.heap[i])

    # Method to remove minimum element from heap
    def extractMin(self):
        return heappop(self.heap)

    # This function deletes key at index i.  It first reduces value to
    #   minus infinite and then calls extractMin()
    def deleteKey(self, i):
        self.decreaseKey(i, float("-inf"))
        self.extractMin()

    # Get the minimum element from the heap
    def getMin(self):
        return self.heap[0]


# Driver program to test function
heapObj = MinHeap()
heapObj.insertKey(3)
heapObj.insertKey(1)
heapObj.insertKey(5)
heapObj.insertKey(10)
heapObj.insertKey(9)
heapObj.insertKey(11)
heapObj.insertKey(20)
heapObj.insertKey(4)
heapObj.insertKey(6)

print(heapObj.heap)
print(heapObj.extractMin())
print(heapObj.getMin())
heapObj.decreaseKey(2, 1)
print(heapObj.getMin())
