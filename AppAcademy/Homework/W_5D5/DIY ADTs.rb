# Exercise 1 - Stack
# Let's write a Stack class. To do this, use the following framework:
require "byebug"
class Stack
  def initialize
    # create ivar to store stack here!
    @stack = []
  end

  def push(el)
    # adds an element to the stack
    @stack << el
  end

  def pop
    # removes one element from the stack
    @stack.pop
  end

  def peek
    # returns, but doesn't remove, the top element in the stack
    @stack.last
  end
end

class Queue
  def initialize
    @queue = []
  end

  def enqueue(el)
    @queue << el
  end

  def dequeue
    @queue.shift
  end

  def peek
    @queue.first
  end
end


class Map
  attr_reader :key
  
  def initialize
    @map = []
  end

  def set(key, value)
    pair = [key, value]
    @map.any? { |pair| pair[0] == key } ? @map[index(key)][1] = value : @map << pair
    pair
  end

  def delete(key)
    @map.delete_if { |pair| pair[0] == key }
  end

  def get(key)
    @map[index(key)]
  end

  def show
    @map
  end
  
  private
  
  def index(key)
    @map.each_with_index{ |pair, i| return i if pair[0] == key }
  end
end