require "byebug"

def windowed_max_range(array, window_size) #O(n^2)
  current_max_range = nil
  array.each_index do |i| #O(n)
    windowed = array[i...i + window_size] #O(n)
    min = windowed.min #O(n)
    max = windowed.max #O(n)
    diff = max - min
    if current_max_range.nil?
      current_max_range = (max - min)
    elsif ((max - min) > current_max_range)
      current_max_range = (max - min)
    end
  end
  current_max_range
end

p windowed_max_range([1, 0, 2, 5, 4, 8], 2) == 4 # 4, 8
p windowed_max_range([1, 0, 2, 5, 4, 8], 3) == 5 # 0, 2, 5
p windowed_max_range([1, 0, 2, 5, 4, 8], 4) == 6 # 2, 5, 4, 8
p windowed_max_range([1, 3, 2, 5, 4, 8], 5) == 6 # 3, 2, 5, 4, 8

class MyQueue
  def initialize
    @store = []
  end

  def peek
    @store.first
  end

  def size
    @store.count
  end

  def empty?
    @store.empty?
  end

  def enqueue(n)
    @store << n
  end

  def dequeue
    @store.shift(1)
  end
end

class MyStack
  def initialize
    @store = []
  end

  def peek
    @store.last
  end

  def size
    @store.count
  end

  def empty?
    @store.empty?
  end

  def pop
    @store.pop
  end

  def push(n)
    @store << n
  end
end

class StackQueue
  def initialize
    @in_stack = MyStack.new
    @out_stack = MyStack.new
    @queue = [@in_stack, @out_stack]
  end

  def size
    @in_stack.count + @out_stack.count
  end

  def empty?
    size == 0
  end

  def enqueue(n)
    if @in_stack.empty?
      @out_stack.push(n)
    else
      @in_stack.push(n)
    end
  end

  def dequeue
    flip_stacks
    if @in_stack.empty?
      @out_stack.pop
    else
      @in_stack.pop
    end
  end

  private

  def flip_stacks
    from_stack = @in_stack.empty? ? @out_stack : @in_stack
    to_stack = @in_stack.empty? ? @in_stack : @out_stack
    (from_stack.count).times do
      to_stack << from_stack.pop
    end
  end
end

class MinMaxStack
  def initialize
    @store = []
  end

  def peek
    @store.last
  end

  def size
    @store.count
  end

  def empty?
    @store.empty?
  end

  def pop
    @store.pop[:value]
  end

  def push(n)
    last_item = peek
    if last_item.nil?
      min = n
      max = n
    else
      min = n < last_item[:min] ? n : last_item[:min]
      max = n > last_item[:max] ? n : last_item[:max]
    end
    @store << { value: n, min: min, max: max }
  end
end

class MinMaxStackQueue
  def initialize
    # use in_stack and out_stack instead
    @in_stack = MinMaxStack.new
    @out_stack = MinMaxStack.new
  end

  def size
    @in_stack.count + @out_stack.count
  end

  def empty?
    size == 0
  end

  def enqueue(n)
    if @in_stack.empty?
      populate_in_stack
    end
    @in_stack.push(n)
  end

  def dequeue
    if @out_stack.empty?
      populate_out_stack
    end
    @out_stack.pop
  end

  def max_range
    active_stack = @in_stack.empty? ? @out_stack : @in_stack
    last = active_stack.peek
    last[:max] - last[:min]
  end

  private

  def populate_in_stack
    (@out_stack.size).times do
      @in_stack.push(@out_stack.pop)
    end
  end

  def populate_out_stack
    (@in_stack.size).times do
      @out_stack.push(@in_stack.pop)
    end
  end
end

# //////////////////////////////////////////

def new_windowed_max_range(array, window_size) #O(n)
  queue = MinMaxStackQueue.new
  window_size.times { |i| queue.enqueue(array[i]) }
  (window_size...array.count).each do |i| #O(n)
    queue.dequeue
    queue.enqueue(array[i])
  end
  queue.max_range
end

# not working.  needs to be debugged
p new_windowed_max_range([1, 0, 2, 5, 4, 8], 2) #== 4 # 4, 8
p new_windowed_max_range([1, 0, 2, 5, 4, 8], 3) #== 5 # 0, 2, 5
p new_windowed_max_range([1, 0, 2, 5, 4, 8], 4) #== 6 # 2, 5, 4, 8
p new_windowed_max_range([1, 3, 2, 5, 4, 8], 5) #== 6 # 3, 2, 5, 4, 8
