# valid_ip?
# Write a method that takes a string as input. It should return true if the input is a valid IPv4 address (ie. anything between 0.0.0.0 and 255.255.255.255 is valid).

def valid_ip?(str)
  return false unless str =~ /^\d+(\.\d+){3}$/
  nums = str.split(".").map(&:to_i)
  nums.all? {|num| num >= 0 && num <= 255}
end

# In this solution, we start by immediately returning false if the string does not abide by a specified format: it should start with a series one or more digits (\d+) followed by three groups that start with . and are followed with one or more digits ((\.\d+){3}). Once we satisfy this condition, we split the string and check that the digits are all within the valid range.


# sum_from_file
# Write a method that reads in a file of integers, one per line, and sums them. Skip the line if it begins with a "#".

def sum_from_file(filename)
  nums = File
    .readlines(filename)
    .select { |line| line[0] != "#" }
    .map(&:to_i)

  nums.inject(:+)
end

# This method uses the ruby File class. ::readlines creates an array of each line of the file. We then use Array#select to skip lines beginning with #, convert the remaining lines to integers, and find the sum. This solution is O(n), where n is the number of lines in the file.


# shuffle
# You are given an array and a random number generator. Shuffle the array.

def shuffle(array)
  new_array = array.dup
  array.each_index do |index|
    # notice how each time it moves the number at `index` out of the
    # way so it may be sampled later.
    rand_index = index + rand(array.length - index)
    new_array[index], new_array[rand_index] =
      new_array[rand_index], new_array[index]
  end
  new_array
end

# Time complexity: O(n).