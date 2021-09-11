# Gordon Cooper  &  Oliver Almalel
require "byebug"
class Array
  def my_each(&proc)

    i = 0
    while i < self.length
      proc.call(self[i])
      i += 1
    end
    self
  end

  def my_select(&proc)
    selected = []
    self.my_each do |ele|
      selected << ele if proc.call(ele)
    end
    selected
  end

  def my_reject(&proc)
    rejected = []
    self.my_each do |ele|
      rejected << ele if !proc.call(ele)
    end
    rejected
  end
  

  def my_any?(&proc)
    
    self.my_each do |ele|
      return true if proc.call(ele)
    end
    false

  end

  def my_all?(&proc)
    
    self.my_each do |ele|
      return false if !proc.call(ele)
    end
    true

  end

  def my_flatten
    
    return [self] if !self.kind_of?(Array)
    new_arr = []

    self.my_each do |ele|
      if ele.kind_of?(Array)
        new_arr += ele.my_flatten
      else
        new_arr << ele
      end
    end

    new_arr
  end

  def my_zip(*arrays)
    zipped = []
    (0...self.length).each do |idx|
      sub_zipped = []
      sub_zipped << self[idx]
      arrays.each do |array|
        sub_zipped << array[idx]
      end
      zipped << sub_zipped
    end
    zipped
    
  end
  
  def my_rotate(rotations = 1)
    rotations = rotations % self.length if rotations > self.length
    self[rotations..-1] + self[0...rotations]
  end

  def my_join(join_string = "")
    joined = ""

    self.each.with_index do |ele, i|
      joined += ele.to_s 
      joined += join_string if i != self.length - 1 
    end

    joined
  end

  def my_reverse
    reversed = []
    self.each do |ele|
      reversed.unshift(ele)
    end

    reversed
  end

  

end
