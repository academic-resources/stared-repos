class Queue
  def initialize
    @queue = []
  end

  def enqueue(el)
    queue << el
  end

  def dequeue
    queue.shift
  end

  def peek
    queue.first
  end

  private

  attr_accessor :queue
end
