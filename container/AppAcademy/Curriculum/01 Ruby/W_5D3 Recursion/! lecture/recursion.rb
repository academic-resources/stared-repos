require 'byebug'

#############
# RECURSION #
#############

# What is Recursion?
# calling a method within the same method 
# describing itself by referencing itself 
# problem divided down into smaller sub-problems
# used to solve problem that could be solved iteratively
#   in a manner that we break into smaller sub-components 


# What do we need to write a useful recursive method?
# 1. base-case  --- primitive case
#     way to exit out of recursion 
#     smallest case where answer is implicit 
#     simplest case. case in which we don't enter a recursive call
#     primitive case 
# 2. inductive-step
#     combination of smaller problem and same method call on a smaller subset of the problem
#     you'll see the induction 
#     step that accum the values to add to primitive step and return final value
#     step taken to hit the base case 


# CASHIER == PERSON - PERSON - PERSON - PERSON - PERSON - PERSON - PERSON - PERSON - PERSON - PERSON
# 
# cashier: how many coffees do you want, Person? 
# person: I wanna buy a coffee for each person in the line 
# cashier: but I can't see how long the line is
# person: well, I can't see how long the line is either
# 
# Person writes on a piece of paper: 
#   'Read and pass it back,
#     if you're the last person in line, write 1, and pass it forward. 
#     if you receive this paper back from the person behind you, scratch 
#     the last number and add one to it, then pass it forward. 
# 
# Person passes the piece of paper over their shoulder, to the next person.
# PEOPLE (Persons) do this until nobody takes the paper from behind them (base case)
# Last person, writes 1, and passes it forward. 
# Second to last person, scrathes the 1 and returns a 2.
# 
# 
# now, lets write a recursive method to actually do this in code 
# line, will be an array of whatever elements 
# (each element should count as 1 person || 1 coffee)
# pos will represent the index, cause we need a variable to increment

# line = ['person', 'person', 'person', 'person', 'person']
def recursive_coffee(line, pos = 0)
  # debugger
  return 1 if pos == line.length - 1
  result = 1 + recursive_coffee(line, pos + 1)
  # debugger 
  result
end



# return array containing the first n fibs
class Whatever 
  def initialize 
    @fibs_count = 0 
    @better = 0
  end

  attr_reader :fibs_count, :better

  def fibs(n = 3)
    @fibs_count += 1 
    # [] if n == 0 
    # [1] if n == 1 
    # [1, 1] if n == 2
    result = [1,1]
    return result.take(n) if n <= 2

    next_fib = fibs(n - 1)[-1] + fibs(n - 1)[-2]
    new_fibs = fibs(n - 1) << next_fib
    new_fibs
  end

  def better_fibs(n)
    @better += 1 
    result = [1,1]
    debugger
    return result.take(n) if n <= 2
    new_fibs = better_fibs(n - 1)
    # n = 3 ---- new_fibs = [1,1]
    new_num = new_fibs[-1] + new_fibs[-2]
    # n = 3 --- new_num = 1 + 1 
    res = new_fibs << new_num
    debugger
    # n = 3 --- res = [1,1] + [2]
    res  
  end


end






class Array
  # quicksort: pick a pivot, design an array around
  # create two arrays, one with smaller elements than the pivot 
  # another array with larger elements than the pivot
  
  # combine the two arrays with the pivot in the middle
  # [3,2,4,2,3,4,5,1,7]
  # pivot = array.first = 3
  # left  [2,2,3,1]
  # right [4,4,5,7]
  # quicksort on left && quicksort on right
  # left recursive call 
  #     pivot = 2 
  #     left = [2, 1]
  #     right = [3]
  # 
  # left [pivot] right
    def quicksort
      return self if self.size < 2
      pivot = self.first
      # the below is a micro optimization 
      # left = []
      # right = [] 
      # self[1..-1].each { if ... << left or << right }
      left = self[1..-1].select { |num| num <= pivot }
      right = self[1..-1].select { |num| num > pivot }

      sorted_left = left.quicksort 
      sorted_right = right.quicksort
      sorted = sorted_left + [pivot] + sorted_right
      sorted
    end
end

# any method that can be implemented iteratively 
# can be implemented recursively and vice versa 
class Array
  def my_each(&prc)
    self.length.times { |i| prc.call(self[i]) }
    self
  end

  def my_each_rec(&prc)
    prc.call(self.first)
    debugger
    return self if self.size == 1
    self[1..-1].my_each_rec(&prc)
    debugger
    self
  end
end