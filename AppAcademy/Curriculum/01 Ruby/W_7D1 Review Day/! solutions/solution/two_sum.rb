#O(n^2) quadratic time
#O(1) constant space
def bad_two_sum?(arr, target_sum)
  arr.length.times do |i|
    (arr.length - i - 1).times do |j|
      return true if arr[i] + arr[j + i + 1] == target_sum
    end
  end
  false
end

#O(nlogn) linearithmic time
#O(n) linear space
def okay_two_sum_a?(arr, target_sum)
  arr = arr.sort
  i, j = 0, arr.length - 1

  while i < j
    case (arr[i] + arr[j]) <=> target_sum
    when 0
      return true
    when -1
      i += 1
    when 1
      j -= 1
    end
  end

  false
end

#O(nlogn) linearithmic time
#O(n) linear space
# another implementation using binary search
def okay_two_sum_b?(arr, target_sum)
  arr = arr.sort
  arr.each_with_index do |el, i|
    match_idx = arr.bsearch_index { |el2| (target_sum - el) <=> el2 }
    return true if match_idx && match_idx != i
  end
  false
end

#O(n) linear time
#O(n) linear space
def two_sum?(arr, target_sum)
  complements = {}

  arr.each do |el|
    return true if complements[target_sum - el]
    complements[el] = true
  end

  false
end

# This can be easily adapted to also return the indices of the two numbers:

def two_sum_indices(arr, target_sum)
  complements = {}
  arr.each_with_index do |el, i|
    complement, j = complements[target_sum - el] # these will both be nil if the complement doesn't exist
    return [i, j] if complement

    complements[el] = [el, i]
  end
  nil
end

# O(n^2) time complexity
# O(n^2) space complexity

def four_sum?(array, target)

  # the first hash contains each of the elements that we have checked thus far
  hash = Hash.new

  # two_sum_hash contains sums of two elements from our array
  two_sum_hash = Hash.new

  # three_sum_hash contains sums of three elements from our array
  three_sum_hash = Hash.new

  array.each do |num|

    # Return true if there is a sum of three numbers equal to the difference of 
    # the target and the current num (i.e., if the current num and one of the
    # three_sums sum to the target)
    return true if three_sum_hash[target - num]

    # if we have any nums in our two_sum hash, add the current num to each to 
    # populate a hash of three_sums
    two_sum_hash.each_key do |key|
      three_sum_hash[key + num] = true
    end

    # if we have any nums in our single num hash, sum the current num 
    # with each of these numbers and store them in a hash of possible two sums
    hash.each_key do |key|
      two_sum_hash[key + num] = true
    end

    # lastly, add the num to a hash of all nums
    hash[num] = true
  end

  false

end
