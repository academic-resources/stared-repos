# move_zeros
# Given an array, move all zeros to the end. The order of non-zero elements does not matter. Ex:

# move_zeros([1, 2, 0, 3, 4, 0, 5, 6, 0]) == [1, 2, 6, 3, 4, 5, 0, 0, 0]
# Algorithm should be O(n); use O(1) extra space.

# Solution
def move_zeros(array)
  current_index = 0
  num_zeros = 0

  while current_index < (array.length - num_zeros)
    current_value = array[current_index]

    if current_value != 0
      current_index += 1
      next
    end

    back = array.length - 1 - num_zeros
    array[current_index], array[back] =
      array[back], array[current_index]
    num_zeros += 1

    # we can't add one to current_index since `back` may have
    # contained a zero and we don't know it.
  end

  # Return the array
  array
end

def move_zeros2(arr)
  left, right = 0, arr.size - 1
  loop do
    left  += 1 until arr[left]  == 0 || left == right
    right -= 1 until arr[right] != 0 || left == right
    break if left == right
    arr[left], arr[right] = arr[right], arr[left]
  end
  arr
end



# look_and_say
# Implement the 'look and say' function. 'Look and say' takes an input array and outputs an array that describes the count of the elements in the input array as they appear in order.

# Example:

# # there is one '1' in the input array
# look_and_say([1]) == [[1, 1]]

# # there are two '1's in the input array
# look_and_say([1, 1]) == [[2, 1]]

# # there is one '2', followed by one '1' in the input array
# look_and_say([2, 1]) == [[1, 2], [1, 1]]

# # is one '1', followed by one '2', followed by 2 '1's in the input
# # array
# look_and_say([1, 2, 1, 1]) == [[1, 1], [1, 2], [2, 1]]
# Solution
# Maintain a current count, maintain a current element. Push both onto new array when a different element is detected.

def look_and_say(array)
  return [] if array.empty?

  output = [[1, array[0]]]

  (1...array.length).each do |idx|
    el = array[idx]
    if el == output.last[1]
      output.last[0] += 1
    else
      output << [1, el]
    end
  end

  output
end

# The time complexity of this problem is O(n), since we iterate through the array once.

