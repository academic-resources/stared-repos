# fast_intersection

# Given arr1 and arr2, find the intersection of both sets. It should be trivial to write an O(n**2) solution. Use sorting to solve in O(nlog(n)). Next, improve this to O(n) time (maybe use a non-array datastructure).

# O(n**2) solution
def intersection1(arr1, arr2)
  arr1.uniq.select { |el| arr2.include?(el) }
end

# We have a loop through arr1 to select which contributes O(n) and a nested arr2.include? which contributes another O(n) for a total of O(n**2).


# O(nlogn) solution
def intersection2(arr1, arr2)
  arr1, arr2, idx1, idx2 = arr1.sort, arr2.sort, 0, 0

  intersection = []
  while idx1 < arr1.length && idx2 < arr2.length
    case arr1[idx1] <=> arr2[idx2]
    when -1
      idx1 += 1
    when 0
      intersection << arr1[idx1]
      idx1 += 1
      idx2 += 1
    when 1
      idx2 += 1
    end
  end
  intersection
end

# We start off by sorting which is an O(nlogn) operation. From there we can step through the array, keeping a separate indices for our position in arr1 and arr2, adding to our result array when we find an intersecting element (this is an O(n) operation). Our total time complexity is O(nlogn).

# O(n) solution
def intersection3(arr1, arr2)
  intersection = []
  set_1 = arr1.to_set
  arr2.each do |el|
    intersection << el if set_1[el]
  end

  intersection
end

# In our final solution, we use a set to keep track of all the seen elements in arr1. This is an O(n) operation. In a separate loop, we iterate through arr2, checking to see if we've seen each element. Because we've added everything from arr1 to a hash, lookup time is O(1), for a total time complexity of O(n), and additional space complexity of O(n).



# common_subsets
# Write a function that takes two arrays (arr1 and arr2) of integers and returns an array with all the subsets commmon to both.

# Don't generate all subsets of arr1 and arr2, which would take time exponential in the size of arr1/arr2 (and take O(2**n) memory as well). Instead, directly generate the subsets of both.

def common_subsets(arr1, arr2)
  subsets(intersection3(arr1, arr2))
end

def subsets(arr)
  return [[]] if arr.empty?

  val = arr[0]
  subs = subsets(arr.drop(1))
  new_subs = subs.map { |sub| sub + [val] }

  subs + new_subs
end

# We know that all common subsets between arr1 and arr2 are formed from the intersecting elements, so we can utilize the intersection3 function that we wrote for the previous problem, and then generate the subsets of the intersection. Recall that our intersection3 function took O(n) time. We then generate the subsets of this intersection, which will take O(2**n) time, where n is the number of elements that intersect, for a total time complexity of O(2**n).



# can_win?
# Given an array and index, find if it's possible to reach the value 0 by starting at the given index and repeatedly moving left/right by the distance found at array[index].

# Example:

# can_win?([1, 0, 1], 0)
# => true

# can_win?([1, 2, 0], 0)
# => false
# Hint: Use memoization to record where you've been.

# Solution
# Recursive:
def can_win?(arr, pos = 0, seen = {})
  return false if !pos.between?(0, arr.length - 1) || seen[pos]
  return true if arr[pos].zero?

  seen[pos] = true

  can_win?(arr, pos + arr[pos], seen) ||
  can_win?(arr, pos - arr[pos], seen)
end

# Our goal is to make it to a 0 by stepping forward or backwards by the value of our current position in the array.

# In our recursive solution, we keep track of our current position as well as a seen hash. In our base cases, we return false unless the current position falls within the bounds of the array or we have already seen the current position (this means our search through that position ended fruitlessly). We return true if the value at that position is 0. Before making the recursive call to can_win?, we set seen[pos] = true so we don't try to visit it again.

# We then make two recursive calls to can_win? passing in pos + arr[pos] (stepping forward by that position's value) and pos - arr[pos] (stepping backwards by that position's value) for our new positions. If either one of our recursive calls returns true, we've won!

# Iterative:
# A non-recursive solution.
def can_win(array, index)
  positions_to_try = [index]
  visited_positions = Array.new(array.length, false)
  visited_positions[index] = true

  until positions_to_try.empty?
    # We should probably use a queue for this.
    position = positions_to_try.shift
    value = array[position]

    if value == 0
      return true
    end

    [position + value, position - value].each do |pos|
      next if visited_positions[pos]
      next if (pos < 0 || array.length <= pos)

      positions_to_try << pos
      # This insures we don't add a position twice to our queue.
      visited_positions[pos] = true
    end
  end

  false
end

# We can also do this iteratively using a queue. In this case, we get our current position, find the new positions by adding and subtracting the value, and throw them onto the back of the queue if they fall within the array and haven't been visited yet.

# Our solutions will take up O(n) time - worst case, we visit every item in the array before finding (or not finding) a 0.

