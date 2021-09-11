# This and That
# What is the keyword this in JavaScript? How is it used? How is it related to binding?

# find_missing_number
# Assume an array of non-negative integers. A second array is formed by shuffling the elements of the first array and deleting a random element. Given these two arrays, find which element is missing in the second array. Do this in linear time with constant memory use.

# Solution
def find_missing_number(array1, array2)
  array1.reduce(:+) - array2.reduce(:+)
end

# Simpler than you think! Find the sums of the arrays and subtract the array with an item missing - the result should be the missing item. Time complexity: O(n).



# is_shuffle?
# Given three strings, return whether the third is an interleaving of the first two. Interleaving means it only contains characters from the other two, no more no less, and preserves their character ordering. "abdecf" is an interleaving of "abc" and "def". Note that the first two strings needn't be in alphabetical order like these.

# You may assume that the first two strings do not contain any characters in common.

# Next, relax the assumption that the first two strings contain no overlap. Analyze the time-complexity of your solution. You may wish to view this problem recursively.

# Example:

# interleaving?('XXZ', 'XXY', 'XXYXXZ')
# => true
# Note: make sure you can answer why this won't work with your initial implementation.

# Solution
# No repeats:

# time: O(n), space: O(1)
def is_shuffle?(str1, str2, str3)
  return false unless str1.length + str2.length == str3.length

  idx1, idx2, idx3 = 0, 0, 0
  while idx3 < str3.length
    if str1[idx1] == str3[idx3]
      idx1 += 1
      idx3 += 1
    elsif str2[idx2] == str3[idx3]
      idx2 += 1
      idx3 += 1
    else
      return false
    end
  end

  true
end

# For our first implementation, we can assume that characters won't be repeated. We can keep track of three indices, one that steps through the first string, one that steps through the second, and a third that steps through the potential interleaved string. If one of the letters at its current index matches the interleaved string's letter at its current index, we increment both that string's index and the interleaved string's index. If neither of the strings at its current index matches the interleaved string at its current index, we immediately return false because we've encountered a mystery letter and cannot possibly be interleaved.

# Potential Repeats:
# O(2**n): `str3.length == n + 1` requires twice the work of
# `str3.length == n`
def is_shuffle?(str1, str2, str3)
  return str1.empty? && str2.empty? if str3.empty?

  if str1[0] == str3[0]
    return true if is_shuffle?(str1[1..-1], str2, str3[1..-1])
  end

  if str2[0] == str3[0]
    return true if is_shuffle?(str1, str2[1..-1], str3[1..-1])
  end

  false
end

# Imagine that we try to use our initial solution with our first implementation of is_shuffle?. Why could interleaving?('XXZ', 'XXY', 'XXYXXZ') return false? By default, if we find a matching letter in our first string, we step forward with that index. When we get to the Y in our interleaved string, we are still at the first index of the second string will return false. We can resolve this problem by making two recursive calls if both strings match a letter - one where we step forward in the first string, one where we step forward in the second. If either of these finds an interleaving string, we return true immediately. (Our base case is that all strings are empty, meaning that we've stepped through every letter.) Otherwise, if neither possibility is interleaving, we return false. In this case, we make 2 recursive calls for each letter in our interleaving string, for a worst case performance of O(2**n).



# Bonus: Dynamic Programming FTW
# Our previous is_shuffle solution runs in O(2**n) time because each step might involve 2 solutions of a subproblem of size n-1.

# That is a terrible time complexity. First, let's change our solution to an iterative solution using breadth first search, rather than a recursive depth first search.
def is_shuffle?(str1, str2, str3)
  candidates = [[0, 0]]

  until candidates.empty?
    str1_used_len, str2_used_len = *(candidates.shift)
    str3_used_len = str1_used_len + str2_used_len

    if str3_used_len == str3.length
      return true
    end

    if str1[str1_used_len] == str3[str3_used_len]
      candidates << [str1_used_len + 1, str2_used_len]
    end
    if str2[str2_used_len] == str3[str3_used_len]
      candidates << [str1_used_len, str2_used_len + 1]
    end
  end

  false
end

# This still sucks. It still searches the entire tree, branching out as much as twice at every step. This will use tons of memory, too, because it is breadth first.

# You can improve it:

def is_shuffle?(str1, str2, str3)
  seen_candidates = Hash.new(false)
  candidates = [[0, 0]]

  until candidates.empty?
    str1_used_len, str2_used_len = *(candidates.shift)
    str3_used_len = str1_used_len + str2_used_len

    if str3_used_len == str3.length
      return true
    end

    if str1[str1_used_len] == str3[str3_used_len]
      new_candidate = [str1_used_len + 1, str2_used_len]
      if !seen_candidates[new_candidate]
        candidates << new_candidate
        seen_candidates[new_candidate] = true
      end
    end
    if str2[str2_used_len] == str3[str3_used_len]
      new_candidate = [str1_used_len, str2_used_len + 1]
      if !seen_candidates[new_candidate]
        candidates << new_candidate
        seen_candidates[new_candidate] = true
      end
    end
  end

  false
end

# If str1.length == str2.length == str3.length / 2, then there are str.length/2 * str.length/2 possible candidates. That's a memory usage of O(n**2). But it also means a time complexity of O(n**2).

# Thanks Edward Swernofsky!