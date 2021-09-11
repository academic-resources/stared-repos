class Stack
  def initialize
    @stk = []
  end

  def push(el)
    stk << el
  end

  def pop
    stk.pop
  end

  def peek
    stk.last
  end

  private

  attr_accessor :stk
end
