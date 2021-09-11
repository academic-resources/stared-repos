require "byebug"

list = [ 0, 3, 5, 4, -5, 10, 1, 90 ]

def my_min(arr)
  arr.each do |ele1|
    min = true 
    arr.each do |ele2|
      min = false if ele2 < ele1 
    end
    return ele1 if min 
  end
end

#my_min(list)
#time complexity: O(n^2)


def my_min_two(arr)
  min = nil 
  arr.each do |ele|
    min = ele if min.nil? || ele < min 
  end
  min 
end

#my_min_two(list)
#time complexity: O(n)

#list = [5, 3, -7]

def largest_contiguous_subsum(arr)
  subs = []
  (0...arr.length - 1).each do |idx1|
    (idx1...arr.length).each do |idx2|
      subs << arr[idx1..idx2].sum 
    end
  end
  subs.max
end

#largest_contiguous_subsum(list)
#time complexity: O(n^3)

list = [2, 3, -6, 7, -6, 7]
# curr = 2, 5, -1, 6, 0, 7 
# max = 2, 5,      6     7
def largest_contiguous_subsum_two(arr)
  current_sum = 0
  max_sum = 0
  arr.each do |ele|
    #debugger
    current_sum += ele 
    current_sum = 0 if current_sum < 0
    max_sum = current_sum if current_sum > max_sum 
  end
  max_sum
end


#largest_contiguous_subsum_two(list)
#time complexity: O(n)