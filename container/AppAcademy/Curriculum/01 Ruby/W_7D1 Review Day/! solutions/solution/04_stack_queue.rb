require_relative "my_stack"

class StackQueue
  def initialize
    @in_stack = MyStack.new
    @out_stack = MyStack.new
  end

  def size
    @in_stack.size + @out_stack.size
  end

  def empty?
    @in_stack.empty? && @out_stack.empty?
  end

  def enqueue(val)
    # O(1)
    @in_stack.push(val)
  end

  def dequeue
    queueify if @out_stack.empty?
    # If we haven't already reversed the stack, this runs in O(n). However, we
    # only have to do this once for every n dequeue operations, so it amortizes
    # to O(1)

    @out_stack.pop
  end

  private
  def queueify
    # How do you turn a stack into a queue? Flip it upside down.
    @out_stack.push(@in_stack.pop) until @in_stack.empty?
  end
end
