#O(n^2) quadratic time
#O(n^2) quadratic space
def my_min_1a(list)
  min_num = nil

  list.each do |num1|
    dup_list = list.dup
    dup_list.delete(num1)
    min_num = num1 if dup_list.all? { |num2| num2 > num1 }
  end

  min_num
end

#O(n^2) quadratic time
#O(1) constant space
def my_min_1b(list)
  list.each_with_index do |num1, i1|
    min = true
    list.each_with_index do |num2, i2|
      next if i1 == i2
      min = false if num2 < num1
   end
   return num1 if min
  end
end

#O(n) linear time
#O(1) constant space
def my_min_2(list)
  min_num = list.first

  list.each { |num| min_num = num if num < min_num }

  min_num
end

#O(n^3) cubic time
#O(n^3) cubic space
def largest_contiguous_subsum1(array)
  subs = []

  array.each_index do |idx1|
    (idx1..array.length - 1).each do |idx2|
      subs << array[idx1..idx2]
    end
  end

  subs.map { |sub| sub.inject(:+) }.max
end

#O(n) linear time
#O(1) constant space
def largest_contiguous_subsum2(arr)
  largest = arr.first
  current = arr.first

  return arr.max if arr.all? { |num| num < 0 }

  arr.drop(1).each do |num|
    current = 0 if current < 0
    current += num
    largest = current if current > largest
  end

  largest
end
