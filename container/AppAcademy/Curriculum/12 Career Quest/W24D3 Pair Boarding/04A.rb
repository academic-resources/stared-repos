# uniq_subs
# Write a method that finds all the unique substrings for a word.

# Solution
# A results array and the include? method can be used to enforce uniqueness, but it adds the time cost of iterating through that array to check for inclusion. Keeping track of substrings in a set or hash is more efficient (O(1) lookup time).

require 'set'

def uniq_subs(str)
  subs = Set.new

  str.length.times do |i|
    (i...str.length).each do |j|
      subs.add(str[i..j])
    end
  end

  subs
end

Time complexity: O(n^3)

# One "n" comes from the outer loop, a second from the inner loop, and a third from the line subs.add(str[i..j]), which contains two operations that are linear in the length of str. First, slicing the string from i to j is linear in the length of the substring, and the average substring length grows linearly with the length of str. Additionally, hashing a string (which we do when adding it to a set) takes O(L) time, where L is the length of the hashed string, so the time to hash the average substring also grows linearly in the length of str.


# largest_contiguous_subsum
# Given an array of integers (positive and negative) find the largest contiguous subsum (sum of a subarray).

# You can solve this trivially in O(n**2) time by considering all subarrays. Try to solve it in O(n) time with O(1) memory.

# Recursive Solution
# Say for an array of n elements you know:

# The largest contiguous subsum, AND
# The largest contiguous subsum ending at the last of n elements.
# Now, say that you extend the n elements with an n+1th element. How does the largest contiguous subsum ending at the n+1th element change?

# How does the largest contiguous subsum change?

# Illustration:

# Suppose your array is [5, 3, -7, 6], then:

# * The largest subsum is 8 with subarray [5, 3].
# * The largest subsum ending at the last element is 7 with subarray [5, 3, -7, 6].

# Say that you push 4 to the array to get [5, 3, -7, 6, 4].

# * The largest subsum ending at the last element is 11 with subarray [5, 3, -7, 6, 4].
# * The largest subsum overall is the max of the old largest subsum AND the new largest subsum.
# In other words, the new largest sum is 11 because [8, 11].max = 11.

def lcs(arr)
  lcs_helper(arr)[:best_sum]
end

def lcs_helper(arr)
  if arr.empty?
    return { best_sum: 0, best_suffix_sum: 0 }
  end

  result = lcs_helper(arr.drop(1))
  old_best_sum, old_best_suffix_sum = result[:best_sum], result[:best_suffix_sum]
  new_best_suffix_sum = [old_best_suffix_sum + arr.first, arr.first].max
  new_best_sum = [old_best_sum, new_best_suffix_sum].max

  { best_sum: new_best_sum,
    best_suffix_sum: new_best_suffix_sum }
end

# Iterative Solution

def lcs(arr)
  current_sum = 0
  max = arr.first || 0  # return 0 for empty array

  arr.each do |el|
      current_sum += el
      max = current_sum if max < current_sum
      current_sum = 0 if current_sum < 0
  end

  max
end