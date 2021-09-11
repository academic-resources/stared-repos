# binary
# Write a function that takes an integer and returns it in binary form.

# Solution

def binary(num)
  result = []

  until num == 0
    result.unshift(num % 2)
    num /= 2
  end

  result.empty? ? "0" : result.join
end

# To get the binary representation of a number, we simply add each digit into an array by unshifting num % 2 into the result, then dividing the number by two to get the next digit. Complexity: O(log n)



# Factorial
# Implement factorial with and without recursion. What is a potential disadvantage of the recursive way?

# What is tail-recursion? Does Ruby have tail-call optimization? Pretend it did; write a tail-recursive version of rec_fac.

# Solution

def recursive_fac(num)
  return num if num == 1
  tail_rec(num - 1) * num
end

def tail_recursive_fac(num, prod = 1)
  return prod if num == 1
  return tail_recursive_fac(num - 1, prod * num)
end

def iterative_fac(num)
  product = 1
  2.upto(num) { |i| product *= i }

  product
end

# All of these methods have a time complexity of O(n). A downside to our recursive methods is that we have to create n stack frames, leading to an additional space complexity of O(n).

# Our stack frames would look like this for a non-tail-call-optimized version:

# fact(4)
#=> 4 * fact(3)
#=> 4 * ( 3 * fact(2) )
#=> 4 * ( 3 * ( 2 * fact(1) ) )
#=> 4 * ( 3 * ( 2 * 1 ) )
#=> 4 * ( 3 * 2 )
#=> 4 * 6
#=> 24
# In tail call optimizations, the compiler essentially transforms recursive calls into a loop. Rather than generating many stack frames, each tail recursive call replaces the previous top stack frame. To accomplish this, we need to return a call to the initial method as the last statement in our function. We accomplish this by adding an additional argument which keeps track of the current product. Tail recursion isn't enabled by default in Ruby (replacing the top frame of the callstack makes debugging hard), but you can enable it fairly easily. Here (http://nithinbekal.com/posts/ruby-tco/) is an excellent resource that talks more about tail recursion in Ruby and how to use it.