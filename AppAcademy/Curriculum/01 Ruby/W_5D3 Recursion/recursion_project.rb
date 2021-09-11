require 'byebug'

def range(start, finish)
  range = []
  (start...finish).each do |n|
    range << n
  end
  range
end

def range_rec(start, finish)  # (1, 4)
    return [start] if start + 1 == finish
    range = []
    range = range + [start]
    range + range_rec(start+1,finish)
#   range << start
#   rec = range_rec(start + 1, finish)  #=>[1] at (1,1)
#   range.push(*rec)
#   range 
end

def range_rec1(start, finish)  # (1, 4)
    return [start] if start + 1 == finish
    range = range_rec1(start + 1, finish)
    range.unshift(start)
end

# this is math, not Ruby methods.

# # recursion 1
# exp(b, 0) = 1
# exp(b, n) = b * exp(b, n - 1)

# # recursion 2
# exp(b, 0) = 1
# exp(b, 1) = b
# exp(b, n) = exp(b, n / 2) ** 2             [for even n]
# exp(b, n) = b * (exp(b, (n - 1) / 2) ** 2) [for odd n]


# exp(3, 0) = 1
# exp(3, 1) = 3 * exp(3, 1 - 1) = 3 * 1
# exp(3, 2) = 3 * exp(3, 2 - 1) = 3 * (3 * 1)
# exp(3, 3) = 3 * exp(3, 3 - 1) = 3 * (3 * 3)

def exponentiation1(b,n)
  return 1 if n == 0 
  b * exponentiation1(b, n - 1)
end

# exp(3, 0) = 1
# exp(3, 1) = 3
# exp(3, 2) = exp(3, 2 / 2) ** 2 = exp(3, 1) ** 2 = 3 ** 2 = 9
# exp(3, 4) = exp(3, 4 / 2) ** 2 = exp(3, 2) ** 2 = (3 ** 2) ** 2 = 81
# exp(3, 3) 3 * (exp(3, 3 - 1) / 2) ** 2) = 3 * (3 ** 2) = 27
# exp(3, 5) 3 * (exp(3, 5 - 1) / 2) ** 2) = 3 * (3 ** 2 ** 2) = 243


def exponentiation2(b, n)
  return 1 if n == 0
  return b if n == 1
  if n.even?
    exponentiation2(b, n / 2) ** 2
  else
    b * exponentiation2(b, (n - 1) / 2) ** 2
  end
end

# 

# robot_parts_copy = robot_parts.dup

# # shouldn't modify robot_parts
# robot_parts_copy[1] << "LEDs"
# # but it does
# robot_parts[1] # => ["capacitors", "resistors", "inductors", "LEDs"]

# Base case: self non_array element i.e. "bolts"
# ["bolts"]
# 

class Array
  def deep_dup
    new_arr = []
      self.each do |el|
        if el.is_a?(Array)
          new_arr << el.deep_dup
        else
          new_arr << el
        end
      end
    new_arr
  end
end


# return a array of length n which are the element of the fibonacci_iterative
# no arrays passed in between methods
# 

def fibonacci_iterative(n)
  fib = [1,1]
  return fib.take(n) if n <= 2

  while fib.length < n
    fib << fib[-1] + fib[-2]
  end
  fib
end

def fibonacci_recursive(n)
  return [1] if n <= 1
  return [1,1] if n == 2

  arr = fibonacci_recursive(n-1) 
  arr << arr[-1] + arr[-2]
end


# assumed sorted

# [2, 4, 6, 8, 10], target = 6
# mid = 5 / 2 = 2
# if array[2] > 6


# [1, 2, 3, 4, 5, 6]  target = 1  array[3] = 4 mid = 6/2
# [1, 2, 3]   [5, 6]  target = 1  array[1] = 2 mid = 3/2
# [1]   [3]           target = 1  array[0] = 1 mid = 1/2
# [1]                 target = 1

# target values
# [1, 2, 3, 4, 5, 6]   taget = 6  recurses down to [5, 6]
# [0, 1, 0, 3, 0, 1]

def binary_search(array, target) 
  return nil if array.length == 0
  mid = array.length / 2
  return mid if array[mid] == target
  left = array[0...mid]
  right = array[mid + 1..-1]
  if array[mid] > target #[]
     binary_search(left, target)
  else
    result = binary_search(right, target)
    return result.nil? ? nil : result + mid + 1
  end
  
end
#binary_search([1, 2, 3], 1) # => 0
# binary_search([2, 3, 4, 5], 3) # => 1
# binary_search([2, 4, 6, 8, 10], 6) # => 2
# binary_search([1, 3, 4, 5, 9], 5) # => 3
# binary_search([1, 2, 3, 4, 5, 6], 6) # => 5
# binary_search([1, 2, 3, 4, 5, 6], 0) # => nil
# binary_search([1, 2, 3, 4, 5, 7], 6) # => nil


# [8, 2, 1, 5, 3, 0, 6, 9, 7, 10, 4]
# [8, 2, 1, 5, 3] [0, 6, 9, 7, 10, 4]
def merge_sort(array)
  return array if array.length <= 1
  mid = array.length / 2
  left = merge_sort(array[0...mid])
  right = merge_sort(array[mid..-1])
  merge(left, right)
end
# [8]  [2]  [1]  [5]  [3]  [0]  [6]  [9]  [7]  [10]  [4]
# [2, 8]    [1, 5]   [0, 3]  [6, 9]   [7, 10]  [4]
# [2,8] [5]
#     [1, 2, 5, 8]  [0, 3, 6, 9]  [4, 7, 10]

def merge(arr_1, arr_2) # works because arr_1 and arr_2 are always sorted
  array = []
  while !arr_1.empty? && !arr_2.empty?
    if arr_1.first <= arr_2.first
      array << arr_1.shift
    else
      array << arr_2.shift
    end
  end
  array += arr_1 + arr_2
end
# load 'recursion_project.rb'


# Array Subsets
# Write a method subsets that will return all subsets of an array.

# subsets([]) # => [[]]                 0
# subsets([1]) # => [[], [1]]           0, 01
# subsets([1, 2]) # => [[], [1], [2], [1, 2]]         0, 1, 2, 12
# subsets([1, 2, 3])
# # => [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]   0, 01, 02, 012, 03,013, 23, 123
# 3,2,1  3,2  3,1  3   2,1  2   1  0
# You can implement this as an Array method if you prefer.

# Hint: For subsets([1, 2, 3]), there are two kinds of subsets:

# Those that do not contain 3 (all of these are subsets of [1, 2]).
# For every subset that does not contain 3, there is also a corresponding
# subset that is the same, except it also does contain 3.



def array_subsets(array)
  return [array] if array.empty?
  
end

def permutations

end

def make_change(num)

end