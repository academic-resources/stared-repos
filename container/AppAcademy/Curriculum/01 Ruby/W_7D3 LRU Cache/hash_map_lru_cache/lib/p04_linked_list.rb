
require "byebug"

class Node
  attr_reader :key
  attr_accessor :val, :next, :prev

  def initialize(key = nil, val = nil)
    @key = key
    @val = val
    @next = nil
    @prev = nil
  end

  def to_s
    "#{@key}: #{@val}"
  end

  def inspect
    "#{@key unless nil}: #{@val unless nil}"
  end

  def remove
    @prev.next = @next
    @next.prev = @prev
    # prev_node = @prev
    # next_node = @next
    # prev_node.next = @next
    # next_node.prev = @prev
    self
  end
end

class LinkedList
  include Enumerable

  def initialize
    @head = Node.new()
    @tail = Node.new()
    @head.next = @tail
    @tail.prev = @head
  end

  def [](i)
    each_with_index { |link, j| return link if i == j }
    nil
  end

  def first
    @head.next 
  end

  def last
    @tail.prev 
  end

  def empty?
    @head.next == @tail && @tail.prev == @head
  end

  def get(key) # returns a value
    self.each { |node| return node.val if node.key == key }
  end

  def include?(key)
    self.any? { |node| node.key == key }
  end

  def append(key, val)
    new_node = Node.new(key, val)
    if empty?
      new_node.next = @tail
      new_node.prev = @head
      @head.next = new_node 
      @tail.prev = new_node
    else  
      prev_last = last
      new_node.prev = prev_last
      new_node.next = @tail
      @tail.prev = new_node
      prev_last.next = new_node
    end
  end

  def update(key, val)
    self.each { |node| node.val = val if node.key == key }
  end

  def remove(key)
    self.each { |node| node.remove if node.key == key }
  end

  def each(&prc)
    current_node = first
    until current_node == @tail
      prc.call(current_node)
      current_node = current_node.next
    end
  end

  # uncomment when you have `each` working and `Enumerable` included
  def to_s
    inject([]) { |acc, link| acc << "[#{link.key}, #{link.val}]" }.join(", ")
  end
end
