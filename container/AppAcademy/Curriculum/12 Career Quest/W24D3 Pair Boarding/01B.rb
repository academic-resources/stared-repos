# longest_common_substring
# Write a function, longest_common_substring(str1, str2) that takes two strings and returns the longest common substring. A substring is defined as any consecutive slice of letters from another string.

# Bonus: solve it in O(m * n) using O(m * n) extra space. (Hint: the solution involves dynamic programming which will be introduced later in the course.)

# Naive Implementation
def longest_common_substring(str1, str2)
  longest_substring = ""

  start_idx = 0
  while start_idx < str1.length
    # don't consider substrings that would be too short to beat
    # current max.
    len = longest_substring.length + 1

    while (start_idx + len) <= str1.length
      end_idx = start_idx + len
      substring = str1[start_idx...end_idx]
      longest_substring = substring if str2.include?(substring)

      len += 1
    end

    start_idx += 1
  end

  longest_substring
end

# This runs in O(m * n**2) time, where n is the length of the length of str1 and m is the length of str2. We know this because there are two nested while loops that iterate through str1 (O(n**2)), and within the while loop we check the substring for inclusion in str2 (O(m)).


# Dynamic Programming Implementation

def make_matrix(str1, str2)
  matrix = Array.new(str1.length + 1) { Array.new(str2.length + 1, 0) }

  str1.chars.each_with_index do |el1, idx1|
    str2.chars.each_with_index do |el2, idx2|
      if el1 == el2
        matrix[idx1 + 1][idx2 + 1] = matrix[idx1][idx2] + 1
      else
        matrix[idx1 + 1][idx2 + 1] = 0
      end
    end
  end

  matrix
end

def longest_common_substring(str1, str2)
  matrix = make_matrix(str1, str2)
  greatest_substring = ""
  matrix.each_with_index do |row, idx1|
    row.each_with_index do |length, idx2|
      if length > greatest_substring.length
        greatest_substring = str2[idx2 - length...idx2]
      end
    end
  end

  greatest_substring
end

# In this implementation, we solve the problem in a bottom up manner. We start off by creating an n x m matrix using our make_matrix helper function. This matrix will hold the length of the longest common substring at each of the first string and second string.

# We then iterate through each of the strings in a nested loop and compare each of the characters. If the characters are different, our common substring length that position is 0, so we add a 0 into the matrix at matrix[idx1 + 1][idx2 + 1]. Otherwise, we look to the value at matrix[idx1][idx2] (the previous positions in each of the strings) and increment it by one.

# Example:

# CAT & RAT

# |"" | C | A | T  
# --------------------
# "" | 0 | 0 | 0 | 0
# --------------------
# R  | 0 | 0 | 0 | 0
# --------------------
# A  | 0 | 0 | 1 | 0
# --------------------
# T  | 0 | 0 | 0 | 2  <--- Longest substring ends here!

# Once we have a matrix of the longest common substrings at each position, we can iterate through it and find the length and end position of the maximum substring. When we find the maximum length, we can find the substring by tracing back length by grabbing the substring from index - length to index.

# This solution is O(n * m) and takes up O(n * m) extra space for the matrix.

# Solution on TutorialHorizon: http://algorithms.tutorialhorizon.com/dynamic-programming-longest-common-substring/


# sum_rec
# Write a function that takes an array of integers and returns their sum. Use recursion.

def sum_rec(nums)
  return 0 if nums.empty?
  nums[0] + sum_rec(nums.drop(1))
end