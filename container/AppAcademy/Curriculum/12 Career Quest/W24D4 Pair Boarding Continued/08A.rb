# Sums Upon Sums
# I give you a scrambled list of n unique integers between 0 and n. Tell me what number is missing.

# If I let you use O(nlog(n)) time, what is a naive way of doing this?

# Next, what if I require that you solve the problem in O(n) time? What datastructure might you use?

# Finally, how could you solve the problem in O(n), and also O(1) space?

# Solution
# O(nlog(n)) solution - sort the numbers and look for a gap:

def which_missing_1(arr)
  arr.sort.each_with_index do |el, idx|
    return idx if el != idx
  end

  arr.length
end

# O(n) with O(n) extra space - add the numbers to a hash set and then check for each number from 0 - n.

def which_missing_2(arr)
  found = {}
  arr.each do |el|
    found[el] = true
  end

  0.upto(arr.length).each do |el|
    return el unless found[el]
  end
end

# O(n) with O(1) extra space: The expected sum of the first n numbers is (n + 1)(n / 2) (prove this). Sum up all the numbers yourself, and subtract the actual from expected values. This number must be missing.

def which_missing_3(arr)
  total = (arr.length + 1) * arr.length / 2
  actual_sum = arr.inject(&:+)
  total - actual_sum
end

# In both these solutions, we update the array in-place to use O(1) extra space. We achieve this by iterating through the array until we find a zero, then swapping with the item at the back of the array. We then increase our known count of zeros by one so that we can swap with the item at length - 1 - num_zeros. When we swap, we may have swapped with another zero and not known it. We only increment the index if we encounter a non-zero so we can check the potential-zero again. This solution uses O(n) time.



# K Closest Stars
# Consider a coordinate system for the Milky Way, in which Earth is at (0,0,0). Model stars as points, and assume distances are in light years. The Milky Way consists of approximately 10^12 stars, and their coordinates are stored in a file. How would you compute the k stars which are closest to Earth?

# Hint: Suppose you know the k closest stars in the first n stars. If the (n + 1)th star is to be added to the set of k closest stars, which element in that set should be evicted?

# Solution
# We are working with a big dataset!

# If we were working with a smaller dataset, there are a few ways we could solve this problem.

# 1) We could read the data into an array, then sort the array and take the kth smallest elements. 2) We could read the items into an array and use QuickSelect.
# (http://stackoverflow.com/questions/10846482/quickselect-algorithm-understanding)

# However, both of these solutions would take up O(n) space complexity. Given the vast number of stars in our galaxy, these solutions will simply not do!

#   To solve this problem in a lower space complexity (teehee, space complexity because we are talking about outer space), we can solve this problem using a priority queue.

def k_closest_stars(sequence, k)
  # This we pass our MaxHeap a proc to calculate distance
  heap = BinaryMaxHeap.new do |el1, el2|
    distance1 = Math.sqrt(el1[0]**2 + el1[1]**2 + el1[2]**2)
    distance2 = Math.sqrt(el2[0]**2 + el2[1]**2 + el2[2]**2)
    distance1 <=> distance2
  end

  # Start off the heap with k items
  k.times do
    heap.push(sequence.pop)
  end

  # Until we reach the end, push on new items from our sequence and extract the max
  while sequence.length > 0
    heap.push(sequence.pop)
    heap.extract
  end

  # We can return an array of k closest stars
  k_closest = []

  until heap.empty?
    k_closest.push(heap.extract)
  end

  k_closest
end

# In this solution, we assume that we have a BinaryMaxHeap class that takes in a proc for sorting. In this case, we sort by distance from (0,0,0), earth's position.

# We start by pushing k items onto the max heap. Then, until we reach the end of the sequence of stars, we continue reading in each star, adding them to the heap (O(logk)), then extracting the max (O(1)). This will maintain a structure that keeps track of the k closest stars at all times. Finally, when we reach the end of the star stream, we push everything from the heap onto an array, which we ultimately return.
  
# The time complexity is (O(nlogk)) because we must read through each star once, and adding them to the heap is an O(logk) operation. The space complexity (teehee) is a mere O(k).
  


# bonus_stack
# Implement a stack with a method max that returns the maximum value of the stack. max should run in O(1) time, no matter what operations are performed on the stack.

class MaxStack
  def initialize
    @values = []
  end

  def push(value)
    if @values.empty?
      @values << [value, value]
    else
      new_max = [self.max, value].max
      @values << [value, new_max]
    end
  end

  def pop
    value, max = @values.pop

    value
  end

  def max
    @values.last[1]
  end
end

# Flashback to good old min-max stack from week 2! First, let's review stacks: stacks are a LIFO (last in first out) data structure. Next, let's talk about how to keep track of the max. We can't just keep an @max instance variable - what happens if we add on a new maximum element, then pop it off? We'd have to look through our entire stack which would take O(n) time to search for our new max. Instead, we store metadata along with each element - the current max at the time the element was added to the stack. From there, no matter what operations are performed, we can keep track of the stack's current max.