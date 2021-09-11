require "byebug"

def bad_two_sum?(arr, target_sum)
  (0...arr.length - 1).each do |i1|
    (i1...arr.length).each do |i2|
      return true if arr[i1] + arr[i2] == target_sum
    end
  end
  false 
end

def okay_two_sum?(arr, target_sum)
  sorted = arr.sort
  sorted.each_with_index do |el, idx|
    return true unless binary_search(sorted - [el], target_sum - el).nil?
  end
  false
end

def binary_search(arr, target)
  mid = arr.length / 2
  return mid if arr[mid] == target

  left = arr.take(mid)
  right = arr.drop(mid + 1)

  case arr[mid] <=> target
  when 1
    return binary_search(left, target)
  when 0 
    return mid
  when -1
    result = binary_search(right, target)
    return result.nil? ? nil : (result + mid + 1)
  end
end

def hash_two_sum?(arr, target_sum)
  hash = Hash.new
  arr.each_with_index do |el, idx|
    hash[el] = idx
  end
  arr.each_with_index do |el, idx|
    check = target_sum - el
    excluding_el = hash.reject { |k, v| v == idx }
    return true if excluding_el[check]
  end
  false
end



# Conley's

# O(n**2) = brute_force
# O(nlog(n)) = sorting 
# O(n) = hash-map













#########oLI####
=begin
brute force
O(n^2) = nested loops and check whether or not two elements = target sum

sort
O(n Log(n))Sorting allows eliminating possibilties larger than the sum



=end