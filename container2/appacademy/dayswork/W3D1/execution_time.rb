require "byebug"

list = [0, 3, 5, 4, -5, 10, 1, 90]

def my_min_1(list) # O(n^2)
  output = list.first
  list.each do |e|
    list.each do |e2|
      next if e == e2
      output = e2 if e2 < output
    end
  end
  output
end

puts my_min_1(list)

def my_min_2(list) # O(n)
  output = list.first
  list.drop(1).each do |e|
    output = e if e < output
  end
  output
end

puts my_min_2(list)

list = [2, 3, -6, 7, -6, 7]

def largest_contiguous_subsum_1(list) # n^2 + n = O(n^2)
  subs = []
  (0...list.count).each do |i|
    (i...list.count).each do |j|
      subs << list[i..j]
    end
  end
  largest = subs.first
  subs.drop(1).each do |sub|
    if sub.sum > largest.sum
      largest = sub
    end
  end
  largest.sum
end

print largest_contiguous_subsum_1(list) # => 8 (from [7, -6, 7])

# list = [2, 3, -6, 7, -6, 7]
# curr = 2   5  0   7  1   8
# larg = 2   5   5  7  7   8

# list = [-3, -5, -7, -2]
# multiple iterations
# the first iteration check if all negative. array.max

def largest_contiguous_subsum_2(list)
  # all negative?
  if list.all? { |e| e < 0 } #n
    return list.max
  end
  curr_sum = list.first #1 (memory)
  largest_sum = list.first #1 (memory)
  list.drop(1).each do |e| #n
    curr_sum += e
    curr_sum = curr_sum < 0 ? 0 : curr_sum
    if curr_sum > largest_sum
      largest_sum = curr_sum
    end
  end
  largest_sum
end

puts "--------"
print largest_contiguous_subsum_2(list)
