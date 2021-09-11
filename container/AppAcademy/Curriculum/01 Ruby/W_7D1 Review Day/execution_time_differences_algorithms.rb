


# Phase I

# O(n^2)
LIST = [ 0, 3, 5, 4, -5, 10, 1, 90 ]
def my_min(list)
  min = list.first
  (0...list.length - 1).each do |first|
    (first...list.length).each do |second|
      other = (list[first] < list[second] ? list[first] : list[second])
      min = (min < other ? min : other)
    end
  end
  min
end

# Phase II
# O(n)
def my_min2(list)
  min = list.first
  list.each do |el|
    min = el if el < min
  end
  min
end

# Largest Continguous Sub-sum
# Phase I
LIST_1 = [5, 3, -7]
LIST_2 = [2, 3, -6, 7, -6, 7]
LIST_3 = [-5, -1, -3]
def lcs(list)
  contiguous_subsets = []
  (0...list.length).each do |i|
    (i...list.length).each do |j|
      contiguous_subsets << list[i..j]
    end
  end
  contiguous_subsets.map(&:sum).max
end

# Phase II
# *Hopefully * O(n) time, O(1) memory
def lcs_2(list)
  sum_array = []
  negative_sum = 0
  if list.all? { |el| el < 0 }
    list.each { |el| negative_sum = el if el > negative_sum }
    return negative_sum
  end
  
  largest_sum = 0
  current_sum = 0

  list.each do |current_num|
    current_sum += current_num
    if current_sum > largest_sum
      largest_sum = current_sum
    elsif current_sum < 0
      current_sum = 0
    end
  end
  largest_sum
end