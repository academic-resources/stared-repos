# subsets

# Write a function that takes an array and returns all of its subsets. How many sets will it return?

def subsets(arr)
  return [[]] if arr.empty?

  val = arr[0]
  subs = subsets(arr.drop(1))
  new_subs = subs.map { |sub| sub + [val] }

  subs + new_subs
end

# We can solve subsets recursively. We can think of the subsets of an array of length n as all the subsets of the array without the first element (subsets(array.drop(1))) plus the same subsets with the first element added on to each one.

# Pseudocode Example:

# subsets(['a', 'b', 'c'])
# subs_without_a => [[], ['c'], ['b'], ['c', 'b']]
# subs_with_a => [['a'], ['c', 'a'], ['b', 'a'], ['c', 'b', 'a']]
# all_subs = subs_without_a + subs_with_a
# With this in mind, we can set our base case as a single empty subset ([[]]). We can then calculate the subsets of any array by finding the subsets of the array excluding the first element, and add them to the subsets of the array with the first element.

# We will finish with 2 n subsets, so at minimum our time complexity will be `O(2n)`.



# longest_palindrome
# Write a function that will take a string and return the indices of the start/end of the longest palindrome it contains.

# Example:

# longest_palindrome('acapella') => [0, 2]

# Solution
# Your palindrome checker could reverse the string and compare it to the original, but that takes extra memory (that takes O(n) extra memory). Instead, you should be able to solve this problem with O(1) memory.

# The naive solution is to generate all of the substrings (of which there are O(n**2) many), and for each substring, check if it's a palindrome. A palindrome check takes linear time, so this is total O(n**3) time, or cubic time.

def longest_palindrome(string)
  best_palindrome_start = 0
  best_palindrome_len = 0

  0.upto(string.length - 1).each do |start|
    # micro-optimization: don't look at substrings shorter than best
    # palindrome.
    len = best_palindrome_len + 1
    while start + len <= string.length
      if is_palindrome?(string, start, len)
        best_palindrome_start, best_palindrome_len = start, len
      end

      len += 1
    end
  end

  [best_palindrome_start, best_palindrome_start + best_palindrome_len - 1]
end

def is_palindrome?(string, start, len)
  len.times do |i|
    if string[start + i] != string[(start + len - 1) - i]
      return false
    end
  end

  true
end


# This obviously sucks. We can do better. If we realize that every biggest palindrome will have many smaller palindromes nested inside it, we realize that we don't have to look at every palindrome separately; we can linearly scan through the array, and for each index in the array (or space between indices), check to see what's the largest palindrome centered there.

#   This approach will take O(n**2) time and O(1) space.

def longest_palindrome(str)
  longest_length = 0
  longest_begin = 0

  str.length.times do |i|
      stretch = 0
      # expand out from char i, and see if there's an expanding palindrome
      # (for odd palindrome lengths)
      loop do
          break unless both_in_range?(i + stretch, i - stretch, str)

          if str[i - stretch] == str[i + stretch]
              this_pal_length = stretch * 2 + 1
              if this_pal_length > longest_length
                  longest_length = this_pal_length
                  longest_begin = i - stretch
              end
          else
            break
          end

          stretch += 1
      end

      # now check centering around the spaces between chars
      # (for even palindrome lengths)
      stretch = 0
      loop do
          break unless both_in_range?(i + stretch + 1, i - stretch, str)

          if str[i - stretch] == str[i + stretch + 1]
              this_pal_length = stretch * 2 + 2
              if this_pal_length > longest_length
                  longest_length = this_pal_length
                  longest_begin = i - stretch
              end
          else
            break
          end

          stretch += 1
      end
  end

  str.slice(longest_begin, longest_length)
end

def both_in_range?(i1, i2, str)
  [i1, i2].all? { |idx| idx.between?(0, str.length - 1) }
end

# There is a way to do this in linear time, but it involves a degree of insight that you'd never be expected to achieve in an interview. You can read more about the linear time algorithm below, known as Manacher's Algorithm.
# http://en.wikipedia.org/wiki/Longest_palindromic_substring

# Someone's ruby implementation of Manacher's algorithm (https://github.com/billymonk/algorithms/blob/master/ruby/manacher.rb)
# Someone's JS implementation of Manacher's algorithm (https://gist.github.com/leonbobster/4c90a75ea0d8e2497e04fb858cf54e50)

# Visualization of Manacher's algorithm (http://manacher-viz.s3-website-us-east-1.amazonaws.com/#/)
