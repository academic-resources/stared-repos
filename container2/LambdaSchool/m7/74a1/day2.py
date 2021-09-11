# Problem 1:  Two Sum

class Solution(object):
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        # Given an array of integers, return indices of the two numbers such that they add up to a specific target.

        # You may assume that each input would have exactly one solution, and you may not use the same element twice.

        # total = 0
        # for key, value in nums
            # total = total + value 
            # for key1, value1 in nums
                # if key != key1
                    # total = total + value1
                    # if total == target
                        # return [key, key1]
        
        total = 0
        for x in range(0, len(nums)):
            total = 0
            for y in range(0, len(nums)):
                if x != y:
                    total = nums[x] + nums[y]
                    if total == target:
                        return [x, y]

# Problem 2:  Implement a Queue Using Stacks
class MyQueue(object):

        # Implement the following operations of a queue (FIFO) using stacks (LIFO).

        # Depending on your language, stack may not be supported natively. You may simulate a stack by using a list or deque(double-ended queue), as long as you use only standard operations of a stack.

        # You may assume that all operations are valid (for example, no pop or peek operations will be called on an empty queue).

        # You must use only standard operations of a stack -- which means only:
            # peek from top
            # pop from top
            # push to bottom
            # size
            # is empty


    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.stack1 = []
        self.stack2 = []
        

    def push(self, x):
        """
        Push element x to the back of queue.
        :type x: int
        :rtype: None
        """
        # while self.stack1 not empty, append its last element to stack2
        while self.stack1:
            popped1 = self.stack1.pop()
            self.stack2.append(popped1)
        # then append x to stack1, which is empty 
        self.stack1.append(x)
        # then put all the other elements, now on stack2, back on stack1
        while self.stack2:
            popped2 = self.stack2.pop()
            self.stack1.append(popped2)

    def pop(self):
        """
        Removes the element from in front of queue and returns that element.
        :rtype: int
        """
        # remove last element of stack, which is front element of queue, and return it
        popped = self.stack1.pop()
        return popped

    def peek(self):
        """
        Get the front element.
        :rtype: int
        """
        # return last element of stack, which is front element of queue (no removal)
        front_element = self.stack1[-1]
        return front_element

    def empty(self):
        """
        Returns whether the queue is empty.
        :rtype: bool
        """
        # if both stacks are empty, return true; else return false
        if not self.stack1 and not self.stack2:
            is_empty = True
        else:
            is_empty = False
        return is_empty


# Your MyQueue object will be instantiated and called as such:
# obj = MyQueue()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.peek()
# param_4 = obj.empty()

