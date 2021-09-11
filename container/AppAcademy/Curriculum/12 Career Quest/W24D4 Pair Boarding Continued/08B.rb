# StackQueue
# Implement a queue using stacks. That is, write enqueue and dequeue using only push and pop operations.

# In terms of performance, enqueue should be O(1), but dequeue may be worst-case O(n). In terms of ammortized time, dequeue should be O(1). Prove that your solution accomplishes this.

# Solution
class StackQueue
  def initialize
    @in, @out = [], []
  end

  def enqueue(value)
    @in << value
  end

  def dequeue
    if @out.empty?
      @out << @in.pop until @in.empty?
    end

    @out.pop
  end
end

# Think back to our StackQueue class from the good old days. First off, recall that a queue is a FIFO (first in first out) data structure. We use two stacks to implement our stack queue. Every time we add an item, we push it onto an @in stack. This is a O(1) operation. When we dequeue, we will only dequeue from our @out stack. If something is on our @out stack, dequeueing is a O(1) operation. If our @out stack is empty, we will pop from the @in stack and push everything onto the @out stack, toppling the stack upside down like a slinky so that the first items pushed on will come out of our queue first, as they should.

# But wait - isn't moving every item from our @in stack to the @out stack an O(n) operation? Does this make dequeueing an O(n) operation? While toppling the stack is an O(n) operation, each O(n) operation gives us n free dequeues. Since we get n free dequeues for every O(n) topple and n / n is 1, dequeueing is an O(1) amortized operation.



# Windowed Max Range
# Given an array, and a window size w, find the maximum max - min within a range of w elements.

# For instance:

# windowed_max_range([1, 0, 2, 5, 4, 8], 2) == 4 # 4, 8
# windowed_max_range([1, 0, 2, 5, 4, 8], 3) == 5 # 0, 2, 5
# windowed_max_range([1, 0, 2, 5, 4, 8], 4) == 6 # 2, 5, 4, 8
# # still 6!
# windowed_max_range([1, 3, 2, 5, 4, 8], 5) == 6 # 3, 2, 5, 4, 8
# You can write a naive version that considers all subarrays of size w. However, if w = n/2 then there are n/2 subarrays of length n/2 to consider. Therefore, I would call this solution quadratic. Write it anyway :-)

# Let's improve it to O(n). Here are some hints:

# First solve MaxStack. Could you write simply a MinMaxStack to track both the min and the max in a stack?
# Next, solve StackQueue. Could you use your MinMaxStack to write a MinMaxStackQueue which tracks both the min and max.
# Last, can you use your MinMaxStackQueue to solve the problem?

class MinMaxStack
  def initialize
    @entries = []
  end

  def length
    @entries.length
  end

  def push(value)
    if @entries.empty?
      @entries << { value: value, min: value, max: value }
    else
      @entries << {
        value: value,
        max: [@entries.last[:max], value].max,
        min: [@entries.last[:min], value].min
      }
    end
  end

  def pop
    (@entries.pop)[:value]
  end

  def max
    @entries.empty? ? nil : (@entries.last)[:max]
  end

  def min
    @entries.empty? ? nil : (@entries.last)[:min]
  end
end

class MinMaxStackQueue
  def initialize
    @in, @out = MinMaxStack.new, MinMaxStack.new
  end

  def enqueue(value)
    @in.push(value)
  end

  def dequeue
    if @out.length == 0
      @out.push(@in.pop) until @in.length == 0
    end

    @out.pop
  end

  def length
    @in.length + @out.length
  end

  def max
    maxes = []
    maxes << @in.max if @in.length > 0
    maxes << @out.max if @out.length > 0

    maxes.max
  end

  def min
    mins = []
    mins << @in.min if @in.length > 0
    mins << @out.min if @out.length > 0

    mins.min
  end
end

def windowed_max_range(array, window_size)
  max_range = nil

  q = MinMaxStackQueue.new
  array.each do |el|
    q.enqueue(el)
    if max_range.nil? || (q.max - q.min) > max_range
      max_range = (q.max - q.min)
    end

    if q.length == window_size
      q.dequeue
    end
  end

  max_range
end

# Let's walk through the above queue. We've already implemented our MinMaxStack. We can extend this to be a MinMaxStackQueue which allows us to take the min and max of our queue in O(1) time by using MinMaxStacks in our queue, and generating the min/max of both the @in and the @out stack.

# Now for the windowed max range problem. We can start by enqueueing the first w items of our array, where w is the length of our window. We can generate the max range of this window by subtracting the queue's min from the queue's max. We can then inch our queue through the array by dequeueing the first item that entered the queue (remember: this is an O(1) operation) and enqueueing the next item in the array. If the max range for this window is greater than the old max range, we replace it with the new max range. We stop when we reach the end of the array.

# Iterating through our array and enqueueing/dequeueing each item takes O(n) time, and all the other operations are O(1), for a total time complexity of O(1) and an additional space complexity of O(n).