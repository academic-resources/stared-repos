arr = [0, 1, 5, 7]

def bad_two_sum?(arr, target_sum) # O(n^2)
  (0...arr.count - 1).each do |i|
    (i + 1...arr.count).each do |j|
      return true if arr[i] + arr[j] == target_sum
    end
  end
  false
end

p bad_two_sum?(arr, 6) # => should be true
p bad_two_sum?(arr, 10) # => should be false

def okay_two_sum?(arr, target_sum) #O(nlogn)
  sorted = arr.sort #O(nlogn)
  arr.each_with_index do |n, i| #O(n)
    search_space = arr.take(i) + arr.drop(1 + i) #O(1)
    return true if search_space.bsearch { |x| x + n == target_sum } #O(logn)
  end
  false
end

p okay_two_sum?(arr, 6) # => should be true
p okay_two_sum?(arr, 10) # => should be false

def two_sum?(arr, target_sum) #O(n)
  hash = {}
  arr.each do |n| #O(n)
    diff = target_sum - n
    return true if hash.has_key?(diff)
    hash[n] = :true
  end
  false
end

p two_sum?(arr, 6) # => should be true
p two_sum?(arr, 10) # => should be false
