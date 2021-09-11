require "byebug"

def windowed_max_range(arr, window_size)
    current_max_range = 0
    (0..arr.length - window_size).each do |idx|
        sub = arr[idx...idx + window_size]
        range = sub.max - sub.min
        current_max_range = range if range > current_max_range
    end
    current_max_range
end

# p windowed_max_range([1, 0, 2, 5, 4, 8], 2) #== 4 # 4, 8
# p windowed_max_range([1, 0, 2, 5, 4, 8], 3) #== 5 # 0, 2, 5
# p windowed_max_range([1, 0, 2, 5, 4, 8], 4) #== 6 # 2, 5, 4, 8
# p windowed_max_range([1, 3, 2, 5, 4, 8], 5) #== 6 #

# time complexity O(n^2)

 
class MyQueue
  def initialize(arr, target)
    @store = []
    @arr = arr
    @target = target
  end

  def enqueue
    @store << @arr.first
  end

  def dequeue
    @store.shift
  end

  def peek
    @store.first
  end

  def size 
    @store.length
  end

  def empty?
    @store.empty?
  end

end